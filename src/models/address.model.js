const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const addressSchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      default: 'India',
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
    },
    pincode: {
      type: String,
      required: true,
    },
    deliveryCharge: {
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
  }
);

addressSchema.plugin(toJSON);
addressSchema.plugin(paginate);

module.exports = mongoose.model('Address', addressSchema);
