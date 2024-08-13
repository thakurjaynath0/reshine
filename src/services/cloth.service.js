const Error = require('../errors');
const { Cloth } = require('../models');

const queryClothes = async (filter, options) => {
  const result = await Cloth.paginate(filter, options);
  return result;
};

const getAllClothes = async (filter, options) => {
  const clothes = await queryClothes(filter, options);
  return clothes;
};

const getClothById = async (clothId) => {
  const cloth = await Cloth.findOne({ _id: clothId });

  if (!cloth) {
    throw new Error.NotFoundError('cloth_not_found');
  }

  return cloth;
};

const createCloth = async ({ name, description, icon, photo }) => {
  const cloth = await Cloth.create({ name, description, icon, photo });
  return cloth;
};

const updateClothById = async (clothId, updateBody) => {
  const cloth = await getClothById(clothId);
  Object.assign(cloth, updateBody);
  await cloth.save();
  return cloth;
};

const deleteClothById = async (clothId) => {
  const cloth = await getClothById(clothId);
  await cloth.remove();
  return cloth;
};

module.exports = {
  getAllClothes,
  getClothById,
  createCloth,
  updateClothById,
  deleteClothById,
};
