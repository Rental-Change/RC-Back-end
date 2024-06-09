//chatRouter.js
const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController')

//채팅 내역 가져오기
router.post('/messages/:roomId', chatController.getChat);


module.exports = router;