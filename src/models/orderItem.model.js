const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const orderItemSchema = mongoose.Schema(
  {
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Order',
      required: true,
    },
    clothServicePrice: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'ClothServicePricing',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
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

orderItemSchema.plugin(toJSON);
orderItemSchema.plugin(paginate);

orderItemSchema.virtual('orderInfo', {
  ref: 'Order',
  localField: 'order',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id orderId status',
  },
});

orderItemSchema.virtual('clothServicePricingInfo', {
  ref: 'ClothServicePricing',
  localField: 'clothServicePrice',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id cloth service price',
  },
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
