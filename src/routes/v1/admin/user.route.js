const express = require('express');
const validate = require('../../../middlewares/validate');
const userValidation = require('../../../validations/admin/user.validation');
const { userCouponValidation } = require('../../../validations/admin');
const userController = require('../../../controllers/admin/user.controller');
const { userCouponController } = require('../../../controllers/admin');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');

const router = express.Router();

const defaultMiddleware = [auth(userTypes.SUPERUSER, userTypes.ADMIN)];

router
  .route('/')
  .get([...defaultMiddleware, validate(userValidation.getUsers)], userController.getUsers)
  .post([...defaultMiddleware, validate(userValidation.createUser)], userController.createUser);

router
  .route('/:userId')
  .get([...defaultMiddleware, validate(userValidation.getUser)], userController.getUser)
  .patch([...defaultMiddleware, validate(userValidation.updateUser)], userController.updateUser);
// .delete([...defaultMiddleware, validate(userValidation.deactivateUser)], userController.deactivateUser);

router
  .route('/:userId/coupons')
  .get([...defaultMiddleware, validate(userCouponValidation.getAllUserCoupons)], userCouponController.getAllUserCoupons)
  .post([...defaultMiddleware, validate(userCouponValidation.createUserCoupon)], userCouponController.createUserCoupon);

router
  .route('/:userId/coupons/:id')
  .get([...defaultMiddleware, validate(userCouponValidation.validateParam)], userCouponController.getUserCouponById)
  .patch(
    [...defaultMiddleware, validate(userCouponValidation.updateUserCouponById)],
    userCouponController.updateUserCouponById
  )
  .delete([...defaultMiddleware, validate(userCouponValidation.validateParam)], userCouponController.deleteUserCouponById);

module.exports = router;
