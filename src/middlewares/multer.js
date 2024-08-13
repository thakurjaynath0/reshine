const { BadRequestError } = require('../errors');

const defaultUpload = require('../services/multer.service').single('file');

module.exports =
  (upload = defaultUpload) =>
  async (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        next(new BadRequestError(err.message));
      }
      next();
    });
  };
