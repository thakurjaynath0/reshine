const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { announcementController } = require('../../../controllers/user');
const { announcementValidation } = require('../../../validations/user');

router
  .route('/')
  .get(
    [auth(userTypes.USER), validate(announcementValidation.getAllAnnouncement)],
    announcementController.getAllAnnouncements
  );

router
  .route('/:id')
  .get([auth(userTypes.USER), validate(announcementValidation.validateParam)], announcementController.getAnnouncementById);

module.exports = router;
