const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { announcementController } = require('../../../controllers/admin');
const { announcementValidation } = require('../../../validations/admin');

router
  .route('/')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(announcementValidation.getAllAnnouncement)],
    announcementController.getAllAnnouncements
  )
  .post(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(announcementValidation.createAnnouncement)],
    announcementController.createAnnouncement
  );

router
  .route('/:id')
  .get(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(announcementValidation.validateParam)],
    announcementController.getAnnouncementById
  )
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(announcementValidation.updateAnnouncementById)],
    announcementController.updateAnnouncementById
  )
  .delete(
    [auth(userTypes.SUPERUSER), validate(announcementValidation.validateParam)],
    announcementController.deleteAnnouncementById
  );

module.exports = router;
