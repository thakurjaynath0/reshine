const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const Errors = require('../errors');
const { tokenTypes } = require('../config/tokens');
const { userTypes } = require('../config/enums/userType.enum');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email, {
    role: { $in: [userTypes.ADMIN, userTypes.DELIVERY, userTypes.SUPERUSER] },
    active: true,
  });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new Errors.UnauthenticatedError('Incorrect email or password');
  }
  return user;
};

const loginUserWithOtp = async (phone, otp) => {
  const user = await userService.getUserByPhone(phone, { active: true });
  if (!user || !(await user.validateOtp(otp))) {
    throw new Errors.UnauthenticatedError('Incorrect otp');
  }
  return user;
};

const resetOtp = async (user) => {
  Object.assign(user, { otp: '', otpExpiry: '' });
  await user.save();
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new Errors.NotFoundError('Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new Errors.UnauthenticatedError('Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new Errors.UnauthenticatedError('Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user || user.isEmailVerified) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new Errors.UnauthenticatedError('Email verification failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginUserWithOtp,
  resetOtp,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
