const httpStatus = require('http-status');
const { userService } = require('../../services');

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  res.status(httpStatus.OK).json(user);
};

module.exports = {
  getUser,
};
