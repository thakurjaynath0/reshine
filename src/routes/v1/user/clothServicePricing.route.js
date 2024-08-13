const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { clothServicePricingController } = require('../../../controllers/user');
const { clothServicePricingValidation } = require('../../../validations/user');

router
  .route('/')
  .get(
    [auth(userTypes.USER), validate(clothServicePricingValidation.getAllClothServicePricings)],
    clothServicePricingController.getAllClothServicePricings
  );

router
  .route('/:id')
  .get(
    [auth(userTypes.USER), validate(clothServicePricingValidation.validateParam)],
    clothServicePricingController.getClothServicePricingById
  );

module.exports = router;
