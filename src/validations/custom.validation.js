const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const phoneNumber = (value, helpers) => {
  if (!value.match(/^[0-9]{10}$/)) {
    return helpers.message('"{{#label}}" is invalid');
  }
  return value;
};

const otp = (value, helpers) => {
  if (!value.match(/^[0-9]{6}$/)) {
    return helpers.message('"{{#label}}" is invalid');
  }
  return value;
};

const pincode = (value, helpers) => {
  if (value.length !== 6) {
    return helpers.message('invalid length for pincode');
  }
  if (!value.match(/^[1-9]{1}[0-9]{5}$/)) {
    return helpers.message('invalid pincode');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  phoneNumber,
  otp,
  pincode,
};
