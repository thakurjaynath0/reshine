const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { orderService } = require('../../services');
const queryBuilder = require('../../utils/queryBuilder');

const getAllOrders = async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const filter = queryBuilder(req.query, {
    objectFields: ['serviceType', 'user'],
    booleanFields: ['paymentStatus'],
    stringFields: ['status', 'orderId', 'discountType'],
    numericFields: ['tax', 'discount', 'deliveryCharge'],
    dateFields: ['createdAt', 'updatedAt'],
  });

  options.populate =
    'userInfo, serviceTypeInfo, pickupInfo, dropInfo, addressInfo, userCouponInfo.couponInfo, orderItemsInfo.clothServicePricingInfo.clothInfo-serviceInfo';
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
      orderItem: true,
      paymentInfo: true,
    },
  });
  res.status(httpStatus.OK).json(order);
};

const createOrder = async (req, res) => {
  const { user, coupon, serviceType, tax, address } = req.body;
  const order = await orderService.createOrder({ user, coupon, serviceType, tax, address });
  res.status(httpStatus.CREATED).json(order);
};

const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const order = await orderService.updateOrderById(id, updateBody);
  res.status(httpStatus.OK).json(order);
};

const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  await orderService.deleteOrderById(id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
};
