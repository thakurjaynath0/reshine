const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { laundaryServiceController } = require('../../../controllers/user');
const { laundaryServiceValidation } = require('../../../validations/user');

router
  .route('/')
  .get(
    [auth(userTypes.USER), validate(laundaryServiceValidation.getAllLaundaryServices)],
    laundaryServiceController.getAllLaundaryServices
  );

router
  .route('/:id')
  .get(
    [auth(userTypes.USER), validate(laundaryServiceValidation.validateParam)],
    laundaryServiceController.getLaundaryServiceById
  );

module.exports = router;
