const express = require('express');
const router = express.Router();


// 사용자 관련 라우트들을 여기에 추가합니다.
router.post('/signup', (req, res) => {
  // 회원가입 로직
});

router.post('/login', (req, res) => {
  // 로그인 로직
});

module.exports = router;