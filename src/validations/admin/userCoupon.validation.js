const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    userId: JOI.string().required().custom(objectId),
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllUserCoupons = {
  params: JOI.object().keys({
    userId: JOI.string().required().custom(objectId),
  }),
  query: JOI.object().keys({
    user: JOI.string().custom(objectId),
    coupon: JOI.string().custom(objectId),
    order: JOI.string().custom(objectId),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

const createUserCoupon = {
  params: JOI.object().keys({
    userId: JOI.string().required().custom(objectId),
  }),
  body: JOI.object().keys({
    coupon: JOI.string().required().custom(objectId),
    order: JOI.string().required().custom(objectId),
  }),
};

const updateUserCouponById = {
  params: validateParam.params,
  body: JOI.object().keys({
    coupon: JOI.string().custom(objectId),
    order: JOI.string().custom(objectId),
  }),
};

module.exports = {
  validateParam,
  getAllUserCoupons,
  createUserCoupon,
  updateUserCouponById,
};
