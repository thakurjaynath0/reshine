const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { laundaryServiceService } = require('../../services');

const getAllLaundaryServices = async (req, res) => {
  const filter = pick(req.query, ['name']);
  filter.active = true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const laundaryServices = await laundaryServiceService.getAllLaundaryServices(filter, options);
  res.status(httpStatus.OK).json(laundaryServices);
};

const getLaundaryServiceById = async (req, res) => {
  const { id } = req.params;
  const laundaryService = await laundaryServiceService.getLaundaryServiceById(id, {
    query: {
      active: true,
    },
  });
  res.status(httpStatus.OK).json(laundaryService);
};

module.exports = {
  getAllLaundaryServices,
  getLaundaryServiceById,
};
