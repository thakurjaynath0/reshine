const Error = require('../errors');
const checkOrderUpdate = require('../utils/checkOrderUpdate');
const { Order } = require('../models');
const { orderStatuses } = require('../config/enums/orderStatus.enum');
const userService = require('./user.service');
const serviceTypeService = require('./serviceType.service');
const couponService = require('./coupon.service');
const userCouponService = require('./userCoupon.service');
const addressService = require('./address.service');
const { rateTypes } = require('../config/enums/rateType.enum');

const queryOrders = async (filter, options) => {
  const result = await Order.paginate(filter, options);
  return result;
};

const getAllOrders = async (filter, options) => {
  const orders = await queryOrders(filter, options);
  return orders;
};

const getOrder = async (query) => {
  const order = await Order.findOne({ ...query });
  return order;
};

const getOrderById = async (orderId, { query, options } = {}) => {
  let order = Order.findOne({ _id: orderId, ...query });

  if (options?.user) order.populate('userInfo');
  if (options?.serviceType) order.populate('serviceTypeInfo');
  if (options?.pickupBy) order.populate('pickupInfo');
  if (options?.dropBy) order.populate('dropInfo');
  if (options?.address) order.populate('addressInfo');
  if (options?.coupon) {
    order.populate({
      path: 'userCouponInfo',
      populate: {
        path: 'couponInfo',
      },
    });
  }

  if (options?.orderItem) {
    order.populate({
      path: 'orderItemsInfo',
      populate: {
        path: 'clothServicePricingInfo',
        populate: ['clothInfo', 'serviceInfo'],
      },
    });
  }
  if (options?.paymentInfo) order.populate('paymentInfo');

  if (options?.select) order.select(options?.select);

  order = await order;

  if (!order) {
    throw new Error.NotFoundError('order_not_found');
  }

  return order;
};

const createOrder = async ({ user, coupon, serviceType, tax, address }) => {
  const isValidUser = await userService.getUserById(user);
  const isValidAddress = await addressService.getAddressById(address);
  const isValidServiceType = await serviceTypeService.getServiceTypeById(serviceType);

  if (!isValidUser.active) throw new Error.BadRequestError('user_not_valid.');
  if (!isValidAddress.active) throw new Error.BadRequestError('address_not_valid');
  if (!isValidServiceType.active) throw new Error.BadRequestError('serviceType_not_valid.');

  let discountType = rateTypes.FIXED;
  let discount = 0;
  const { deliveryCharge } = isValidAddress;

  let validCoupon;
  if (coupon) {
    validCoupon = await couponService.getCouponByCode(coupon);
    const isValidUserCoupon = await userCouponService.getUserCouponByUserAndCoupon(user, validCoupon._id);
    if (isValidUserCoupon) throw new Error.BadRequestError('coupon_already_used.');
    ({ discountType, discount } = validCoupon);
  }

  const randomNumber = parseInt(Math.random() * (999999 - 100000) + 100000, 10);
  const pin = `${randomNumber}`;
  const order = await Order.create({ user, serviceType, tax, deliveryCharge, discountType, discount, pin, address });
  if (coupon) await userCouponService.createUserCoupon({ user, coupon: validCoupon._id, order: order._id });
  return order;
};

const updateOrderById = async (orderId, updateBody, { query, options, opts } = {}) => {
  const order = await getOrderById(orderId, { query, options });

  if (updateBody?.serviceType) {
    await serviceTypeService.getServiceTypeById(updateBody.serviceType);
  }

  if (updateBody?.address) {
    await addressService.getAddressById(updateBody.address);
  }

  if (updateBody?.status) {
    checkOrderUpdate(order.status, updateBody.status);
  }

  if (updateBody?.pickupBy) {
    await userService.getUserById(updateBody?.pickupBy);
  }

  if (updateBody?.dropBy) {
    await userService.getUserById(updateBody?.dropBy);
  }

  Object.assign(order, updateBody);
  order.save(opts);
  return order;
};

const deleteOrderById = async (orderId, { query, options } = {}) => {
  const order = await getOrderById(orderId, { query, options });

  if (!(order.status === orderStatuses.CREATED || order.status === orderStatuses.CANCELED)) {
    throw new Error.BadRequestError('order_cannot_be_deleted.');
  }

  order.remove();
  return order;
};

module.exports.getAllOrders = getAllOrders;
module.exports.getOrder = getOrder;
module.exports.getOrderById = getOrderById;
module.exports.createOrder = createOrder;
module.exports.updateOrderById = updateOrderById;
module.exports.deleteOrderById = deleteOrderById;
