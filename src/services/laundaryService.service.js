const Error = require('../errors');
const { LaundaryService } = require('../models');

const queryLaundaryServices = async (filter, options) => {
  const result = await LaundaryService.paginate(filter, options);
  return result;
};

const getAllLaundaryServices = async (filter, options) => {
  const laundaryServices = await queryLaundaryServices(filter, options);
  return laundaryServices;
};

const getLaundaryServiceById = async (laundaryServiceId, { query } = {}) => {
  const laundaryService = await LaundaryService.findOne({ _id: laundaryServiceId, ...query });

  if (!laundaryService) {
    throw new Error.NotFoundError('service_not_found.');
  }

  return laundaryService;
};

const createLaundaryService = async ({ name, icon, description, active }) => {
  const laundaryService = await LaundaryService.create({ name, icon, description, active });
  return laundaryService;
};

const updateLaundaryServiceById = async (laundaryServiceId, updateBody, { query } = {}) => {
  const laundaryService = await getLaundaryServiceById(laundaryServiceId, { query });
  Object.assign(laundaryService, updateBody);
  await laundaryService.save();
  return laundaryService;
};

const deleteLaundaryServiceById = async (laundaryServiceId, { query } = {}) => {
  const laundaryService = await getLaundaryServiceById(laundaryServiceId, { query });
  await laundaryService.remove();
  return laundaryService;
};

module.exports = {
  getAllLaundaryServices,
  getLaundaryServiceById,
  createLaundaryService,
  updateLaundaryServiceById,
  deleteLaundaryServiceById,
};
