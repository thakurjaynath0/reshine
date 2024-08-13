const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { addressController } = require('../../../controllers/admin');
const { addressValidation } = require('../../../validations/admin');

router
  .route('/')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(addressValidation.getAllAddresses)],
    addressController.getAllAddresses
  )
  .post(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(addressValidation.createAddress)],
    addressController.createAddress
  );

router
  .route('/:id')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(addressValidation.validateParam)],
    addressController.getAddressById
  )
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(addressValidation.updateAddressById)],
    addressController.updateAddressById
  )
  .delete([auth(userTypes.SUPERUSER), validate(addressValidation.validateParam)], addressController.deleteAddressById);

module.exports = router;
