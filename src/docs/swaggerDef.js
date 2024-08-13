const { version, description, license } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: description,
    version,
    license: {
      name: license,
      url: 'https://github.com/N-ikhil-thakur/reshine-backend/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: `${config.server.ssl ? 'https' : 'http'}://${config.server.domain}/v1`,
    },
  ],
};

module.exports = swaggerDef;
