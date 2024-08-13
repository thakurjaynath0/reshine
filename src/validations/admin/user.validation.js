const Joi = require('joi');
const { password, objectId, phoneNumber } = require('../custom.validation');
const { userTypes } = require('../../config/enums/userType.enum');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    phone: Joi.string().required().custom(phoneNumber),
    role: Joi.string().required().valid(userTypes.USER, userTypes.DELIVERY, userTypes.ADMIN),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    search: Joi.string(),
    role: Joi.string().valid(userTypes.USER, userTypes.DELIVERY, userTypes.ADMIN),
    isEmailVerified: Joi.boolean(),
    active: Joi.boolean(),
    dateFilters: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
      role: Joi.string().valid(userTypes.USER, userTypes.DELIVERY, userTypes.ADMIN),
      active: Joi.boolean(),
    })
    .min(1),
};

const deactivateUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deactivateUser,
};
