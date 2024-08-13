const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const userTypeEnum = require('../config/enums/userType.enum');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!value.match(/^[0-9]{10}$/)) {
          throw new Error('Invalid phone number');
        }
      },
    },
    otp: {
      type: String,
      required: false,
      private: true,
    },
    otpExpiry: {
      type: Date,
      required: false,
      private: true,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: false,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: Object.values(userTypeEnum),
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isPhoneTaken = async function (phone, excludeUserId) {
  const user = await this.findOne({ phone, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.methods.validateOtp = async function (otp) {
  if (Date.now() >= this.otpExpiry || !this.otp) {
    return false;
  }
  return bcrypt.compare(otp, this.otp);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.password !== '' && user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  if (user.otp !== '' && user.isModified('otp')) {
    user.otp = await bcrypt.hash(user.otp, 8);
    user.otpExpiry = moment().add(10, 'minutes');
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
