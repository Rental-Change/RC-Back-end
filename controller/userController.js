const User = require('../Models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken'); // jwt 토큰 사용을 위해 모듈 불러오기
const { generateAccessToken, generateRefreshToken } = require('../token/jwt');


exports.createUser = async (req, res) => {
  const userData = req.body;
  console.log('받은 데이터:', userData);

  const {name, id, password } = userData;

  try {
    const existingUser = await User.findOne({ user_ID: id });
    const hashedPassword = await bcrypt.hash( password, 10);
    if (existingUser) {
      return res.status(409).json({ success: false, message: '이미 가입된 계정입니다.' });
    }

    const newUser = new User({
      user_Name: name,
      user_ID: id,
      user_PW: hashedPassword
    });

    const savedUser = await newUser.save();


    console.log('사용자가 MongoDB에 추가되었습니다:', savedUser);
    res.status(201).json({ message: '데이터가 성공적으로 전송되었습니다.', receivedData: savedUser });
  } catch (error) {
    console.error('사용자 추가 실패:', error);
    res.status(500).json({ error: '데이터를 저장하는 데 문제가 발생했습니다.' });
  }
};
//로그인
exports.loginUser = async (req, res) => {
  try {
    const userData = req.body;

    const { id, password } = userData;
    
    const user = await User.findOne({ user_ID: id });
    
    // 회원 정보 유효성 검사
    if (!user) {
      return res.status(401).json({ success: false, message: '사용자가 존재하지 않습니다.' });
    }

    // 비밀번호 유효성 검사
    const isPasswordValid = await bcrypt.compare(password, user.user_PW);
    if (!isPasswordValid) {
      return res.status(402).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
    }
    
    // 사용자 정보에서 필요한 페이로드 추출
    const payload = {
      userId: user.id,
    };

    // 액세스 토큰 생성
    const accessToken = generateAccessToken(payload);

    // 리프레시 토큰 생성
    const refreshToken = generateRefreshToken(payload);

    // 생성된 토큰들을 클라이언트에 응답으로 보냅니다.
    res.cookie('refreshToken', refreshToken, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
        })
        .header('Authorization', accessToken)
        .json({ message: '로그인 성공', userID: id, accessToken: accessToken});

    } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: '로그인 중 오류가 발생했습니다.' });
    }
};

exports.logoutUser = async (req, res) => {
  // refresh 토큰이 저장된 쿠키를 삭제합니다.
  res.clearCookie('refreshToken', {
    path: '/', // 쿠키의 경로를 루트('/')로 설정
    domain: '.localhost' // 쿠키의 도메인을 설정
  });
  // 그 외의 로그아웃 관련 작업을 수행할 수 있습니다.
  res.send('로그아웃 되었습니다.');
}