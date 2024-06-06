const jwt = require('jsonwebtoken'); // jwt 모듈 불러오기

const refreshJwtMiddleware = (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });

}

// 미들웨어 함수 내보내기
module.exports = refreshJwtMiddleware;