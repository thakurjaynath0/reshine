const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { serviceTypeService } = require('../../services');

const getAllServiceTypes = async (req, res) => {
  const filter = pick(req.query, ['name', 'rateType', 'rate']);
  filter.active = true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const serviceTypes = await serviceTypeService.getAllServiceTypes(filter, options);
  res.status(httpStatus.OK).json(serviceTypes);
};

const getServiceTypeById = async (req, res) => {
  const { id } = req.params;
  const serviceType = await serviceTypeService.getServiceTypeById(id, {
    query: {
      active: true,
    },
  });
  res.status(httpStatus.OK).json(serviceType);
};

module.exports = {
  getAllServiceTypes,
  getServiceTypeById,
};
