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

module.exports = {
  getAllClothes,
  getClothById,
};
