const Error = require('../errors');
const { Coupon } = require('../models');

const queryCoupons = async (filter, options) => {
  const result = await Coupon.paginate(filter, options);
  return result;
};

const getAllCoupons = async (filter, options) => {
  const coupons = await queryCoupons(filter, options);
  return coupons;
};

const getCouponByCode = async (couponCode) => {
  const coupon = await Coupon.findOne({ code: couponCode });
  if (!coupon) {
    throw new Error.NotFoundError('coupon_not_found');
  }
  return coupon;
};

const getCouponById = async (couponId) => {
  const coupon = await Coupon.findOne({ _id: couponId });

  if (!coupon) {
    throw new Error.NotFoundError('coupon_not_found.');
  }

  return coupon;
};

const createCoupon = async ({ title, description, code, discountType, discount, expiry }) => {
  if (expiry < Date.now()) {
    throw new Error.BadRequestError('expiry_cannot_be_less_than_today');
  }

  const coupon = await Coupon.create({ title, description, code, discountType, discount, expiry });
  return coupon;
};

const updatecouponById = async (couponId, updateBody) => {
  const coupon = await getCouponById(couponId);
  Object.assign(coupon, updateBody);
  coupon.save();
  return coupon;
};

const deleteCouponById = async (couponId) => {
  const coupon = await getCouponById(couponId);
  coupon.remove();
  return coupon;
};

module.exports = {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updatecouponById,
  deleteCouponById,
  getCouponByCode,
};
