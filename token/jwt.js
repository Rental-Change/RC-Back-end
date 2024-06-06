const jwt = require('jsonwebtoken');
const secretKey = 'asdfghj1233334';

// 액세스 토큰 생성 함수
function generateAccessToken(user) {
  return jwt.sign(user, secretKey, { expiresIn: 30 });
}

// 리프레시 토큰 생성 함수
function generateRefreshToken(user) {
  return jwt.sign(user,secretKey);
}



module.exports = { generateAccessToken, generateRefreshToken};