const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/signin', userController.loginUser);

module.exports = router;