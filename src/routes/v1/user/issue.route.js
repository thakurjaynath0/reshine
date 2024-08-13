const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { issueController } = require('../../../controllers/user');
const { issueValidation } = require('../../../validations/user');

router
  .route('/')
  .get([auth(userTypes.USER), validate(issueValidation.getAllIssues)], issueController.getAllIssues)
  .post([auth(userTypes.USER), validate(issueValidation.createIssue)], issueController.createIssue);

router
  .route('/:id')
  .get([auth(userTypes.USER), validate(issueValidation.validateParam)], issueController.getIssueById)
  .patch([auth(userTypes.USER), validate(issueValidation.updateIssueById)], issueController.updateIssueById);

module.exports = router;
