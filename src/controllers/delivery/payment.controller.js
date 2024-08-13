const httpStatus = require('http-status');
const Errors = require('../../errors');
const { orderService, razorpayService, paymentService } = require('../../services');
const { withTransaction } = require('../../db/transaction.db');
const PaymentModel = require('../../models/payment.model');

const initiatePayment = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderService.getOrderById(orderId);

  if (!order) {
    throw new Errors.NotFoundError('order not found');
  }

  if (order.paymentStatus) {
    throw new Errors.BadRequestError('payment already done');
  }

  try {
    const amount = await order.getAmount();
    if (order.razorpayOrderId) {
      const orderInfo = await razorpayService.getOrder(order.razorpayOrderId);
      const isExpired = (Date.now() / 1000 - orderInfo.created_at) / 86400 >= 5;

      if (!isExpired && orderInfo.amount / 100 === amount && orderInfo.status !== 'paid') {
        return res.status(httpStatus.OK).json(orderInfo);
      }
    }

    const razorpayOrder = await razorpayService.createOrder({
      amount,
    });
    await orderService.updateOrderById(order._id, { razorpayOrderId: razorpayOrder.id });

    return res.status(httpStatus.OK).json(razorpayOrder);
  } catch (err) {
    throw new Errors.BadRequestError('cannot initiate payment');
  }
};

const verifyPayment = async (req, res) => {
  const { orderId } = req.params;
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  const razorpaySignature = req.headers['x-razorpay-signature'];

  const isSignatureValid = razorpayService.verifySignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature,
  });

  if (!isSignatureValid) {
    throw new Errors.BadRequestError('invalid signature');
  }

  try {
    const order = await orderService.getOrderById(orderId, { query: { razorpayOrderId } });
    if (!order) {
      throw new Errors.NotFoundError('order not found');
    }

    let payment = await paymentService.getPayment({ orderId });
    if (payment && order.paymentStatus) {
      return res.status(httpStatus.OK).json({ message: 'payment verified' });
    }

    const paymentInfo = await razorpayService.getPayment(razorpayPaymentId);
    if (!paymentInfo || !(paymentInfo.status === 'captured')) {
      throw new Errors.BadRequestError('payment info unavailable');
    }

    await withTransaction(async (session) => {
      Object.assign(order, { paymentStatus: true });
      await order.save({ session });

      payment = new PaymentModel({
        orderId: order._id,
        paymentId: paymentInfo.id,
        razorpayOrderId: paymentInfo.order_id,
        amount: paymentInfo.amount / 100,
        currency: paymentInfo.currency,
        paymentMethod: paymentInfo.method,
        description: paymentInfo.description,
        international: paymentInfo.international,
        email: paymentInfo.email,
        phone: paymentInfo.contact,
        status: paymentInfo.status,
      });
      await payment.save({ session });
    });
  } catch (err) {
    throw new Errors.BadRequestError('unable to verify payment');
  }

  res.status(httpStatus.OK).json({ message: 'payment verified' });
};

const getPayment = async (req, res) => {
  const { orderId } = req.params;
  const payment = await paymentService.getPayment({ orderId });
  if (!payment) {
    throw new Errors.NotFoundError('payment not found');
  }
  res.status(httpStatus.OK).json(payment);
};

module.exports = {
  initiatePayment,
  verifyPayment,
  getPayment,
};
