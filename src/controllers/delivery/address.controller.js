const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { addressService } = require('../../services');

const getAllAddresses = async (req, res) => {
  const filter = pick(req.query, ['state', 'city', 'address', 'pincode']);
  filter.active = true;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const addresses = await addressService.getAllAddresses(filter, options);
  res.status(httpStatus.OK).json(addresses);
};

const getAddressById = async (req, res) => {
  const { id } = req.params;
  const address = await addressService.getAddressById(id, {
    query: {
      active: true,
    },
  });
  res.status(httpStatus.OK).json(address);
};

module.exports = {
  getAllAddresses,
  getAddressById,
};
