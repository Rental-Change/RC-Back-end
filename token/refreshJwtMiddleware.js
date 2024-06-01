const refreshJwtMiddleware = (req, res, next) => {
  const jwt = require('./jwt'); // jwt.js 파일을 불러옵니다.
  const token = req.cookies.refreshToken; // 쿠키에서 refreshToken 가져오기

  if (token) {
    const newToken = jwt.refreshToken(token);
    if (newToken) {
      res.cookie('refreshToken', newToken, { httpOnly: true, maxAge: 604800000 }); // 새 토큰으로 쿠키 업데이트
    }
  }

  next();
};

module.exports = { refreshJwtMiddleware };