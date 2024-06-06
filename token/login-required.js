const jwt = require('jsonwebtoken');
const secretKey = 'asdfghj1233334';

function loginRequired(req, res, next) {
    try {
        // 요청 헤더에서 액세스 토큰 가져오기
        const accessToken = req.headers.authorization.split(" ")[1];
        // AccessToken 디코딩하여 유효성 검사
        jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    // 만료된 토큰인 경우
                    res.status(401).json({ success: false, message: '토큰이 만료되었습니다.' });
                } else {
                    // 그 외의 오류인 경우
                    console.error('Error verifying token:', err);
                    res.status(500).json({ success: false, message: '서버 오류 발생' });
                }
            } else {
                res.status(200).json({ success: true, message: "토큰 유효"})
                // 액세스 토큰이 유효한 경우
                next(); // 다음 미들웨어로 넘어감
            }
        });
    
    } catch (error) {
        console.error('Protected endpoint error:', error);
        res.status(500).json({ success: false, message: '서버 오류 발생' });
    }
}

module.exports = loginRequired;
