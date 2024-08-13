const Razorpay = require('razorpay');
const razorpayUtils = require('razorpay/dist/utils/razorpay-utils');
const config = require('../config/config');

const razorpayInstance = new Razorpay({
  key_id: config.payment.razorpay.id,
  key_secret: config.payment.razorpay.secret,
});

const createOrder = async ({ amount, currency, receipt }) => {
  const razorpayOrder = await razorpayInstance.orders.create({
    amount: amount * 100,
    currency,
    receipt,
  });

  return {
    id: razorpayOrder.id,
    amount: razorpayOrder.amount,
    amount_due: razorpayOrder.amount_due,
    amount_paid: razorpayOrder.amount_paid,
    currency: razorpayOrder.currency,
    status: razorpayOrder.status,
    created_at: razorpayOrder.created_at,
  };
};

const getOrder = async (orderId) => {
  const razorpayOrder = await razorpayInstance.orders.fetch(orderId);

  return {
    id: razorpayOrder.id,
    amount: razorpayOrder.amount,
    amount_due: razorpayOrder.amount_due,
    amount_paid: razorpayOrder.amount_paid,
    currency: razorpayOrder.currency,
    status: razorpayOrder.status,
  };
};

const getPayment = async (paymentId) => {
  const paymentInfo = await razorpayInstance.payments.fetch(paymentId);
  return paymentInfo;
};

const refundPayment = async (paymentId) => {
  const refund = await razorpayInstance.payments.refund(paymentId, {
    speed: 'optimum',
  });

  return {
    paymentId: refund.payment_id,
    refundId: refund.id,
    amount: refund.amount,
    currency: refund.currency,
  };
};

const veirfyWebookCall = ({ payload, signature }) => {
  const webhookSecret = config.payment.razorpay.webhook_secret;
  // const expectedSignature = crypto.createHmac('sha256', webhookSecret).update(JSON.stringify(req.body)).digest('hex');
  // return webhookSignature === expectedSignature;

  return razorpayUtils.validateWebhookSignature(JSON.stringify(payload), signature, webhookSecret);
};

const verifySignature = ({ orderId, paymentId, signature }) => {
  const secret = process.env.RAZORPAY_SECRET_KEY;
  return razorpayUtils.validatePaymentVerification(
    {
      order_id: orderId,
      payment_id: paymentId,
    },
    signature,
    secret
  );
};

module.exports = {
  createOrder,
  getOrder,
  getPayment,
  refundPayment,
  veirfyWebookCall,
  verifySignature,
};
