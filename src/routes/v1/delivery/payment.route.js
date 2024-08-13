const express = require('express');
const { paymentController } = require('../../../controllers/delivery');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const validate = require('../../../middlewares/validate');
const { paymentValidation } = require('../../../validations/delivery');

const router = express.Router();

const defaultMiddlewares = [auth(userTypes.SUPERUSER, userTypes.ADMIN, userTypes.DELIVERY)];

router.get('/:orderId', [...defaultMiddlewares, validate(paymentValidation.getPayment)], paymentController.getPayment);
router.post(
  '/:orderId/initiate',
  [...defaultMiddlewares, validate(paymentValidation.initiatePayment)],
  paymentController.initiatePayment
);
router.post(
  '/:orderId/verify',
  [...defaultMiddlewares, validate(paymentValidation.verifyPayment)],
  paymentController.verifyPayment
);

module.exports = router;
