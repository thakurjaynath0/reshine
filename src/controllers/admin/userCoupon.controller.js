const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { userCouponService } = require('../../services');

const getAllUserCoupons = async (req, res) => {
  const { userId } = req.params;
  const filter = pick(req.query, ['coupon', 'order']);
  filter.user = userId;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'userInfo, couponInfo, orderInfo';
  const userCoupons = await userCouponService.getAllUserCoupons(filter, options);
  res.status(httpStatus.OK).json(userCoupons);
};

const getUserCouponById = async (req, res) => {
  const { userId, id } = req.params;
  const userCoupon = await userCouponService.getUserCouponById(id, {
    query: {
      user: userId,
    },
    options: {
      user: true,
      coupon: true,
      order: true,
    },
  });
  res.status(httpStatus.OK).json(userCoupon);
};

const createUserCoupon = async (req, res) => {
  const { userId } = req.params;
  const { coupon, order } = req.body;
  const userCoupon = await userCouponService.createUserCoupon({ user: userId, coupon, order });
  res.status(httpStatus.CREATED).json(userCoupon);
};

const updateUserCouponById = async (req, res) => {
  const { userId, id } = req.params;
  const updateBody = req.body;
  const userCoupon = await userCouponService.updateUserCouponById(id, updateBody, {
    query: {
      user: userId,
    },
  });
  res.status(httpStatus.OK).json(userCoupon);
};

const deleteUserCouponById = async (req, res) => {
  const { userId, id } = req.params;

  await userCouponService.deleteUserCouponById(id, {
    query: {
      user: userId,
    },
  });

  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllUserCoupons,
  getUserCouponById,
  createUserCoupon,
  updateUserCouponById,
  deleteUserCouponById,
};
