const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');

const { orderController } = require('../../../controllers/delivery');
const { orderValidation } = require('../../../validations/delivery');

const { orderItemController } = require('../../../controllers/delivery');
const { orderItemValidation } = require('../../../validations/delivery');

const { deliveryController } = require('../../../controllers/delivery');
const { deliveryValidation } = require('../../../validations/delivery');

router.route('/').get([auth(userTypes.DELIVERY), validate(orderValidation.getAllOrders)], orderController.getAllOrders);

router.route('/:id').get([auth(userTypes.DELIVERY), validate(orderValidation.validateParam)], orderController.getOrderById);

router
  .route('/:orderId/items')
  .get([auth(userTypes.DELIVERY), validate(orderItemValidation.getAllOrderItems)], orderItemController.getAllOrderItems);

router
  .route('/:orderId/items/:id')
  .get([auth(userTypes.DELIVERY), validate(orderItemValidation.validateParam)], orderItemController.getOrderItemById);

router
  .route('/:orderId/pickup')
  .post([auth(userTypes.DELIVERY), validate(deliveryValidation.updateDelivery)], deliveryController.pickupOrder);

router
  .route('/:orderId/drop')
  .post([auth(userTypes.DELIVERY), validate(deliveryValidation.updateDelivery)], deliveryController.dropOrder);

router
  .route('/:orderId/outfordelivery')
  .post([auth(userTypes.DELIVERY), validate(deliveryValidation.validateParam)], deliveryController.outForDeliveryOrder);

module.exports = router;
