const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { orderService } = require('../../services');
const { orderStatuses } = require('../../config/enums/orderStatus.enum');

const getAllOrders = async (req, res) => {
  const filter = pick(req.query, ['user', 'serviceType', 'status', 'orderId', 'paymentStatus']);
  if (!filter?.status) {
    filter.status = {
      $in: [orderStatuses.CREATED, orderStatuses.PICKED, orderStatuses.OUTFORDELIVERY],
    };
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate =
    'userInfo, serviceTypeInfo, pickupInfo, dropInfo, addressInfo, paymentInfo, userCouponInfo.couponInfo, orderItemsInfo.clothServicePricingInfo-clothInfo-serviceInfo';

  options.select = '-pin -razorpayOrderId';
  const orders = await orderService.getAllOrders(filter, options);
  res.status(httpStatus.OK).json(orders);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id, {
    options: {
      user: true,
      serviceType: true,
      pickupBy: true,
      dropBy: true,
      address: true,
      coupon: true,
      orderItems: true,
      paymentInfo: true,
      select: '-pin -razorpayOrderId',
    },
  });
  res.status(httpStatus.OK).json(order);
};

module.exports = {
  getAllOrders,
  getOrderById,
};
