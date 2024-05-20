//listViewRouter.js

const express = require('express');
const router = express.Router();
const listViewController = require('../controller/listViewController')
const path = require('path');

router.use('/images', express.static(path.join(__dirname, '../images')));
// 메인 페이지 모든 post 보여주기 
router.get('/', listViewController.all_List);
// 내가 쓴 게시물 
router.get('/list', listViewController.my_List);
// 좋아요한 게시물
router.get('/list', listViewController.like_List);

module.exports = router;