const jwt = require('jsonwebtoken'); // jwt 모듈 불러오기
const secretKey = 'asdfghj1233334';
const { generateAccessToken }= require('./jwt');

const refreshJwtMiddleware = (req, res, next) => {
  const refreshToken = req.cookies.refreshToken; // 리프레시 토큰 가져오기
  
  if (!refreshToken) return res.sendStatus(401); // 리프레시 토큰이 없으면 401 Unauthorized 반환

  jwt.verify(refreshToken, secretKey, (err, decoded) => {
    if (err) return res.sendStatus(403); // 리프레시 토큰이 유효하지 않으면 403 Forbidden 반환
    
    // 리프레시 토큰이 유효하면 새로운 액세스 토큰 생성
    const accessToken = generateAccessToken({ userId: decoded.userId });
    
    // 새로운 액세스 토큰을 클라이언트에게 전달
    res.json({ accessToken: accessToken });
  });
}

// 미들웨어 함수 내보내기
module.exports = refreshJwtMiddleware;