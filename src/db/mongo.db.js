const mongoose = require('mongoose');
const config = require('../config/config');

const connectDb = async (connectionUrl = config.mongoose.url, connectionOptions = config.mongoose.options) => {
  const connection = await mongoose.connect(connectionUrl, connectionOptions);
  return connection;
};

module.exports = {
  connectDb,
};
