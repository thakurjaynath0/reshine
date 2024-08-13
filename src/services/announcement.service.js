const Error = require('../errors');
const { Announcement } = require('../models');

const queryAnnouncements = async (filter, options) => {
  const result = await Announcement.paginate(filter, options);
  return result;
};

const getAllAnnouncements = async (filter, options) => {
  const announcements = await queryAnnouncements(filter, options);
  return announcements;
};

const getAnnouncementById = async (announcementId) => {
  const announcement = await Announcement.findOne({ _id: announcementId });

  if (!announcement) {
    throw new Error.NotFoundError('announcement_not_found');
  }

  return announcement;
};

const createAnnouncement = async ({ title, description, expiry }) => {
  if (expiry < Date.now()) {
    throw new Error.BadRequestError('expiry_cannot_be_less_than_today');
  }

  const announcement = await Announcement.create({ title, description, expiry });
  return announcement;
};

const updateAnnouncementById = async (announcementId, updateBody) => {
  const announcement = await getAnnouncementById(announcementId);
  Object.assign(announcement, updateBody);
  announcement.save();
  return announcement;
};

const deleteAnnouncementById = async (announcementId) => {
  const announcement = await getAnnouncementById(announcementId);
  announcement.remove();
  return announcement;
};

module.exports = {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncementById,
  deleteAnnouncementById,
};
