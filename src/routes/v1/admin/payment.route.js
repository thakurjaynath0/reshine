const express = require('express');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { paymentController } = require('../../../controllers/admin');
const validate = require('../../../middlewares/validate');
const { paymentValidation } = require('../../../validations/admin');

const router = express.Router();

const defaultMiddlewares = [auth(userTypes.SUPERUSER, userTypes.ADMIN)];

router.route('/').get([...defaultMiddlewares, validate(paymentValidation.queryPayment)], paymentController.queryPayments);
router
  .route('/:paymentId')
  .get([...defaultMiddlewares, validate(paymentValidation.getPayment)], paymentController.getPayment);

module.exports = router;
