const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { serviceTypeContoller } = require('../../../controllers/user');
const { serviceTypeValidation } = require('../../../validations/user');

router
  .route('/')
  .get([auth(userTypes.USER), validate(serviceTypeValidation.getAllServiceTypes)], serviceTypeContoller.getAllServiceTypes);

router
  .route('/:id')
  .get([auth(userTypes.USER), validate(serviceTypeValidation.validateParam)], serviceTypeContoller.getServiceTypeById);

module.exports = router;
