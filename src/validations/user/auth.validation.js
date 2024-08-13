const Joi = require('joi');
const { phoneNumber, otp } = require('../custom.validation');
const { logout, refreshTokens } = require('../admin/auth.validation');

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const getLoginOtp = {
  body: Joi.object().keys({
    phone: Joi.string().required().length(10).custom(phoneNumber),
  }),
};

const loginWithOtp = {
  body: Joi.object().keys({
    phone: Joi.string().required().length(10).custom(phoneNumber),
    otp: Joi.string().required().length(6).custom(otp),
  }),
};

module.exports = {
  verifyEmail,
  getLoginOtp,
  loginWithOtp,
  logout,
  refreshTokens,
};
