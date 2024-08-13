const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { clothService } = require('../../services');

const getAllClothes = async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const clothes = await clothService.getAllClothes(filter, options);
  res.status(httpStatus.OK).json(clothes);
};

const getClothById = async (req, res) => {
  const { id } = req.params;
  const cloth = await clothService.getClothById(id);
  res.status(httpStatus.OK).json(cloth);
};

const createCloth = async (req, res) => {
  const { name, description, icon, photo } = req.body;
  const cloth = await clothService.createCloth({ name, description, icon, photo });
  res.status(httpStatus.CREATED).json(cloth);
};

const updateClothById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const cloth = await clothService.updateClothById(id, updateBody);
  res.status(httpStatus.OK).json(cloth);
};

const deleteClothById = async (req, res) => {
  const { id } = req.params;
  await clothService.deleteClothById(id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllClothes,
  getClothById,
  createCloth,
  updateClothById,
  deleteClothById,
};
