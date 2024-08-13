const { User } = require('../models');
const Errors = require('../errors');
const userTypeEnum = require('../config/enums/userType.enum');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (userBody.email && (await User.isEmailTaken(userBody.email))) {
    throw new Errors.BadRequestError('Email already taken');
  }
  if (userBody.username && (await User.isUsernameTaken(userBody.username))) {
    throw new Errors.BadRequestError('Username already taken');
  }
  if (userBody.phone && (await User.isPhoneTaken(userBody.phone))) {
    throw new Errors.BadRequestError('Phone already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserByPhone = async (phone, options = {}) => {
  const user = await User.findOne({ phone, ...options });
  return user;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Errors.NotFoundError('User not found');
  }

  return user;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email, options = {}) => {
  return User.findOne({ email, ...options });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user || user.role === userTypeEnum.SUPERUSER) {
    throw new Errors.NotFoundError('User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new Errors.BadRequestError('Email already taken');
  }
  if (updateBody.phone && (await User.isPhoneTaken(updateBody.phone, userId))) {
    throw new Errors.BadRequestError('Phone already taken');
  }
  if (updateBody.username && (await User.isUsernameTaken(updateBody.username))) {
    throw new Errors.BadRequestError('Username already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user || user.role === userTypeEnum.SUPERUSER) {
    throw new Errors.NotFoundError('User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserByPhone,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
