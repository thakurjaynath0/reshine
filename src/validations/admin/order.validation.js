const JOI = require('joi');
const { objectId } = require('../custom.validation');
const { orderStatuses } = require('../../config/enums/orderStatus.enum');
const { rateTypes } = require('../../config/enums/rateType.enum');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllOrders = {
  query: JOI.object().keys({
    orderId: JOI.string(),
    user: JOI.string().custom(objectId),
    serviceType: JOI.string().custom(objectId),
    status: JOI.string().valid(...Object.values(orderStatuses)),
    paymentStatus: JOI.boolean(),
    // tax: JOI.number().integer(),
    discountType: JOI.string().valid(...Object.values(rateTypes)),
    // discount: JOI.number().integer(),
    deliveryCharge: JOI.number().integer(),
    dateFilters: JOI.string(),
    numericFilters: JOI.string(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

const createOrder = {
  body: JOI.object().keys({
    user: JOI.string().required().custom(objectId),
    coupon: JOI.string(),
    serviceType: JOI.string().required().custom(objectId),
    tax: JOI.number().integer(),
    address: JOI.string().required().custom(objectId),
  }),
};

const updateOrderById = {
  params: validateParam.params,
  body: JOI.object()
    .keys({
      // user: JOI.string().custom(objectId),
      // coupon: JOI.string().custom(objectId),
      serviceType: JOI.string().custom(objectId),
      tax: JOI.number().integer(),
      status: JOI.string().valid(...Object.values(orderStatuses)),
      paymentStatus: JOI.boolean(),
      address: JOI.string().custom(objectId),
      pickupBy: JOI.string().custom(objectId),
      dropBy: JOI.string().custom(objectId),
    })
    .min(1),
};

module.exports = {
  validateParam,
  getAllOrders,
  createOrder,
  updateOrderById,
};
