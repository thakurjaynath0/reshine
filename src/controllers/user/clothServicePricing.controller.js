const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { clothServicePricingService } = require('../../services');

const getAllClothServicePricings = async (req, res) => {
  const filter = pick(req.query, ['cloth', 'service', 'price']);
  filter.active = true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'clothInfo, serviceInfo';
  const clothServicePricings = await clothServicePricingService.getAllClothServicePricings(filter, options);
  res.status(httpStatus.OK).json(clothServicePricings);
};

const getClothServicePricingById = async (req, res) => {
  const { id } = req.params;
  const clothServicePricing = await clothServicePricingService.getClothServicePricingById(id, {
    query: {
      active: true,
    },
    options: {
      cloth: true,
      service: true,
    },
  });
  res.status(httpStatus.OK).json(clothServicePricing);
};

module.exports = {
  getAllClothServicePricings,
  getClothServicePricingById,
};
