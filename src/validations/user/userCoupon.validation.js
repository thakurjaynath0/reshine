const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllUserCoupons = {
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
  body: JOI.object().keys({
    coupon: JOI.string().required().custom(objectId),
    order: JOI.string().required().custom(objectId),
  }),
};

module.exports = {
  validateParam,
  getAllUserCoupons,
  createUserCoupon,
};
