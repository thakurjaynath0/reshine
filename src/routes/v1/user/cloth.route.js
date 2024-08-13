const router = require('express').Router();

const validate = require('../../../middlewares/validate');
const auth = require('../../../middlewares/auth');
const { userTypes } = require('../../../config/enums/userType.enum');
const { clothController } = require('../../../controllers/user');
const { clothValidation } = require('../../../validations/user');

router.route('/').get([auth(userTypes.USER), validate(clothValidation.getAllClothes)], clothController.getAllClothes);
router.route('/:id').get([auth(userTypes.USER), validate(clothValidation.validateParam)], clothController.getClothById);

module.exports = router;
