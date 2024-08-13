const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const clothServicePricingSchema = mongoose.Schema(
  {
    cloth: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Cloth',
      required: true,
    },
    service: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'LaundaryService',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
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

clothServicePricingSchema.plugin(toJSON);
clothServicePricingSchema.plugin(paginate);

clothServicePricingSchema.virtual('clothInfo', {
  ref: 'Cloth',
  localField: 'cloth',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id name',
  },
});

clothServicePricingSchema.virtual('serviceInfo', {
  ref: 'LaundaryService',
  localField: 'service',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id name active',
  },
});

module.exports = mongoose.model('ClothServicePricing', clothServicePricingSchema);
