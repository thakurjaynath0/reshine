const httpStatus = require('http-status');
const { userService } = require('../../services');
const { User } = require('../../models');
const Errors = require('../../errors');
const otpService = require('../../services/otp.service');
const smsService = require('../../services/sms.service');

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  res.status(httpStatus.OK).send(user);
};

const updateUser = async (req, res) => {
  if (req.body.email && req.body.email !== req.user.email) {
    Object.assign(req.body, { isEmailVerified: false });
  }
  const user = await userService.updateUserById(req.user._id, req.body);
  res.status(httpStatus.OK).send(user);
};

const getUpdatePhoneOtp = async (req, res) => {
  const { phone } = req.body;
  if (await User.isPhoneTaken(phone, req.user._id)) {
    throw new Errors.BadRequestError('Phone already taken.');
  }
  const otpForCurrentPhone = otpService.generateOtp(6);
  const otpForNewPhone = otpService.generateOtp(6);
  const currentPhoneOtpConfirmation = await smsService.sendOtp({
    otp: otpForCurrentPhone,
    numbers: [req.user.phone],
  });

  const newPhoneOtpConfirmation = await smsService.sendOtp({
    otp: otpForNewPhone,
    numbers: [phone],
  });

  if (!(currentPhoneOtpConfirmation || newPhoneOtpConfirmation)) {
    res.status(httpStatus.OK).send();
  }

  const otp = `${req.user.phone}-${otpForCurrentPhone}-${phone}-${otpForNewPhone}`;

  Object.assign(req.user, { otp });
  await req.user.save();
  res.status(httpStatus.OK).send();
};

const updatePhone = async (req, res) => {
  const { phone, otpForNewPhone, otpForCurrentPhone } = req.body;
  const otp = `${req.user.phone}-${otpForCurrentPhone}-${phone}-${otpForNewPhone}`;

  const verifyOtp = await req.user.validateOtp(otp);
  if (!verifyOtp) {
    throw new Errors.BadRequestError('Invalid otp.');
  }
  Object.assign(req.user, { phone, otp: '', otpExpiry: '' });
  await req.user.save();
  res.status(httpStatus.OK).send();
};

module.exports = {
  getUser,
  updateUser,
  getUpdatePhoneOtp,
  updatePhone,
};
