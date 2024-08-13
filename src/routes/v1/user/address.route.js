const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { addressController } = require('../../../controllers/user');
const { addressValidation } = require('../../../validations/user');

router
  .route('/')
  .get([auth(userTypes.USER), validate(addressValidation.getAllAddresses)], addressController.getAllAddresses);
router
  .route('/:id')
  .get([auth(userTypes.USER), validate(addressValidation.validateParam)], addressController.getAddressById);

module.exports = router;
