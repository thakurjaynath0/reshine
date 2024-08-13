const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { couponService } = require('../../services');

const getAllCoupons = async (req, res) => {
  const filter = pick(req.query, ['title', 'code', 'discountType']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const coupons = await couponService.getAllCoupons(filter, options);
  res.status(httpStatus.OK).json(coupons);
};

const getCouponById = async (req, res) => {
  const { id } = req.params;
  const coupon = await couponService.getCouponById(id);
  res.status(httpStatus.OK).json(coupon);
};

module.exports = {
  getAllCoupons,
  getCouponById,
};
