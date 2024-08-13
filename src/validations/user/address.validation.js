const JOI = require('joi');
const { objectId } = require('../custom.validation');

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

module.exports = {
  validateParam,
  getAllAddresses,
};
