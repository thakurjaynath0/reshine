const Error = require('../errors');
const location = require('../data');
const { Address } = require('../models');

const queryAddresses = async (filter, options) => {
  const result = await Address.paginate(filter, options);
  return result;
};

const getAllAddresses = async (filter, options) => {
  const addresses = await queryAddresses(filter, options);
  return addresses;
};

const getAddressById = async (addressId, { query } = {}) => {
  const address = await Address.findOne({ _id: addressId, ...query });

  if (!address) {
    throw new Error.NotFoundError('address_not_found.');
  }

  return address;
};

const createAddress = async ({ state, city, address, landmark, pincode, deliveryCharge, active }) => {
  if (!location.states.includes(state)) {
    throw new Error.BadRequestError('invalid_state.');
  }

  if (!location.cities(state).includes(city)) {
    throw new Error.BadRequestError('invalid_city.');
  }

  const newAddress = await Address.create({ state, city, address, landmark, pincode, deliveryCharge, active });
  return newAddress;
};

const updateAddressById = async (addressId, updateBody, { query } = {}) => {
  const address = await getAddressById(addressId, { query });
  const state = updateBody?.state ? updateBody.state : address.state;
  const city = updateBody?.city ? updateBody.city : address.city;

  if (!location.states.includes(state)) {
    throw new Error.BadRequestError('invalid_state.');
  }

  if (!location.cities(state).includes(city)) {
    throw new Error.BadRequestError('invalid_city.');
  }

  Object.assign(address, updateBody);
  address.save();
  return address;
};

const deleteAddressById = async (addressId, { query } = {}) => {
  const address = await getAddressById(addressId, { query });
  address.remove();
  return address;
};

module.exports = {
  getAllAddresses,
  getAddressById,
  createAddress,
  updateAddressById,
  deleteAddressById,
};
