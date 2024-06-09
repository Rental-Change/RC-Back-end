//listViewRouter.js
const express = require('express');
const router = express.Router();
const listViewController = require('../controller/listViewController')

// 메인 페이지 모든 post 보여주기 
router.get('/', listViewController.all_List);
// 내가 쓴 게시물 
router.get('/:userID/mylist', listViewController.my_List);
// 좋아요한 게시물
router.get('/:userID/bookmarklist', listViewController.bookMark_List);
// 거래 중인 게시물
router.get('/:userID/statuslist', listViewController.status_List);
module.exports = router;