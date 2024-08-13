const httpStatus = require('http-status');
const { razorpayService, orderService, paymentService } = require('../services');
const { withTransaction } = require('../db/transaction.db');
const PaymentModel = require('../models/payment.model');

const verifyAndSavePayment = async (req, res) => {
  const isValidCall = razorpayService.veirfyWebookCall({
    payload: req.body,
    signature: req.headers['x-razorpay-signature'],
  });

  if (!isValidCall || !(req.body.event === 'payment.captured')) {
    // no processing needed
    return res.status(httpStatus.OK).send();
  }

  if (!req.body.contains.includes('payment') || !req.body?.payload?.payment) {
    // retry with payment information
    return res.status(400).send();
  }

  try {
    const paymentInfo = req.body.payload.payment.entity;
    const order = await orderService.getOrder({ razorpayOrderId: paymentInfo.order_id });
    if (!order) {
      // no need to process the payment
      return res.status(200).send();
    }

    let payment = await paymentService.getPayment({ orderId: order._id });
    if (order.paymentStatus && payment) {
      // already processed payment
      return res.status(httpStatus.OK).send();
    }

    await withTransaction(async (session) => {
      if (!order.paymentStatus) {
        Object.assign(order, { paymentStatus: true });
        await order.save({ session });
      }

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
  } catch (error) {
    // retry if not idempotent error
    return res.status(httpStatus.BAD_REQUEST).send();
  }

  res.status(httpStatus.OK).send();
};

module.exports = {
  verifyAndSavePayment,
};
