const multer = require('multer');
const { v6: uuidV6 } = require('uuid');
const Errors = require('../errors');
const setting = require('../config/setting');

const MB = 1048576;
const allowedFiles = {
  image: '*',
};

const checkFile = (mimetype) => {
  const [category, fileType] = mimetype.split('/');

  if (!allowedFiles[category]) {
    throw new Error('Unsupported file type .');
  }

  if (!(allowedFiles[category] === '*') && !allowedFiles[category].includes(fileType)) {
    throw new Error('Unsupported file type .');
  }

  return true;
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, setting.UPLOAD_DEST);
  },
  filename(req, file, cb) {
    const extension = file.originalname.split('.').at(-1);
    cb(null, `${uuidV6()}.${extension}`);
  },
});

const fileFilter = function (req, file, cb) {
  try {
    checkFile(file.mimetype);
    cb(null, true);
  } catch (err) {
    cb(new Errors.BadRequestError(err.message), false);
  }
};

const limits = {
  filenameSize: 50,
  fileldSize: 2 * MB,
  files: 10,
  fileSize: 2 * MB,
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
