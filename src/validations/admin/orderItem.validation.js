const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    orderId: JOI.string().required().custom(objectId),
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllOrderItems = {
  params: JOI.object().keys({
    orderId: JOI.string().required().custom(objectId),
  }),
  query: JOI.object().keys({
    clothServicePrice: JOI.string().custom(objectId),
    // quantity: JOI.number().integer(),
    // total: JOI.number().integer(),
    numericFilters: JOI.string(),
    dateFilters: JOI.string(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

const createOrderItem = {
  params: JOI.object().keys({
    orderId: JOI.string().required().custom(objectId),
  }),
  body: JOI.object().keys({
    clothServicePrice: JOI.string().required().custom(objectId),
    quantity: JOI.number().integer().required(),
  }),
};

const updateOrderItemById = {
  params: validateParam.params,
  body: JOI.object()
    .keys({
      // clothServicePrice: JOI.string().custom(objectId),
      quantity: JOI.number().integer(),
    })
    .min(1),
};

module.exports = {
  validateParam,
  getAllOrderItems,
  createOrderItem,
  updateOrderItemById,
};
