const passport = require('passport');
const Errors = require('../errors');

const verifyCallback = (req, resolve, reject, requiredRoles) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new Errors.UnauthenticatedError('Please authenticate'));
  }

  req.user = user;

  if (requiredRoles.length) {
    const hasRequiredRights = requiredRoles.includes(user.role);
    if (!hasRequiredRights) {
      return reject(new Errors.UnauthorizedError('Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRoles) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRoles))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
