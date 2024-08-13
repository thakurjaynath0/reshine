const JOI = require('joi');
const { objectId } = require('../custom.validation');
const { rateTypes } = require('../../config/enums/rateType.enum');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllServiceTypes = {
  query: JOI.object().keys({
    rateType: JOI.string().valid(...Object.values(rateTypes)),
    rate: JOI.number().integer(),
    active: JOI.boolean(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

module.exports = {
  validateParam,
  getAllServiceTypes,
};
