const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { clothServicePricingController } = require('../../../controllers/admin');
const { clothServicePricingValidation } = require('../../../validations/admin');

router
  .route('/')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(clothServicePricingValidation.getAllClothServicePricings)],
    clothServicePricingController.getAllClothServicePricings
  )
  .post(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(clothServicePricingValidation.createClothServicePricing)],
    clothServicePricingController.createClothServicePricing
  );

router
  .route('/:id')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(clothServicePricingValidation.validateParam)],
    clothServicePricingController.getClothServicePricingById
  )
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(clothServicePricingValidation.updateClothServicePricingById)],
    clothServicePricingController.updateClothServicePricingById
  )
  .delete(
    [auth(userTypes.SUPERUSER), validate(clothServicePricingValidation.validateParam)],
    clothServicePricingController.deleteClothServicePricingById
  );

module.exports = router;
