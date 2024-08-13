const httpStatus = require('http-status');
const pick = require('../../utils/pick');
const { announcementService } = require('../../services');

const getAllAnnouncements = async (req, res) => {
  const filter = pick(req.query, ['title', 'expiry']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const announcements = await announcementService.getAllAnnouncements(filter, options);
  res.status(httpStatus.OK).json(announcements);
};

const getAnnouncementById = async (req, res) => {
  const { id } = req.params;
  const announcement = await announcementService.getAnnouncementById(id);
  res.status(httpStatus.OK).json(announcement);
};

const createAnnouncement = async (req, res) => {
  const { title, description, expiry } = req.body;
  const announcement = await announcementService.createAnnouncement({ title, description, expiry });
  res.status(httpStatus.CREATED).json(announcement);
};

const updateAnnouncementById = async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const announcement = await announcementService.updateAnnouncementById(id, updateBody);
  res.status(httpStatus.OK).json(announcement);
};

const deleteAnnouncementById = async (req, res) => {
  const { id } = req.params;
  await announcementService.deleteAnnouncementById(id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncementById,
  deleteAnnouncementById,
};
