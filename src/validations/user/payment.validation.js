const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    orderId: JOI.string().required().custom(objectId),
  }),
};

const getPayment = {
  ...validateParam,
};

module.exports = {
  getPayment,
};
