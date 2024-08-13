const { generatePassword } = require('../utils/passwordGenerator');

const generateOtp = (length = 6) => {
  const otp = generatePassword(length, {
    digits: true,
    lowercaseAlphabets: false,
    uppercaseAlphabets: false,
    specialChars: false,
  });
  return otp;
};

module.exports = {
  generateOtp,
};
