const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const loginRequired = require('../token/login-required')

// 로그인 엔드포인트
router.post('/', userController.loginUser);


// 보호된 라우트
router.get('/protected-route', loginRequired, (req, res) => {
  res.send(`Hello, user ${req.currentUserId}`);
});

module.exports = router;