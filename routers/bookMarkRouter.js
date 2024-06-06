const express = require('express');
const router = express.Router();
const bookMarkController = require('../controller/bookMarkController');


// 좋아요 추가 기능 앤드포인트
router.post('/:userID/bookmark',bookMarkController.addBookMark);
// 좋아요 삭제 기능 앤드포인트
router.post('/:userID/bookmark',bookMarkController.deleteBookMark);


module.exports = router;