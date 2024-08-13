const Error = require('../errors');
const { Issue } = require('../models');
const userService = require('./user.service');
const issueTypeService = require('./issueType.service');
const orderService = require('./order.service');

const queryIssues = async (filter, options) => {
  const result = await Issue.paginate(filter, options);
  return result;
};

const getAllIssues = async (filter, options) => {
  const issues = await queryIssues(filter, options);
  return issues;
};

const getIssueById = async (issueId, { query, options } = {}) => {
  let issue = Issue.findOne({ _id: issueId, ...query });

  if (options?.user) issue.populate('userInfo');
  if (options?.order) issue.populate('orderInfo');
  if (options?.issueType) issue.populate('issueTypeInfo');

  issue = await issue;

  if (!issue) {
    throw new Error.NotFoundError('issue_not_found');
  }

  return issue;
};

const createIssue = async ({ user, phone, order, issueType, issue, active }) => {
  await userService.getUserById(user);
  await orderService.getOrderById(order);
  await issueTypeService.getIssueTypeById(issueType);

  const newIssue = await Issue.create({ user, phone, order, issueType, issue, active });
  return newIssue;
};

const updateIssueById = async (issueId, updateBody, { query, options } = {}) => {
  const issue = await getIssueById(issueId, { query, options });

  if (updateBody?.user) await userService.getUserById(updateBody.user);
  if (updateBody?.order) await orderService.getOrderById(updateBody.order);
  if (updateBody?.issueTypeService) await issueTypeService.getIssueTypeById(updateBody.issueType);

  Object.assign(issue, updateBody);
  issue.save();
  return issue;
};

const deleteIssueById = async (issueId, { query, options } = {}) => {
  const issue = await getIssueById(issueId, { query, options });
  issue.remove();
  return issue;
};

module.exports = {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssueById,
  deleteIssueById,
};
