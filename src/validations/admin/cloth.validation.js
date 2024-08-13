const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllClothes = {
  query: JOI.object().keys({
    name: JOI.string(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

const createCloth = {
  body: JOI.object().keys({
    name: JOI.string().required().min(5).max(50),
    description: JOI.string().min(15).max(1000),
    icon: JOI.string(),
    photo: JOI.string(),
  }),
};

const updateClothById = {
  params: validateParam.params,
  body: JOI.object().keys({
    name: JOI.string().min(5).max(50),
    description: JOI.string().min(15).max(1000),
    icon: JOI.string(),
    photo: JOI.string(),
  }),
};

module.exports = {
  validateParam,
  getAllClothes,
  createCloth,
  updateClothById,
};
