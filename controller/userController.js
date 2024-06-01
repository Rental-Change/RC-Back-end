const User = require('../Models/User');
const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken'); // jwt 토큰 사용을 위해 모듈 불러오기
const { generateToken } = require('../token/jwt');


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

exports.loginUser = async (req, res) => {
  try {
    const userData = req.body;
    const { id, password } = userData;
    const user = await User.findOne({ user_ID: id });

    if (!user) {
      return res.status(404).json({ success: false, message: '사용자가 존재하지 않습니다.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.user_PW);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
    }

    // 액세스 토큰 생성
    const accessTokenPayload = {
      userId: user.userId,
      isAdmin: user.isAdmin,
    };
    const accessToken = generateToken(accessTokenPayload, '1h'); // 1시간 유효한 액세스 토큰 생성

    // 리프레시 토큰 생성 및 쿠키에 저장
    const refreshTokenPayload = {
      userId: user.userId,
    };
    const refreshToken = generateToken(refreshTokenPayload, '7d'); // 7일 유효한 리프레시 토큰 생성
    
    return res
      .status(200)
      .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 604800000 }) // 7일(604800000 밀리초)
      .json({ message: '성공적으로 로그인 되었습니다.', userID: id, accessToken });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: '로그인 중 에러가 발생했습니다.' });
  }
};

exports.checkUser = async(sid)=>{
  const user = await User.findOne({token:sid})
  if(!user) throw new Error("user not found")
  return user;
}