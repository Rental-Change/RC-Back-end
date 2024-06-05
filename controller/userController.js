const User = require('../Models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken'); // jwt 토큰 사용을 위해 모듈 불러오기
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

    // 유저 id, 관리자 여부 객체로 토큰 페이로드 정보 생성
    const payload = {
      userId: user.userId,
      isAdmin: user.isAdmin,
      };
    // jwt.js에서 작성된 토큰 생성 코드 실행
    const token = generateToken(payload);
    // userID & JWT 전송
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    return res.json({ success: true, message: '성공적으로 로그인 되었습니다.', userID: id, token });
    

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