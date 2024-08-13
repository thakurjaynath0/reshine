const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    orderId: JOI.string().required().custom(objectId),
  }),
};

const getPayment = {
  ...validateParam,
};

const initiatePayment = {
  ...validateParam,
};

const verifyPayment = {
  ...validateParam,
  body: JOI.object().keys({
    razorpayOrderId: JOI.string().required(),
    razorpayPaymentId: JOI.string().required(),
  }),
  headers: JOI.object()
    .keys({
      'x-razorpay-signature': JOI.string().required(),
    })
    .unknown(),
};

module.exports = {
  initiatePayment,
  verifyPayment,
  getPayment,
};
