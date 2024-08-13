const Error = require('../errors');
const userService = require('./user.service');
const couponService = require('./coupon.service');
const orderService = require('./order.service');
const { UserCoupon } = require('../models');
const { orderStatusEnum } = require('../config/enums/orderStatus.enum');

const queryUserCoupons = async (filter, options) => {
  const result = await UserCoupon.paginate(filter, options);
  return result;
};

const getAllUserCoupons = async (filter, options) => {
  const userCoupons = await queryUserCoupons(filter, options);
  return userCoupons;
};

const getUserCouponByUserAndCoupon = async (userId, couponId) => {
  const userCoupon = await UserCoupon.findOne({ user: userId, coupon: couponId });
  return userCoupon;
};

const getUserCouponById = async (userCouponId, { query, options } = {}) => {
  let userCoupon = UserCoupon.findOne({ _id: userCouponId, ...query });

  if (options?.user) userCoupon.populate('userInfo');
  if (options?.coupon) userCoupon.populate('couponInfo');
  if (options?.order) userCoupon.populate('orderInfo');

  userCoupon = await userCoupon;

  if (!userCoupon) {
    throw new Error.NotFoundError('userCoupon_not_found.');
  }

  return userCoupon;
};

const createUserCoupon = async ({ user, coupon, order }) => {
  // const isValidUser = await userService.getUserById(user);
  await userService.getUserById(user);
  const isValidCoupon = await couponService.getCouponById(coupon);

  // if (!isValidUser.active) {
  //   throw new Error.BadRequestError('user_not_valid.');
  // }

  if (isValidCoupon.expiry < Date.now()) {
    throw new Error.BadRequestError('coupon_not_valid.');
  }

  const userCoupon = await UserCoupon.create({ user, coupon, order });
  return userCoupon;
};

const updateUserCouponById = async (userCouponId, updateBody, { query, options } = {}) => {
  const userCoupon = await getUserCouponById(userCouponId, { query, options });

  if (updateBody?.user) {
    const isValidUser = await userService.getUserById(updateBody.user);

    if (!isValidUser.active) {
      throw new Error.BadRequestError('user_not_valid.');
    }
  }

  if (updateBody?.coupon) {
    const isValidCoupon = await couponService.getCouponById(updateBody.coupon);

    if (isValidCoupon.expiry < Date.now()) {
      throw new Error.BadRequestError('coupon_not_valid.');
    }
  }

  if (updateBody?.order) {
    const isValidOrder = await orderService.getOrderById(updateBody.order);

    if (isValidOrder.status !== orderStatusEnum.orderStatus.CREATED) {
      throw new Error.BadRequestError('order_not_valid_for_applying_coupon.');
    }
  }

  Object.assign(userCoupon, updateBody);
  userCoupon.save();
  return userCoupon;
};

const deleteUserCouponById = async (userCouponId, { query, options } = {}) => {
  const userCoupon = await getUserCouponById(userCouponId, { query, options });

  const isValidOrder = await orderService.getOrderById(userCoupon.order);
  if (isValidOrder.status !== orderStatusEnum.orderStatus.CREATED) {
    throw new Error.BadRequestError('orderItem_cannot_be_deleted.');
  }

  userCoupon.remove();
  return userCoupon;
};

module.exports = {
  getAllUserCoupons,
  getUserCouponById,
  getUserCouponByUserAndCoupon,
  createUserCoupon,
  updateUserCouponById,
  deleteUserCouponById,
};
