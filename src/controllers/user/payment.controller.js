const httpStatus = require('http-status');
const Errors = require('../../errors');
const { orderService, paymentService } = require('../../services');

const getPayment = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderService.getOrderById(orderId, { query: { user: req.user._id } });
  if (!order) {
    throw new Errors.NotFoundError('order not found');
  }
  const payment = await paymentService.getPayment({ orderId });
  if (!payment) {
    throw new Errors.NotFoundError('payment not found');
  }
  res.status(httpStatus.OK).json(payment);
};

module.exports = {
  getPayment,
};
