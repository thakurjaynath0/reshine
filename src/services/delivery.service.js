const Error = require('../errors');
const orderService = require('./order.service');
const otpService = require('./otp.service');
const { orderStatuses } = require('../config/enums/orderStatus.enum');

const pickupOrder = async (pickupPerson, orderId, pin) => {
  const order = await orderService.getOrderById(orderId);

  if (order.status !== orderStatuses.CREATED) {
    throw new Error.BadRequestError('order_for_pickup_invalid.');
  }

  if (order.pin !== pin) {
    throw new Error.BadRequestError('order_pin_invalid.');
  }

  order.status = orderStatuses.PICKED;
  order.pin = otpService.generateOtp();
  order.pickupBy = pickupPerson;
  order.pickupDate = Date.now();
  await order.save();
  return order;
};

const dropOrder = async (dropPerson, orderId, pin) => {
  const order = await orderService.getOrderById(orderId);

  if (!(order.status === orderStatuses.PICKED || order.status === orderStatuses.OUTFORDELIVERY)) {
    throw new Error.BadRequestError('order_for_drop_invalid.');
  }

  if (order.pin !== pin) {
    throw new Error.BadRequestError('order_pin_invalid.');
  }

  order.status = orderStatuses.DELIVERED;
  order.dropBy = dropPerson;
  order.dropDate = Date.now();
  await order.save();
  return order;
};

const outForDeliveryOrder = async (orderId) => {
  const order = await orderService.getOrderById(orderId);

  if (order.status !== orderStatuses.PICKED) {
    throw new Error.BadRequestError('order_for_delivery_invalid.');
  }

  order.status = orderStatuses.OUTFORDELIVERY;
  await order.save();
  return order;
};

module.exports = {
  pickupOrder,
  dropOrder,
  outForDeliveryOrder,
};
