const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { issueTypeController } = require('../../../controllers/admin');
const { issueTypeValidation } = require('../../../validations/admin');

router
  .route('/')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(issueTypeValidation.getAllIssueTypes)],
    issueTypeController.getAllIssueTypes
  )
  .post(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(issueTypeValidation.createIssueType)],
    issueTypeController.createIssueType
  );

router
  .route('/:id')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(issueTypeValidation.validateParam)],
    issueTypeController.getIssueTypeById
  )
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(issueTypeValidation.updateIssueTypeById)],
    issueTypeController.updateIssueTypeById
  )
  .delete(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(issueTypeValidation.validateParam)],
    issueTypeController.deleteIssueTypeById
  );

module.exports = router;
