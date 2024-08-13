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
    serviceType: JOI.string().custom(objectId),
    status: JOI.string().valid(orderStatuses.CREATED, orderStatuses.PICKED, orderStatuses.OUTFORDELIVERY),
    paymentStatus: JOI.boolean(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

module.exports = {
  validateParam,
  getAllOrders,
};
