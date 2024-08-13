const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { laundaryServiceService } = require('../../services');

const getAllLaundaryServices = async (req, res) => {
  const filter = pick(req.query, ['name', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const laundaryServices = await laundaryServiceService.getAllLaundaryServices(filter, options);
  res.status(httpStatus.OK).json(laundaryServices);
};

const getLaundaryServiceById = async (req, res) => {
  const { id } = req.params;
  const laundaryService = await laundaryServiceService.getLaundaryServiceById(id);
  res.status(httpStatus.OK).json(laundaryService);
};

const createLaundaryService = async (req, res) => {
  const { name, icon, description, active } = req.body;
  const laundaryService = await laundaryServiceService.createLaundaryService({ name, icon, description, active });
  res.status(httpStatus.CREATED).json(laundaryService);
};

const updateLaundaryServiceById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const laundaryService = await laundaryServiceService.updateLaundaryServiceById(id, updateBody);
  res.status(httpStatus.OK).json(laundaryService);
};

const deleteLaundaryServiceById = async (req, res) => {
  const { id } = req.params;
  await laundaryServiceService.deleteLaundaryServiceById(id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllLaundaryServices,
  getLaundaryServiceById,
  createLaundaryService,
  updateLaundaryServiceById,
  deleteLaundaryServiceById,
};
