//roomRouter.js

const express = require('express');
const router = express.Router();
const roomController = require('../controller/roomController')

router.post('/createroom', roomController.createRoom);
router.get('/leaveroom/:userID', roomController.leaveRoom);
router.get('/getlistroom/:userID', roomController.getAllRooms);


module.exports = router;