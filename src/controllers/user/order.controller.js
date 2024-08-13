const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { orderService } = require('../../services');

const getAllOrders = async (req, res) => {
  const filter = pick(req.query, ['orderId', 'serviceType', 'status', 'paymentStatus']);
  filter.user = req.user._id;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate =
    'userInfo, serviceTypeInfo, pickupInfo, dropInfo, addressInfo, userCouponInfo.couponInfo, orderItemsInfo.clothServicePricingInfo-clothInfo-serviceInfo';
  const orders = await orderService.getAllOrders(filter, options);
  res.status(httpStatus.OK).json(orders);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await orderService.getOrderById(id, {
    query: {
      user: req.user._id,
    },
    options: {
      user: true,
      serviceType: true,
      pickupBy: true,
      dropBy: true,
      addressInfo: true,
      coupon: true,
      orderItem: true,
    },
  });
  res.status(httpStatus.OK).json(order);
};

const createOrder = async (req, res) => {
  const { coupon, serviceType, address } = req.body;
  const order = await orderService.createOrder({ user: req.user._id, coupon, serviceType, address });
  res.status(httpStatus.CREATED).json(order);
};

const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const order = await orderService.updateOrderById(id, updateBody, {
    query: {
      user: req.user._id,
    },
  });
  res.status(httpStatus.OK).json(order);
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
};
