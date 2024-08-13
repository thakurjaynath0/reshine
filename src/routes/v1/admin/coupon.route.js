const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { couponController } = require('../../../controllers/admin');
const { couponValidation } = require('../../../validations/admin');

router
  .route('/')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(couponValidation.getAllCoupons)],
    couponController.getAllCoupons
  )
  .post(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(couponValidation.createCoupon)],
    couponController.createCoupon
  );

router
  .route('/:id')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(couponValidation.validateParam)],
    couponController.getCouponById
  )
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(couponValidation.updateCouponById)],
    couponController.updateCouponById
  )
  .delete([auth(userTypes.SUPERUSER), validate(couponValidation.validateParam)], couponController.deleteCouponById);

module.exports = router;
