const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllIssueTypes = {
  query: JOI.object().keys({
    name: JOI.string(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

module.exports = {
  validateParam,
  getAllIssueTypes,
};
