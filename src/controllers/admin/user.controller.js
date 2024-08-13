const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const Errors = require('../../errors');
const { userService } = require('../../services');
const userTypeEnum = require('../../config/enums/userType.enum');
const queryBuilder = require('../../utils/queryBuilder');

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
};

const getUsers = async (req, res) => {
  const filter = queryBuilder(req.query, {
    booleanFields: ['isEmailVerified', 'active'],
    dateFields: ['createdAt', 'updatedAt'],
    stringFields: ['role'],
    searchFields: ['username', 'name', 'phone', 'email'],
  });
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user || user.role === userTypeEnum.SUPERUSER) {
    throw new Errors.NotFoundError('User not found');
  }
  res.send(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
};

const deactivateUser = async (req, res) => {
  await userService.updateUserById(req.params.userId, { active: false });
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deactivateUser,
};
