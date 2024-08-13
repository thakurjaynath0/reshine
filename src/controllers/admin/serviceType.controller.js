const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { serviceTypeService } = require('../../services');

const getAllServiceTypes = async (req, res) => {
  const filter = pick(req.query, ['name', 'rateType', 'rate', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const serviceTypes = await serviceTypeService.getAllServiceTypes(filter, options);
  res.status(httpStatus.OK).json(serviceTypes);
};

const getServiceTypeById = async (req, res) => {
  const { id } = req.params;
  const serviceType = await serviceTypeService.getServiceTypeById(id);
  res.status(httpStatus.OK).json(serviceType);
};

const createServiceType = async (req, res) => {
  const { name, rateType, rate, icon, description, active } = req.body;
  const serviceType = await serviceTypeService.createServiceType({ name, rateType, rate, icon, description, active });
  res.status(httpStatus.CREATED).json(serviceType);
};

const updateServiceTypeById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const serviceType = await serviceTypeService.updateServiceTypeById(id, updateBody);
  res.status(httpStatus.OK).json(serviceType);
};

const deleteServiceTypeById = async (req, res) => {
  const { id } = req.params;
  await serviceTypeService.deleteServiceTypeById(id);
  res.status(httpStatus.NO_CONTENT).json();
};

module.exports = {
  getAllServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceTypeById,
  deleteServiceTypeById,
};
