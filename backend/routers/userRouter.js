const userController = require('../controller/userController');
const { Router } = require('express');

const router = Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
