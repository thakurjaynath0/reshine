const JOI = require('joi');
const { objectId, pincode } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllAddresses = {
  query: JOI.object().keys({
    country: JOI.string(),
    state: JOI.string(),
    city: JOI.string(),
    pincode: JOI.string(),
    active: JOI.boolean(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

const createAddress = {
  body: JOI.object().keys({
    state: JOI.string().required(),
    city: JOI.string().required(),
    address: JOI.string().required(),
    landmark: JOI.string(),
    pincode: JOI.string().required().custom(pincode),
    deliveryCharge: JOI.number().integer().required(),
    active: JOI.boolean(),
  }),
};

const updateAddressById = {
  params: validateParam.params,
  body: JOI.object().keys({
    state: JOI.string(),
    city: JOI.string(),
    address: JOI.string(),
    landmark: JOI.string(),
    pincode: JOI.string().custom(pincode),
    deliveryCharge: JOI.number().integer(),
    active: JOI.boolean(),
  }),
};

module.exports = {
  validateParam,
  getAllAddresses,
  createAddress,
  updateAddressById,
};
