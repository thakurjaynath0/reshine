const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { paymentController } = require('../../../controllers/user');
const { paymentValidation } = require('../../../validations/user');

const defaultMiddlewares = [auth(userTypes.USER, userTypes.SUPERUSER, userTypes.ADMIN)];

router.route('/:orderId').get([...defaultMiddlewares, validate(paymentValidation.getPayment)], paymentController.getPayment);

module.exports = router;
