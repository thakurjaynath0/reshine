const router = require('express').Router();

const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { fileUploadController } = require('../../../controllers/admin');
const multer = require('../../../middlewares/multer');
const upload = require('../../../services/multer.service');

router
  .route('/')
  .post([auth(userTypes.ADMIN, userTypes.SUPERUSER), multer(upload.array('file'))], fileUploadController.fileUpload);

module.exports = router;
