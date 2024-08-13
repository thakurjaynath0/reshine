const JOI = require('joi');
const { objectId } = require('../custom.validation');
const { orderStatuses } = require('../../config/enums/orderStatus.enum');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllOrders = {
  query: JOI.object().keys({
    orderId: JOI.string(),
    // user: JOI.string().custom(objectId),
    serviceType: JOI.string().custom(objectId),
    status: JOI.string().valid(...Object.values(orderStatuses)),
    paymentStatus: JOI.boolean(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

const createOrder = {
  body: JOI.object().keys({
    coupon: JOI.string(),
    serviceType: JOI.string().required().custom(objectId),
    address: JOI.string().required().custom(objectId),
  }),
};

const updateOrderById = {
  params: validateParam.params,
  body: JOI.object().keys({
    serviceType: JOI.string().custom(objectId),
    status: JOI.string().valid(orderStatuses.CANCELED),
  }),
};

module.exports = {
  validateParam,
  getAllOrders,
  createOrder,
  updateOrderById,
};
