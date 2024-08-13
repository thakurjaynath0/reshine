const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { rateTypes } = require('../config/enums/rateType.enum');

const couponSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      requied: true,
    },
    discountType: {
      type: String,
      enum: Object.values(rateTypes),
      required: true,
      default: rateTypes.FIXED,
    },
    discount: {
      type: Number,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

couponSchema.plugin(toJSON);
couponSchema.plugin(paginate);

module.exports = mongoose.model('Coupon', couponSchema);
