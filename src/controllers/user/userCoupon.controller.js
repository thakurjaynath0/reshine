const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { userCouponService } = require('../../services');

const getAllUserCoupons = async (req, res) => {
  const filter = pick(req.query, ['coupon', 'order']);
  filter.user = req.user._id;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'userInfo, couponInfo, orderInfo';
  const userCoupons = await userCouponService.getAllUserCoupons(filter, options);
  res.status(httpStatus.OK).json(userCoupons);
};

const getUserCouponById = async (req, res) => {
  const { id } = req.params;
  const userCoupon = await userCouponService.getUserCouponById(id, {
    query: {
      user: req.user._id,
    },
    options: {
      user: true,
      coupon: true,
      order: true,
    },
  });
  res.status(httpStatus.OK).json(userCoupon);
};

module.exports = {
  getAllUserCoupons,
  getUserCouponById,
};
