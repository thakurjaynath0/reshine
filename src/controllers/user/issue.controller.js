const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { issueService } = require('../../services');

const getAllIssues = async (req, res) => {
  const filter = pick(req.query, ['order', 'issueType', 'active']);
  filter.user = req.user._id;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'userInfo, orderInfo, issueTypeInfo';
  const issues = await issueService.getAllIssues(filter, options);
  res.status(httpStatus.OK).json(issues);
};

const getIssueById = async (req, res) => {
  const { id } = req.params;
  const issue = await issueService.getIssueById(id, {
    query: {
      user: req.user._id,
    },
    options: {
      user: true,
      order: true,
      issueType: true,
    },
  });

  res.status(httpStatus.OK).json(issue);
};

const createIssue = async (req, res) => {
  const { order, issueType, issue, active } = req.body;
  const newIssue = await issueService.createIssue({ user: req.user._id, order, issueType, issue, active });
  res.status(httpStatus.CREATED).json(newIssue);
};

const updateIssueById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const issue = await issueService.updateIssueById(id, updateBody, {
    query: {
      user: req.user._id,
    },
  });
  res.status(httpStatus.OK).json(issue);
};

module.exports = {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssueById,
};
