const express = require('express');
const validate = require('../../../middlewares/validate');
const userAuthValidation = require('../../../validations/user/auth.validation');
const authController = require('../../../controllers/user/auth.controller');
const auth = require('../../../middlewares/auth');
const userType = require('../../../config/enums/userType.enum');

const router = express.Router();

router.post('/otp', validate(userAuthValidation.getLoginOtp), authController.getLoginOtp);
router.post('/login', validate(userAuthValidation.loginWithOtp), authController.loginWithOtp);

router.post('/send-verification-email', auth(userType.USER), authController.sendVerificationEmail);
router.get('/verify-email', validate(userAuthValidation.verifyEmail), authController.verifyEmail);

router.post('/logout', validate(userAuthValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(userAuthValidation.refreshTokens), authController.refreshTokens);

module.exports = router;
