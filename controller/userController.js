const User = require('../Models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// JWT 생성을 위한 비밀키 생성
const secretKey = crypto.randomBytes(32).toString('hex');

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
      return res.status(404).json({ success: false, message: '사용자가 존재하지 않습니다.' });
    }

    // 비밀번호 유효성 검사
    const isPasswordValid = await bcrypt.compare(password, user.user_PW);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: '비밀번호가 올바르지 않습니다.' });
    }

    // JWT 생성
    const token = jwt.sign({userId: user._id}, secretKey, { expiresIn: '1h'});

    // userID & JWT 전송
    res.status(200).json({userID: id, token });

  } catch (error) {
    res.status(500).json({ success: false, message: '로그인 중 에러가 발생했습니다.' });
  }
};