const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { serviceTypeContoller } = require('../../../controllers/admin');
const { serviceTypeValidation } = require('../../../validations/admin');

router
  .route('/')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(serviceTypeValidation.getAllServiceTypes)],
    serviceTypeContoller.getAllServiceTypes
  )
  .post(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(serviceTypeValidation.createServiceType)],
    serviceTypeContoller.createServiceType
  );

router
  .route('/:id')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(serviceTypeValidation.validateParam)],
    serviceTypeContoller.getServiceTypeById
  )
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(serviceTypeValidation.updateServiceType)],
    serviceTypeContoller.updateServiceTypeById
  )
  .delete(
    [auth(userTypes.SUPERUSER), validate(serviceTypeValidation.validateParam)],
    serviceTypeContoller.deleteServiceTypeById
  );

module.exports = router;
