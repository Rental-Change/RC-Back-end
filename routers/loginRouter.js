//loginRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const loginRequired = require('../token/login-required');
const refreshJwtMiddleware = require('../token/refreshJwtMiddleware');

// 로그인 엔드포인트
router.post('/', userController.loginUser);
// 로그아웃 앤드포인트
router.get('/logout', userController.logoutUser);

// 보호된 라우트
router.get('/protected-route', loginRequired);

router.get('/token', refreshJwtMiddleware);

module.exports = router;