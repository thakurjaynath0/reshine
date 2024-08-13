const Error = require('../errors');
const { IssueType } = require('../models');

const queryIssueTypes = async (filter, options) => {
  const result = await IssueType.paginate(filter, options);
  return result;
};

const getAllIssueTypes = async (filter, options) => {
  const issueTypes = await queryIssueTypes(filter, options);
  return issueTypes;
};

const getIssueTypeById = async (issueTypeId) => {
  const issueType = await IssueType.findOne({ _id: issueTypeId });

  if (!issueType) {
    throw new Error.NotFoundError('issueType_not_found.');
  }

  return issueType;
};

const createIssueType = async ({ name }) => {
  const issueType = await IssueType.create({ name });
  return issueType;
};

const updateIssueTypeById = async (issueTypeId, updateBody) => {
  const issueType = await getIssueTypeById(issueTypeId);
  Object.assign(issueType, updateBody);
  issueType.save();
  return issueType;
};

const deleteIssueTypeById = async (issueTypeId) => {
  const issueType = await getIssueTypeById(issueTypeId);
  issueType.remove();
  return issueType;
};

module.exports = {
  getAllIssueTypes,
  getIssueTypeById,
  createIssueType,
  updateIssueTypeById,
  deleteIssueTypeById,
};
