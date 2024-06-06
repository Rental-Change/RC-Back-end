// login-required.js
function loginRequired(req, res, next) {
    try {
        // 요청 헤더에서 액세스 토큰 가져오기
        const accessToken = req.headers.authorization.split(" ")[1];
        console.log(accessToken)
    
         // 액세스 토큰 유효성 검사
         if (!accessToken) {
          return res.status(401).json({ success: false, message: '유효하지 않은 토큰입니다.' });
         }
    
        // 액세스 토큰이 유효하면 보호된 데이터를 반환
        res.json({ success: true, data: 'This is protected data' });
    
      } catch (error) {
        console.error('Protected endpoint error:', error);
      }
}

module.exports = loginRequired;