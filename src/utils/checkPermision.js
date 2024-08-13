const Errors = require('../errors');
const { userTypes } = require('../config/enums/userType.enum');

const chechPermission = (requestUser, resourceUserId) => {
  if (requestUser.role === userTypes.ADMIN || requestUser.role === userTypes.SUPERUSER) return;

  if (requestUser._id.toString() === resourceUserId.toString()) return;

  throw new Errors.UnauthorizedError('not_authorized_for_the_resource');
};

module.exports = chechPermission;
