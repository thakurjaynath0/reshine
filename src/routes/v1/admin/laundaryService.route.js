const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { laundaryServiceController } = require('../../../controllers/admin');
const { laundaryServiceValidation } = require('../../../validations/admin');

router
  .route('/')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(laundaryServiceValidation.getAllLaundaryServices)],
    laundaryServiceController.getAllLaundaryServices
  )
  .post(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(laundaryServiceValidation.createLaundaryService)],
    laundaryServiceController.createLaundaryService
  );

router
  .route('/:id')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(laundaryServiceValidation.validateParam)],
    laundaryServiceController.getLaundaryServiceById
  )
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(laundaryServiceValidation.updateLaundaryServiceById)],
    laundaryServiceController.updateLaundaryServiceById
  )
  .delete(
    [auth(userTypes.SUPERUSER), validate(laundaryServiceValidation.validateParam)],
    laundaryServiceController.deleteLaundaryServiceById
  );

module.exports = router;
