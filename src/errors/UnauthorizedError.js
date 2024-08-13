const httpStatus = require('http-status');
const ApiError = require('./ApiError');

class UnauthorizedError extends ApiError {
  constructor(message) {
    super(httpStatus.FORBIDDEN, message);
  }
}

module.exports = UnauthorizedError;
