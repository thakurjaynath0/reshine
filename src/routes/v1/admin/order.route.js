const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { orderController } = require('../../../controllers/admin');
const { orderValidation } = require('../../../validations/admin');
const { orderItemController } = require('../../../controllers/admin');
const { orderItemValidation } = require('../../../validations/admin');

router
  .route('/')
  .get([auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(orderValidation.getAllOrders)], orderController.getAllOrders)
  .post([auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(orderValidation.createOrder)], orderController.createOrder);

router
  .route('/:id')
  .get([auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(orderValidation.validateParam)], orderController.getOrderById)
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(orderValidation.updateOrderById)],
    orderController.updateOrderById
  )
  .delete([auth(userTypes.SUPERUSER), validate(orderValidation.validateParam)], orderController.deleteOrderById);

router
  .route('/:orderId/items')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(orderItemValidation.getAllOrderItems)],
    orderItemController.getAllOrderItems
  )
  .post(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(orderItemValidation.createOrderItem)],
    orderItemController.createOrderItem
  );

router
  .route('/:orderId/items/:id')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(orderItemValidation.validateParam)],
    orderItemController.getOrderItemById
  )
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(orderItemValidation.updateOrderItemById)],
    orderItemController.updateOrderItemById
  )
  .delete(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(orderItemValidation.validateParam)],
    orderItemController.deleteOrderItemById
  );

module.exports = router;
