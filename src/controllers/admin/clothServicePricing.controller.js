const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { clothServicePricingService } = require('../../services');

const getAllClothServicePricings = async (req, res) => {
  const filter = pick(req.query, ['cloth', 'service', 'price', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.populate = 'clothInfo, serviceInfo';
  const clothServicePricings = await clothServicePricingService.getAllClothServicePricings(filter, options);
  res.status(httpStatus.OK).json(clothServicePricings);
};

const getClothServicePricingById = async (req, res) => {
  const { id } = req.params;
  const clothServicePricing = await clothServicePricingService.getClothServicePricingById(id, {
    options: {
      cloth: true,
      service: true,
    },
  });
  res.status(httpStatus.OK).json(clothServicePricing);
};

const createClothServicePricing = async (req, res) => {
  const { cloth, service, price, active } = req.body;
  const clothServicePricing = await clothServicePricingService.createClothServicePricing({
    cloth,
    service,
    price,
    active,
  });
  res.status(httpStatus.CREATED).json(clothServicePricing);
};

const updateClothServicePricingById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const clothServicePricing = await clothServicePricingService.updateClothServicePricingById(id, updateBody);
  res.status(httpStatus.OK).json(clothServicePricing);
};

const deleteClothServicePricingById = async (req, res) => {
  const { id } = req.params;
  await clothServicePricingService.deleteClothServicePricingById(id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllClothServicePricings,
  getClothServicePricingById,
  createClothServicePricing,
  updateClothServicePricingById,
  deleteClothServicePricingById,
};
