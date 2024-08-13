const httpStatus = require('http-status');
const { authService, userService, tokenService, emailService } = require('../../services');
const { generateOtp } = require('../../services/otp.service');
const { sendOtp } = require('../../services/sms.service');
const Errors = require('../../errors');
const { logout, refreshTokens } = require('../admin/auth.controller');

const sendVerificationEmail = async (req, res) => {
  if (!req.user.email) {
    throw new Errors.BadRequestError('No email address');
  }
  if (req.user.isEmailVerified) {
    throw new Errors.BadRequestError('Email already verified');
  }
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
};

const verifyEmail = async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.OK).send('<h3>Email verified successfully.</h3>');
};

const getLoginOtp = async (req, res) => {
  const { phone } = req.body;
  let user = await userService.getUserByPhone(phone);
  // if (user && user.role !== 'user') {
  //   res.status(httpStatus.OK).send();
  // }
  const otp = generateOtp(6);
  const otpSent = await sendOtp({
    otp,
    numbers: [phone],
  });
  if (!otpSent) {
    res.status(httpStatus.OK).send();
  }
  if (!user) {
    user = await userService.createUser({
      phone,
    });
  }
  Object.assign(user, {
    otp,
  });
  await user.save();
  res.status(httpStatus.OK).send();
};

const loginWithOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await authService.loginUserWithOtp(phone, otp);
  const tokens = await tokenService.generateAuthTokens(user);
  await authService.resetOtp(user);
  res.status(httpStatus.OK).json({ user, tokens });
};

module.exports = {
  sendVerificationEmail,
  verifyEmail,
  getLoginOtp,
  loginWithOtp,
  logout,
  refreshTokens,
};
