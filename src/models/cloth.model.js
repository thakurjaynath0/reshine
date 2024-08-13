const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const clothSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

clothSchema.plugin(toJSON);
clothSchema.plugin(paginate);

module.exports = mongoose.model('Cloth', clothSchema);
