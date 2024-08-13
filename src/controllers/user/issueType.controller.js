const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { issueTypeService } = require('../../services');

const getAllIssueTypes = async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const issueTypes = await issueTypeService.getAllIssueTypes(filter, options);
  res.status(httpStatus.OK).json(issueTypes);
};

const getIssueTypeById = async (req, res) => {
  const { id } = req.params;
  const issueType = await issueTypeService.getIssueTypeById(id);
  res.status(httpStatus.OK).json(issueType);
};

module.exports = {
  getAllIssueTypes,
  getIssueTypeById,
};
