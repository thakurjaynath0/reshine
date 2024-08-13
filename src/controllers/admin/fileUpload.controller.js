const httpStatus = require('http-status');
const Errors = require('../../errors');
const setting = require('../../config/setting');

const fileUpload = async (req, res) => {
  if (!(req.file || req.files)) {
    throw new Errors.BadRequestError('No file uploaded');
  }
  let files = [];
  if (req.files) {
    files = [...req.files];
  }
  if (req.file) {
    files.push(req.file);
  }

  files = files.map((file) => `/${setting.UPLOAD_PATH}/${file.filename}`);
  res.status(httpStatus.OK).json(files);
};

module.exports = {
  fileUpload,
};
