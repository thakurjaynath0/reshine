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

const createIssueType = async (req, res) => {
  const { name } = req.body;
  const issueType = await issueTypeService.createIssueType({ name });
  res.status(httpStatus.CREATED).json(issueType);
};

const updateIssueTypeById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const issueType = await issueTypeService.updateIssueTypeById(id, updateBody);
  res.status(httpStatus.OK).json(issueType);
};

const deleteIssueTypeById = async (req, res) => {
  const { id } = req.params;
  await issueTypeService.deleteIssueTypeById(id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllIssueTypes,
  getIssueTypeById,
  createIssueType,
  updateIssueTypeById,
  deleteIssueTypeById,
};
