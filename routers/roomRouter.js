//roomRouter.js

const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController')

//채팅방 생성
router.post('/createroom', roomController.createRoom);
//채팅방 삭제
router.post('/leaveroom/:userID', roomController.leaveRoom);
//채팅방 불러오기
router.get('/getlistroom/:userID', roomController.getAllRooms);


module.exports = router;