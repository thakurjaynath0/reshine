const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const issueTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

issueTypeSchema.plugin(toJSON);
issueTypeSchema.plugin(paginate);

module.exports = mongoose.model('IssueType', issueTypeSchema);
