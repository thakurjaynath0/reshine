const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { toJSON, paginate } = require('./plugins');
const { orderStatuses } = require('../config/enums/orderStatus.enum');
const { rateTypes } = require('../config/enums/rateType.enum');

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
    },
    razorpayOrderId: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceType: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ServiceType',
      required: true,
    },
    tax: {
      type: Number,
      required: true,
      default: 18,
    },
    discountType: {
      type: String,
      enum: Object.values(rateTypes),
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(orderStatuses),
      required: true,
      default: orderStatuses.CREATED,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    pin: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Address',
      required: true,
    },
    pickupBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    pickupDate: {
      type: Date,
    },
    dropBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    dropDate: {
      type: Date,
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

orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);
orderSchema.plugin(AutoIncrement, { inc_field: 'orderId' });

orderSchema.virtual('userInfo', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id name email phone',
  },
});

orderSchema.virtual('pickupInfo', {
  ref: 'User',
  localField: 'pickupBy',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id name email phone',
  },
});

orderSchema.virtual('dropInfo', {
  ref: 'User',
  localField: 'dropBy',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id name email phone',
  },
});

orderSchema.virtual('serviceTypeInfo', {
  ref: 'ServiceType',
  localField: 'serviceType',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id name description active',
  },
});

orderSchema.virtual('addressInfo', {
  ref: 'Address',
  localField: 'address',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id country state city address landmark pincode deliveryCharge active',
  },
});

orderSchema.virtual('userCouponInfo', {
  ref: 'UserCoupon',
  localField: '_id',
  foreignField: 'order',
  justOne: true,
  options: {
    select: 'id user coupon order',
  },
});

orderSchema.virtual('orderItemsInfo', {
  ref: 'OrderItem',
  localField: '_id',
  foreignField: 'order',
  justOne: false,
  options: {
    select: 'order clothServicePrice quantity total',
  },
});

orderSchema.virtual('paymentInfo', {
  ref: 'Payment',
  localField: '_id',
  foreignField: 'orderId',
});

orderSchema.methods.getAmount = async function () {
  const orderItems = await this.model('OrderItem').find({ order: this._id });

  let totalPrice = 0;
  for (let i = 0; i < orderItems.length; i++) {
    totalPrice += orderItems[i].total;
  }

  let discount = 0;
  if (this.discountType === rateTypes.PERCENTAGE) {
    discount = (this.discount / 100) * totalPrice;
  } else if (this.discountType === rateTypes.FIXED) {
    discount = this.discount;
  }

  totalPrice -= discount;

  if (totalPrice <= 0) return this.deliveryCharge;

  let { tax } = this;
  tax = (tax / 100) * totalPrice;
  totalPrice += tax;
  totalPrice += this.deliveryCharge;

  return totalPrice;
};

module.exports = mongoose.model('Order', orderSchema);
