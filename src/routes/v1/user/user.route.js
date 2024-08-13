const express = require('express');
const validate = require('../../../middlewares/validate');
const userValidation = require('../../../validations/user/user.validations');
const { userCouponValidation } = require('../../../validations/user');
const userController = require('../../../controllers/user/user.controller');
const { userCouponController } = require('../../../controllers/user');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');

const router = express.Router();

const defaultMiddlewares = [auth(userTypes.USER, userTypes.SUPERUSER, userTypes.ADMIN)];

router.route('/').get([...defaultMiddlewares], userController.getUser);

router.route('/update').patch([...defaultMiddlewares, validate(userValidation.update)], userController.updateUser);

router
  .route('/update/phone')
  .patch([...defaultMiddlewares, validate(userValidation.updatePhone)], userController.updatePhone);
router
  .route('/update/phone/otp')
  .post([...defaultMiddlewares, validate(userValidation.getPhoneUpdateOtp)], userController.getUpdatePhoneOtp);

router
  .route('/coupons')
  .get([...defaultMiddlewares, validate(userCouponValidation.getAllUserCoupons)], userCouponController.getAllUserCoupons);

router
  .route('/coupons/:id')
  .get([...defaultMiddlewares, validate(userCouponValidation.validateParam)], userCouponController.getUserCouponById);

module.exports = router;
