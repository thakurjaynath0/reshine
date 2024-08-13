const { ServiceType } = require('../models');
const Error = require('../errors');

const queryServiceTypes = async (filter, options) => {
  const result = await ServiceType.paginate(filter, options);
  return result;
};

const getAllServiceTypes = async (filter, options) => {
  const serviceTypes = await queryServiceTypes(filter, options);
  return serviceTypes;
};

const getServiceTypeById = async (serviceTypeId, { query } = {}) => {
  const serviceType = await ServiceType.findOne({ _id: serviceTypeId, ...query });

  if (!serviceType) {
    throw new Error.NotFoundError('serviceType_not_found.');
  }

  return serviceType;
};

const createServiceType = async ({ name, rateType, rate, icon, description, active }) => {
  const serviceType = await ServiceType.create({ name, rateType, rate, icon, description, active });
  return serviceType;
};

const updateServiceTypeById = async (serviceTypeId, updateBody, { query } = {}) => {
  const serviceType = await getServiceTypeById(serviceTypeId, { query });
  Object.assign(serviceType, updateBody);
  await serviceType.save();
  return serviceType;
};

const deleteServiceTypeById = async (serviceTypeId, { query } = {}) => {
  const serviceType = await getServiceTypeById(serviceTypeId, { query });
  await serviceType.remove();
  return serviceType;
};

module.exports = {
  getAllServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceTypeById,
  deleteServiceTypeById,
};
