const router = require('express').Router();

const auth = require('../../../middlewares/auth');
const validate = require('../../../middlewares/validate');
const { userTypes } = require('../../../config/enums/userType.enum');
const { userValidation } = require('../../../validations/delivery');
const { userController } = require('../../../controllers/delivery');

router.route('/:userId').get([auth(userTypes.DELIVERY), validate(userValidation.getUser)], userController.getUser);

module.exports = router;
