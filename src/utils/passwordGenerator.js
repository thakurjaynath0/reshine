const crypto = require('crypto');

const generatePassword = (length, options) => {
  const digits = '0123456789';
  const lowercaseAlphabets = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseAlphabets = lowercaseAlphabets.toUpperCase();
  const specialChars = '!@#&';

  const passwordOptions = options || {};

  passwordOptions.digits = Object.prototype.hasOwnProperty.call(passwordOptions, 'digits') ? passwordOptions.digits : true;
  passwordOptions.lowercaseAlphabets = Object.prototype.hasOwnProperty.call(passwordOptions, 'lowercaseAlphabets')
    ? passwordOptions.lowercaseAlphabets
    : true;
  passwordOptions.uppercaseAlphabets = Object.prototype.hasOwnProperty.call(passwordOptions, 'uppercaseAlphabets')
    ? passwordOptions.uppercaseAlphabets
    : true;
  passwordOptions.specialChars = Object.prototype.hasOwnProperty.call(passwordOptions, 'specialChars')
    ? passwordOptions.specialChars
    : true;

  const passwordChars =
    (passwordOptions.digits ? digits : '') +
    (passwordOptions.lowerCaseAlphabets ? lowercaseAlphabets : '') +
    (passwordOptions.uppercaseAlphabets ? uppercaseAlphabets : '') +
    (passwordOptions.specialChars ? specialChars : '');

  let password = '';
  while (password.length < length) {
    const idx = crypto.randomInt(0, passwordChars.length);
    if (!(password.length === 0 && passwordOptions.digits === true && passwordChars[idx] === '0')) {
      password += passwordChars[idx];
    }
  }

  return password;
};

module.exports = {
  generatePassword,
};
