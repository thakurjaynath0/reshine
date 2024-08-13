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

const createCoupon = {
  body: JOI.object().keys({
    title: JOI.string().required().min(5).max(100),
    description: JOI.string().required().min(15).max(1000),
    code: JOI.string().required().min(5).max(20),
    discountType: JOI.string()
      .valid(...Object.values(rateTypes))
      .required(),
    discount: JOI.number().integer().required(),
    expiry: JOI.date(),
  }),
};

const updateCouponById = {
  params: validateParam.params,
  body: JOI.object().keys({
    title: JOI.string().min(5).max(100),
    description: JOI.string().min(15).max(1000),
    code: JOI.string().min(5).max(20),
    discountType: JOI.string().valid(...Object.values(rateTypes)),
    discount: JOI.number().integer(),
    expiry: JOI.date(),
  }),
};

module.exports = {
  validateParam,
  getAllCoupons,
  createCoupon,
  updateCouponById,
};
