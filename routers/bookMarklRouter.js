const express = require('express');
const router = express.Router();
const bookMarklController = require('../controller/bookMarklController');


// 좋아요 추가 기능 앤드포인트
router.post('/:userID/bookmark',bookMarklController.addBookMark);
// 좋아요 삭제 기능 앤드포인트
router.post('/:userID/bookmark',bookMarklController.deleteBookMark);


module.exports = router;