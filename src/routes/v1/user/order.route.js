const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { orderController } = require('../../../controllers/user');
const { orderValidation } = require('../../../validations/user');
const { orderItemController } = require('../../../controllers/user');
const { orderItemValidation } = require('../../../validations/user');

router
  .route('/')
  .get([auth(userTypes.USER), validate(orderValidation.getAllOrders)], orderController.getAllOrders)
  .post([auth(userTypes.USER), validate(orderValidation.createOrder)], orderController.createOrder);

router
  .route('/:id')
  .get([auth(userTypes.USER), validate(orderValidation.validateParam)], orderController.getOrderById)
  .patch([auth(userTypes.USER), validate(orderValidation.updateOrderById)], orderController.updateOrderById);

router
  .route('/:orderId/items')
  .get([auth(userTypes.USER), validate(orderItemValidation.getAllOrderItems)], orderItemController.getAllOrderItems)
  .post([auth(userTypes.USER), validate(orderItemValidation.createOrderItem)], orderItemController.createOrderItem);

router
  .route('/:orderId/items/:id')
  .get([auth(userTypes.USER), validate(orderItemValidation.validateParam)], orderItemController.getOrderItemById)
  .patch([auth(userTypes.USER), validate(orderItemValidation.updateOrderItemById)], orderItemController.updateOrderItemById)
  .delete([auth(userTypes.USER), validate(orderItemValidation.validateParam)], orderItemController.deleteOrderItemById);

module.exports = router;
