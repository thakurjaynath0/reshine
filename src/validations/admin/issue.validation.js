const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllIssues = {
  query: JOI.object().keys({
    user: JOI.string().custom(objectId),
    order: JOI.string().custom(objectId),
    issueType: JOI.string().custom(objectId),
    active: JOI.boolean(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

const createIssue = {
  body: JOI.object().keys({
    user: JOI.string().required().custom(objectId),
    order: JOI.string().required().custom(objectId),
    issueType: JOI.string().required().custom(objectId),
    issue: JOI.string().required().min(20).max(2000),
    active: JOI.boolean(),
  }),
};

const updateIssueById = {
  params: validateParam.params,
  body: JOI.object().keys({
    user: JOI.string().custom(objectId),
    order: JOI.string().custom(objectId),
    issueType: JOI.string().custom(objectId),
    issue: JOI.string().min(20).max(2000),
    active: JOI.boolean(),
  }),
};

module.exports = {
  validateParam,
  getAllIssues,
  createIssue,
  updateIssueById,
};
