const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    paymentId: JOI.string().required().custom(objectId),
  }),
};

const getPayment = {
  ...validateParam,
};

const queryPayment = {
  query: JOI.object().keys({
    orderId: JOI.string().custom(objectId),
    international: JOI.boolean(),
    status: JOI.string(),
    paymentMethod: JOI.string(),
    currency: JOI.string(),
    dateFilters: JOI.string(),
    numericFilters: JOI.string(),
    search: JOI.string(),
    // pagination
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

module.exports = {
  getPayment,
  queryPayment,
};
