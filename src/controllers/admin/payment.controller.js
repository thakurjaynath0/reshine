const httpStatus = require('http-status');
const { paymentService } = require('../../services');
const pick = require('../../utils/pick');
const Errors = require('../../errors');
const queryBuilder = require('../../utils/queryBuilder');

const queryPayments = async (req, res) => {
  const filter = queryBuilder(req.query, {
    objectFields: ['orderId'],
    booleanFields: ['international'],
    stringFields: ['status', 'paymentMethod', 'currency'],
    numericFields: ['amount'],
    dateFields: ['createdAt', 'updatedAt'],
    searchFields: ['phone', 'email', 'paymentId', 'razorpayOrderId'],
  });

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const payments = await paymentService.queryPayment({ filter, options });
  res.status(httpStatus.OK).json(payments);
};

const getPayment = async (req, res) => {
  const { paymentId } = req.params;
  const payment = await paymentService.getPaymentById(paymentId);
  if (!payment) {
    throw new Errors.NotFoundError('payment not found');
  }
  res.status(httpStatus.OK).json(payment);
};

module.exports = {
  queryPayments,
  getPayment,
};
