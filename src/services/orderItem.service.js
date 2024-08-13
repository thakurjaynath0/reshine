const Error = require('../errors');
const orderService = require('./order.service');
const clothServicePricingService = require('./clothServicePricing.service');
const checkPermission = require('../utils/checkPermision');
const { OrderItem } = require('../models');
const { orderStatuses } = require('../config/enums/orderStatus.enum');

const queryOrderItems = async (filter, options) => {
  const result = await OrderItem.paginate(filter, options);
  return result;
};

const getAllOrderItems = async (filter, options) => {
  const orderItems = await queryOrderItems(filter, options);
  return orderItems;
};

const getOrderItems = async (query) => {
  const orderItems = await OrderItem.find({ ...query });
  return orderItems;
};

const getOrderItemById = async (orderItemId, { query, options } = {}) => {
  let orderItem = OrderItem.findOne({ _id: orderItemId, ...query });

  if (options?.order) orderItem.populate('orderInfo');
  if (options?.clothServicePrice)
    orderItem.populate({ path: 'clothServicePricingInfo', populate: ['clothInfo', 'serviceInfo'] });

  orderItem = await orderItem;

  if (!orderItem) {
    throw new Error.NotFoundError('orderItem_not_found.');
  }

  return orderItem;
};

const createOrderItem = async ({ order, clothServicePrice, quantity }) => {
  const isValidOrder = await orderService.getOrderById(order);
  const isValidClothServicePricing = await clothServicePricingService.getClothServicePricingById(clothServicePrice);

  if (isValidOrder.status !== orderStatuses.CREATED) {
    throw new Error.BadRequestError('order_not_valid.');
  }

  if (!isValidClothServicePricing.active) {
    throw new Error.BadRequestError('clothServicePrice_not_valid.');
  }

  const total = quantity * isValidClothServicePricing.price;

  const orderItem = await OrderItem.create({ order, clothServicePrice, quantity, total });
  return orderItem;
};

const updateOrderItemById = async (orderItemId, requestUser, updateBody, { query, options } = {}) => {
  const orderItem = await getOrderItemById(orderItemId, { query, options });

  const isValidOrder = await orderService.getOrderById(orderItem.order);

  if (isValidOrder.status !== orderStatuses.CREATED) {
    throw new Error.BadRequestError('order_cannot_be_updated.');
  }

  checkPermission(requestUser, isValidOrder.user);

  const { price } = await clothServicePricingService.getClothServicePricingById(orderItem.clothServicePrice);

  let { quantity } = orderItem;

  if (updateBody?.quantity) {
    quantity = updateBody.quantity;
  }

  const totalPrice = quantity * price;
  orderItem.total = totalPrice;
  Object.assign(orderItem, updateBody);
  orderItem.save();
  return orderItem;
};

const deleteOrderItemById = async (orderItemId, requestUser, { query, options } = {}) => {
  const orderItem = await getOrderItemById(orderItemId, { query, options });

  const isValidOrder = await orderService.getOrderById(orderItem.order);
  if (isValidOrder.status !== orderStatuses.CREATED) {
    throw new Error.BadRequestError('orderItem_cannot_be_deleted.');
  }

  checkPermission(requestUser, isValidOrder.user);

  orderItem.remove();
  return orderItem;
};

module.exports.getAllOrderItems = getAllOrderItems;
module.exports.getOrderItemById = getOrderItemById;
module.exports.getOrderItems = getOrderItems;
module.exports.createOrderItem = createOrderItem;
module.exports.updateOrderItemById = updateOrderItemById;
module.exports.deleteOrderItemById = deleteOrderItemById;
