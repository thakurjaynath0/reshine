const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { issueTypeController } = require('../../../controllers/user');
const { issueTypeValidation } = require('../../../validations/user');

router
  .route('/')
  .get([auth(userTypes.USER), validate(issueTypeValidation.getAllIssueTypes)], issueTypeController.getAllIssueTypes);
router
  .route('/:id')
  .get([auth(userTypes.USER), validate(issueTypeValidation.validateParam)], issueTypeController.getIssueTypeById);

module.exports = router;
