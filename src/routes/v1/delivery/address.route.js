const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { addressController } = require('../../../controllers/delivery');
const { addressValidation } = require('../../../validations/delivery');

router
  .route('/')
  .get([auth(userTypes.DELIVERY), validate(addressValidation.getAllAddresses)], addressController.getAllAddresses);
router
  .route('/:id')
  .get([auth(userTypes.DELIVERY), validate(addressValidation.validateParam)], addressController.getAddressById);

module.exports = router;
