const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { couponController } = require('../../../controllers/user');
const { couponValidation } = require('../../../validations/user');

router.route('/').get([auth(userTypes.USER), validate(couponValidation.getAllCoupons)], couponController.getAllCoupons);
router.route('/:id').get([auth(userTypes.USER), validate(couponValidation.validateParam)], couponController.getCouponById);

module.exports = router;
