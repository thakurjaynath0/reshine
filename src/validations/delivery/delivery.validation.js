const JOI = require('joi');
const { objectId, otp } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    orderId: JOI.string().required().custom(objectId),
  }),
};

const updateDelivery = {
  params: validateParam.params,
  body: JOI.object().keys({
    // orderId: JOI.string().required().custom(objectId),
    pin: JOI.string().required().custom(otp),
  }),
};

module.exports = {
  validateParam,
  updateDelivery,
};
