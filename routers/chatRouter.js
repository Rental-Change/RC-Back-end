//chatRouter.js

const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController')

// router.post('/chat', chatController.createChat);
router.post('/messages/:roomId', chatController.getChat);
module.exports = router;