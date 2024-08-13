const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllLaundaryServices = {
  query: JOI.object().keys({
    active: JOI.boolean(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

const createLaundaryService = {
  body: JOI.object().keys({
    name: JOI.string().required().min(5).max(50),
    description: JOI.string().min(15).max(1000),
    icon: JOI.string(),
    active: JOI.boolean(),
  }),
};

const updateLaundaryServiceById = {
  params: validateParam.params,
  body: JOI.object().keys({
    name: JOI.string().min(5).max(50),
    description: JOI.string().min(15).max(1000),
    icon: JOI.string(),
    active: JOI.boolean(),
  }),
};

module.exports = {
  validateParam,
  getAllLaundaryServices,
  createLaundaryService,
  updateLaundaryServiceById,
};
