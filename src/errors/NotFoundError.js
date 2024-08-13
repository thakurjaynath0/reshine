const httpStatus = require('http-status');
const ApiError = require('./ApiError');

class NotFoundError extends ApiError {
  constructor(message) {
    super(httpStatus.NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
