const JOI = require('joi');
const { objectId } = require('../custom.validation');
const { rateTypes } = require('../../config/enums/rateType.enum');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllCoupons = {
  query: JOI.object().keys({
    title: JOI.string(),
    code: JOI.string(),
    expiry: JOI.date(),
    discountType: JOI.string().valid(...Object.values(rateTypes)),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

module.exports = {
  validateParam,
  getAllCoupons,
};
