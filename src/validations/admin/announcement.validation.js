const JOI = require('joi');
const { objectId } = require('../custom.validation');

const validateParam = {
  params: JOI.object().keys({
    id: JOI.string().required().custom(objectId),
  }),
};

const getAllAnnouncement = {
  query: JOI.object().keys({
    title: JOI.string(),
    expiry: JOI.date(),
    sortBy: JOI.string(),
    limit: JOI.number().integer(),
    page: JOI.number().integer(),
  }),
};

const createAnnouncement = {
  body: JOI.object().keys({
    title: JOI.string().required().min(5).max(100),
    description: JOI.string().required().min(15).max(1000),
    expiry: JOI.date().required(),
  }),
};

const updateAnnouncementById = {
  params: validateParam.params,
  body: JOI.object().keys({
    title: JOI.string().min(5).max(100),
    description: JOI.string().min(15).max(1000),
    expiry: JOI.date(),
  }),
};

module.exports = {
  validateParam,
  getAllAnnouncement,
  createAnnouncement,
  updateAnnouncementById,
};
