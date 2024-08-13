const httpStatus = require('http-status');
const { authService, tokenService } = require('../../services');
const Errors = require('../../errors');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const isPasswordMatch = await req.user.isPasswordMatch(currentPassword);
  if (!isPasswordMatch) {
    throw new Errors.UnauthenticatedError('Incorrect password');
  }
  req.user.password = newPassword;
  await req.user.save();

  res.status(httpStatus.OK).send();
};

const logout = async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
};

const refreshTokens = async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
};

module.exports = {
  login,
  changePassword,
  logout,
  refreshTokens,
};
