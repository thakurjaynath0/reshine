const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { clothController } = require('../../../controllers/admin');
const { clothValidation } = require('../../../validations/admin');

router
  .route('/')
  .get([auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(clothValidation.getAllClothes)], clothController.getAllClothes)
  .post([auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(clothValidation.createCloth)], clothController.createCloth);

router
  .route('/:id')
  .get([auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(clothValidation.validateParam)], clothController.getClothById)
  .patch(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(clothValidation.updateClothById)],
    clothController.updateClothById
  )
  .delete(
    [auth(userTypes.ADMIN, userTypes.SUPERUSER), validate(clothValidation.validateParam)],
    clothController.deleteClothById
  );

module.exports = router;
