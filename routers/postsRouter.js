//postsRouter.js
const express = require('express');
const router = express.Router();
const postsController = require('../controller/postController');
const upload = require('../utils/upload')

// // 게시물 접근
// router.get('/posts/', postsController.getPost);
// 게시물 수정페이지 접근 앤드포인트
router.get('/:userID', postsController.getEdit );
// 게시물 등록 앤드포인트
router.post('/', upload.single('postImage'), postsController.createPost );
// 게시물 수정 앤드포인트
// router.post('/:userID', postsController.editPost);
// // 게시물 삭제 앤드포인트
// router.post('/:userID', postsController.deletePost);
// // 게시물 상세 페이지 접근 앤드포인트
// router.post('/:id', postsController.post_View);


module.exports = router;