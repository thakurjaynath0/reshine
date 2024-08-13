const Payment = require('../models/payment.model');

const queryPayment = async ({ filter, options }) => {
  const payments = await Payment.paginate(filter, options);
  return payments;
};

const getPayment = async (query) => {
  const payment = await Payment.findOne({ ...query });
  return payment;
};

const getPaymentById = async (paymentId) => {
  const payment = await Payment.findOne({ _id: paymentId });
  return payment;
};

const createPayment = async (paymentInfo, { opts }) => {
  const payment = new Payment({ ...paymentInfo });
  await payment.save(opts);
  return payment;
};

const updatePayment = async (paymentId, updateInfo) => {
  const payment = await getPayment(paymentId);
  Object.assign(payment, updateInfo);
  await payment.save();
  return payment;
};

const deletePayment = async (paymentId) => {
  const payment = await getPayment(paymentId);
  await payment.remove();
};

module.exports = {
  queryPayment,
  getPayment,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
};
