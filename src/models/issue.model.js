const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const issueSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Order',
      required: true,
    },
    issueType: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'IssueType',
      required: true,
    },
    issue: {
      type: String,
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

issueSchema.plugin(toJSON);
issueSchema.plugin(paginate);

issueSchema.virtual('userInfo', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id name email phone',
  },
});

issueSchema.virtual('orderInfo', {
  ref: 'Order',
  localField: 'order',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id orderId status',
  },
});

issueSchema.virtual('issueTypeInfo', {
  ref: 'IssueType',
  localField: 'issueType',
  foreignField: '_id',
  justOne: true,
  options: {
    select: 'id name',
  },
});

module.exports = mongoose.model('Issue', issueSchema);
