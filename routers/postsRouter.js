//postsRouter.js
const express = require('express');
const router = express.Router();
const postsController = require('../controller/postController');
const upload = require('../utils/upload')

// 게시물 등록 앤드포인트
router.post('/posts', upload.single('postImage'), postsController.createPost );

// 게시물 상세 페이지 접근 앤드포인트
router.post('/posts/:userID', postsController.post_View);

// 게시물 수정페이지 접근 앤드포인트
// router.get('/editpost/:userID', postsController.getEdit );

// 게시물 수정 앤드포인트
router.post('/editpost/:productId', upload.single('postImage'),postsController.editPost);

// 게시물 삭제 앤드포인트
router.post('/deletepost/:productId', postsController.deletePost);


module.exports = router;