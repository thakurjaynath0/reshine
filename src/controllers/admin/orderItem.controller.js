const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const Errors = require('../../errors');
const { orderItemService, orderService } = require('../../services');
const queryBuilder = require('../../utils/queryBuilder');

const getAllOrderItems = async (req, res) => {
  const { orderId } = req.params;
  const order = await orderService.getOrder({ _id: orderId });
  if (!order) {
    throw new Errors.NotFoundError('order not found');
  }

  const filter = queryBuilder(req.query, {
    objectFields: ['clothServicePrice'],
    numericFields: ['quantity', 'total'],
  });
  filter.order = orderId;

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'clothServicePrice, clothServicePrice.service-cloth';

  const orderItems = await orderItemService.getAllOrderItems(filter, options);
  res.status(httpStatus.OK).json(orderItems);
};

const getOrderItemById = async (req, res) => {
  const { orderId, id } = req.params;
  const order = await orderService.getOrder({ _id: orderId });
  if (!order) {
    throw new Errors.NotFoundError('order_not_found');
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

const createOrderItem = async (req, res) => {
  const { orderId } = req.params;
  const { clothServicePrice, quantity } = req.body;
  const orderItem = await orderItemService.createOrderItem({ order: orderId, clothServicePrice, quantity });
  res.status(httpStatus.CREATED).json(orderItem);
};

const updateOrderItemById = async (req, res) => {
  const { orderId, id } = req.params;
  const updateBody = req.body;
  const orderItem = await orderItemService.updateOrderItemById(id, req.user, updateBody, {
    query: {
      order: orderId,
    },
  });
  res.status(httpStatus.OK).json(orderItem);
};

const deleteOrderItemById = async (req, res) => {
  const { orderId, id } = req.params;
  await orderItemService.deleteOrderItemById(id, req.user, {
    query: {
      order: orderId,
    },
  });
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItemById,
  deleteOrderItemById,
};
