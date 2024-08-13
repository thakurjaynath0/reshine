const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const laundaryServiceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

laundaryServiceSchema.plugin(toJSON);
laundaryServiceSchema.plugin(paginate);

module.exports = mongoose.model('LaundaryService', laundaryServiceSchema);
