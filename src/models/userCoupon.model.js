const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userCouponSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    coupon: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Coupon',
      required: true,
    },
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Order',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userCouponSchema.index({ user: 1, coupon: 1 }, { unique: true });

userCouponSchema.plugin(toJSON);
userCouponSchema.plugin(paginate);

userCouponSchema.virtual('userInfo', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id name email phone',
  },
});

userCouponSchema.virtual('couponInfo', {
  ref: 'Coupon',
  localField: 'coupon',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id title description code discountType discount expiry',
  },
});

userCouponSchema.virtual('orderInfo', {
  ref: 'Order',
  localField: 'order',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id orderId status',
  },
});

module.exports = mongoose.model('UserCoupon', userCouponSchema);
