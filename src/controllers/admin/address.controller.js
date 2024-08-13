const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { addressService } = require('../../services');

const getAllAddresses = async (req, res) => {
  const filter = pick(req.query, ['country', 'state', 'city', 'address', 'pincode', 'deliveryCharge', 'active']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const addresses = await addressService.getAllAddresses(filter, options);
  res.status(httpStatus.OK).json(addresses);
};

const getAddressById = async (req, res) => {
  const { id } = req.params;
  const address = await addressService.getAddressById(id);
  res.status(httpStatus.OK).json(address);
};

const createAddress = async (req, res) => {
  const { state, city, address, landmark, pincode, deliveryCharge, active } = req.body;
  const newAddress = await addressService.createAddress({ state, city, address, landmark, pincode, deliveryCharge, active });
  res.status(httpStatus.CREATED).json(newAddress);
};

const updateAddressById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const address = await addressService.updateAddressById(id, updateBody);
  res.status(httpStatus.OK).json(address);
};

const deleteAddressById = async (req, res) => {
  const { id } = req.params;
  await addressService.deleteAddressById(id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddressById,
  deleteAddressById,
};
