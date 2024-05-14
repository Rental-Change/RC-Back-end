const express = require('express');
const router = express.Router();
const listViewController = require('../controller/listViewController')
// 메인 페이지 모든 post 보여주기 
router.post('/', listViewController.all_List);
// 내가 쓴 게시물 
router.post('/my-page', listViewController.my_List);
// 좋아요한 게시물
router.post('/my-page', listViewController.like_List);

module.exports = router;