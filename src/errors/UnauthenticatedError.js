const httpStatus = require('http-status');
const ApiError = require('./ApiError');

class UnauthenticatedError extends ApiError {
  constructor(message) {
    super(httpStatus.UNAUTHORIZED, message);
  }
}

module.exports = UnauthenticatedError;
