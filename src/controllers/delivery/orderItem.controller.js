const httpStatus = require('http-status');
const Errors = require('../../errors');
const pick = require('../../utils/pick');
const { orderItemService, orderService } = require('../../services');
const { orderStatuses } = require('../../config/enums/orderStatus.enum');

const getAllOrderItems = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderService.getOrder({ _id: orderId });
  if (!order) {
    throw new Errors.NotFoundError('order_not_found');
  }
  if (![orderStatuses.CREATED, orderStatuses.PICKED, orderStatuses.OUTFORDELIVERY].includes(order.status)) {
    throw new Errors.BadRequestError('invalid_order');
  }
  const filter = pick(req.query, ['clothServicePrice', 'quantity', 'total']);
  filter.order = orderId;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'clothServicePricingInfo.clothInfo-serviceInfo';
  const orderItems = await orderItemService.getAllOrderItems(filter, options);
  res.status(httpStatus.OK).json(orderItems);
};

const getOrderItemById = async (req, res) => {
  const { orderId, id } = req.params;
  const order = await orderService.getOrder({ _id: orderId });
  if (!order) {
    throw new Errors.NotFoundError('order_not_found');
  }
  if (![orderStatuses.CREATED, orderStatuses.PICKED, orderStatuses.OUTFORDELIVERY].includes(order.status)) {
    throw new Errors.BadRequestError('invalid_order');
  }
  const orderItem = await orderItemService.getOrderItemById(id, {
    query: {
      order: orderId,
    },
    options: {
      order: true,
      clothServicePrice: true,
    },
  });
  res.status(httpStatus.OK).json(orderItem);
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
};
