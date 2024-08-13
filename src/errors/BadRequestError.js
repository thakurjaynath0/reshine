const httpStatus = require('http-status');
const ApiError = require('./ApiError');

class BadRequestError extends ApiError {
  constructor(message) {
    super(httpStatus.BAD_REQUEST, message);
  }
}

module.exports = BadRequestError;
