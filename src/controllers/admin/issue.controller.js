const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { issueService } = require('../../services');

const getAllIssues = async (req, res) => {
  const filter = pick(req.query, ['user', 'order', 'issueType', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'userInfo, orderInfo, issueTypeInfo';
  const issues = await issueService.getAllIssues(filter, options);
  res.status(httpStatus.OK).json(issues);
};

const getIssueById = async (req, res) => {
  const { id } = req.params;
  const issue = await issueService.getIssueById(id, {
    options: {
      user: true,
      order: true,
      issueType: true,
    },
  });
  res.status(httpStatus.OK).json(issue);
};

const createIssue = async (req, res) => {
  const { user, order, issueType, issue, active } = req.body;
  const newIssue = await issueService.createIssue({ user, order, issueType, issue, active });
  res.status(httpStatus.CREATED).json(newIssue);
};

const updateIssueById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const issue = await issueService.updateIssueById(id, updateBody);
  res.status(httpStatus.OK).json(issue);
};

const deleteIssueById = async (req, res) => {
  const { id } = req.params;
  await issueService.deleteIssueById(id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssueById,
  deleteIssueById,
};
