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

module.exports = {
  getAllAnnouncements,
  getAnnouncementById,
};
