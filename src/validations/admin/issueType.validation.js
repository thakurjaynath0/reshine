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

const createIssueType = {
  body: JOI.object().keys({
    name: JOI.string().required().min(5).max(100),
  }),
};

const updateIssueTypeById = {
  params: validateParam.params,
  body: JOI.object().keys({
    name: JOI.string().min(5).max(100),
  }),
};

module.exports = {
  validateParam,
  getAllIssueTypes,
  createIssueType,
  updateIssueTypeById,
};
