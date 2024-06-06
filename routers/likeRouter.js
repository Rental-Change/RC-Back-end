const express = require('express');
const router = express.Router();
const likeController = require('../controller/likeController');


// 좋아요 추가 기능 앤드포인트
router.post('/',likeController.addlikePost);
// 좋아요 삭제 기능 앤드포인트
router.post('/delete',likeController.deleteLikePost);


module.exports = router;