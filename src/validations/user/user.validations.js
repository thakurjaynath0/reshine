const Joi = require('joi');
const { password, phoneNumber, otp } = require('../custom.validation');

const updatePhone = {
  body: Joi.object().keys({
    phone: Joi.string().required().custom(phoneNumber),
    otpForCurrentPhone: Joi.string().required().custom(otp),
    otpForNewPhone: Joi.string().required().custom(otp),
  }),
};

const getPhoneUpdateOtp = {
  body: Joi.object().keys({
    phone: Joi.string().required().custom(phoneNumber),
  }),
};

const update = {
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

module.exports = {
  update,
  updatePhone,
  getPhoneUpdateOtp,
};
