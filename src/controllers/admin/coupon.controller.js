const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { couponService } = require('../../services');

const getAllCoupons = async (req, res) => {
  const filter = pick(req.query, ['title', 'code', 'discountType', 'expiry']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const coupons = await couponService.getAllCoupons(filter, options);
  res.status(httpStatus.OK).json(coupons);
};

const getCouponById = async (req, res) => {
  const { id } = req.params;
  const coupon = await couponService.getCouponById(id);
  res.status(httpStatus.OK).json(coupon);
};

const createCoupon = async (req, res) => {
  const { title, description, code, discountType, discount, expiry } = req.body;
  const coupon = await couponService.createCoupon({ title, description, code, discountType, discount, expiry });
  res.status(httpStatus.CREATED).json(coupon);
};

const updateCouponById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const coupon = await couponService.updatecouponById(id, updateBody);
  res.status(httpStatus.OK).json(coupon);
};

const deleteCouponById = async (req, res) => {
  const { id } = req.params;
  await couponService.deleteCouponById(id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCouponById,
  deleteCouponById,
};
