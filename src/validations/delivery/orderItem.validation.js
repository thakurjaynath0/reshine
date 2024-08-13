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
    quantity: JOI.number().integer(),
    total: JOI.number().integer(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

module.exports = {
  validateParam,
  getAllOrderItems,
};
