//chatRouter.js

const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController')

router.get('/chat', chatController.createChat);

module.exports = router;