const httpStatus = require('http-status');
const { deliveryService } = require('../../services');

const pickupOrder = async (req, res) => {
  const { orderId } = req.params;
  const { pin } = req.body;
  const updatedOrder = await deliveryService.pickupOrder(req.user._id, orderId, pin);
  res.status(httpStatus.OK).json(updatedOrder);
};

const dropOrder = async (req, res) => {
  const { orderId } = req.params;
  const { pin } = req.body;
  const updatedOrder = await deliveryService.dropOrder(req.user._id, orderId, pin);
  res.status(httpStatus.OK).json(updatedOrder);
};

const outForDeliveryOrder = async (req, res) => {
  const { orderId } = req.params;
  const updatedOrder = await deliveryService.outForDeliveryOrder(orderId);
  res.status(httpStatus.OK).json(updatedOrder);
};

module.exports = {
  pickupOrder,
  dropOrder,
  outForDeliveryOrder,
};
