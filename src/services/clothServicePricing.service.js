const Error = require('../errors');
const clothService = require('./cloth.service');
const laundaryServiceService = require('./laundaryService.service');
const { ClothServicePricing } = require('../models');

const queryClothServicePricings = async (filter, options) => {
  const result = await ClothServicePricing.paginate(filter, options);
  return result;
};

const getAllClothServicePricings = async (filter, options) => {
  const clothServicePricings = await queryClothServicePricings(filter, options);
  return clothServicePricings;
};

const getClothServicePricingById = async (clothServicePricingId, { query, options } = {}) => {
  let clothServicePricing = ClothServicePricing.findOne({ _id: clothServicePricingId, ...query });

  if (options?.cloth) clothServicePricing.populate('clothInfo');
  if (options?.service) clothServicePricing.populate('serviceInfo');

  clothServicePricing = await clothServicePricing;

  if (!clothServicePricing) {
    throw new Error.NotFoundError('cloth_service_pricing_not_found.');
  }

  return clothServicePricing;
};

const createClothServicePricing = async ({ cloth, service, price, active }) => {
  await clothService.getClothById(cloth);
  await laundaryServiceService.getLaundaryServiceById(service);
  const clothServicePricing = await ClothServicePricing.create({ cloth, service, price, active });
  return clothServicePricing;
};

const updateClothServicePricingById = async (clothServicePricingId, updateBody, { query, options } = {}) => {
  const clothServicePricing = await getClothServicePricingById(clothServicePricingId, { query, options });
  Object.assign(clothServicePricing, updateBody);
  await clothServicePricing.save();
  return clothServicePricing;
};

const deleteClothServicePricingById = async (clothServicePricingId, { query, options } = {}) => {
  const clothServicePricing = await getClothServicePricingById(clothServicePricingId, { query, options });
  await clothServicePricing.remove();
  return clothServicePricing;
};

module.exports = {
  getAllClothServicePricings,
  getClothServicePricingById,
  createClothServicePricing,
  updateClothServicePricingById,
  deleteClothServicePricingById,
};
