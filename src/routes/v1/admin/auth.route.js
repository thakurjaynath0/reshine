const express = require('express');
const validate = require('../../../middlewares/validate');
const adminAuthValidation = require('../../../validations/admin/auth.validation');
const authController = require('../../../controllers/admin/auth.controller');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');

const router = express.Router();

router.post('/login', validate(adminAuthValidation.login), authController.login);
router.post(
  '/change-password',
  [auth(userTypes.ADMIN), validate(adminAuthValidation.changePassword)],
  authController.changePassword
);
router.post('/logout', validate(adminAuthValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(adminAuthValidation.refreshTokens), authController.refreshTokens);

module.exports = router;
