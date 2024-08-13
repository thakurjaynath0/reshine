const axios = require('axios');
const config = require('../config/config');
const { sendEmail } = require('./email.service');

/**
 * @param {Object}
 * @param {String} otp
 * @param {Array<String>} numbers
 * @returns {Promise<Boolean>}
 */
const sendOtpFast2sms = async ({ otp, numbers }) => {
  try {
    await axios({
      url: 'https://www.fast2sms.com/dev/bulkV2',
      method: 'POST',
      headers: {
        authorization: config.sms.fast2sms.api_key,
        'Content-Type': 'application/json',
      },
      data: {
        variables_values: otp,
        route: 'otp',
        numbers: numbers.join(','),
      },
    });
  } catch (err) {
    return false;
  }
  return true;
};

const sendOtpTest = async ({ otp, numbers }) => {
  await sendEmail('nikhil@the-binaries.xyz', 'Otp', `${numbers.join('-')} \n ${otp}`);
  return true;
};

module.exports = {
  sendOtp: config.env === 'development' ? sendOtpTest : sendOtpFast2sms,
};
