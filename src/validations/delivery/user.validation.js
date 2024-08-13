const JOI = require('joi');
const { objectId } = require('../custom.validation');

const getUser = {
  params: JOI.object().keys({
    userId: JOI.string().custom(objectId),
  }),
};

module.exports = {
  getUser,
};
