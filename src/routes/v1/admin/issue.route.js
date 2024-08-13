const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { issueController } = require('../../../controllers/admin');
const { issueValidation } = require('../../../validations/admin');

router
  .route('/')
  .get([auth(userTypes.SUPERUSER), validate(issueValidation.getAllIssues)], issueController.getAllIssues)
  .post([auth(userTypes.SUPERUSER), validate(issueValidation.createIssue)], issueController.createIssue);

router
  .route('/:id')
  .get([auth(userTypes.SUPERUSER), validate(issueValidation.validateParam)], issueController.getIssueById)
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(issueValidation.updateIssueById)],
    issueController.updateIssueById
  )
  .delete([auth(userTypes.SUPERUSER), validate(issueValidation.validateParam)], issueController.deleteIssueById);

module.exports = router;
