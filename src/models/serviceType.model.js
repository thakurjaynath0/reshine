const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { rateTypes } = require('../config/enums/rateType.enum');

const serviceTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rateType: {
      type: String,
      enum: Object.values(rateTypes),
      required: true,
      default: rateTypes.FIXED,
    },
    rate: {
      type: Number,
      required: true,
      default: 0,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
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

serviceTypeSchema.plugin(toJSON);
serviceTypeSchema.plugin(paginate);

module.exports = mongoose.model('ServiceType', serviceTypeSchema);
