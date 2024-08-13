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

const createServiceType = {
  body: JOI.object().keys({
    name: JOI.string().required().min(5).max(50),
    rateType: JOI.string().valid(...Object.values(rateTypes)),
    rate: JOI.number().integer(),
    icon: JOI.string(),
    description: JOI.string().min(15).max(1000),
    active: JOI.boolean(),
  }),
};

const updateServiceType = {
  params: validateParam.params,
  body: JOI.object().keys({
    name: JOI.string().min(5).max(50),
    rateType: JOI.string().valid(...Object.values(rateTypes)),
    rate: JOI.number().integer(),
    icon: JOI.string(),
    description: JOI.string().min(15).max(1000),
    active: JOI.boolean(),
  }),
};

module.exports = {
  validateParam,
  getAllServiceTypes,
  createServiceType,
  updateServiceType,
};
