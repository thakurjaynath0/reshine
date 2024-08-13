const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    international: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
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

paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

module.exports = mongoose.model('Payment', paymentSchema);
