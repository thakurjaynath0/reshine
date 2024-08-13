const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllClothServicePricings = {
  query: JOI.object().keys({
    cloth: JOI.string().custom(objectId),
    service: JOI.string().custom(objectId),
    price: JOI.number().integer(),
    active: JOI.boolean(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

module.exports = {
  validateParam,
  getAllClothServicePricings,
};
