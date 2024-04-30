const User = require('../Models/User');
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  const userData = req.body;
  console.log('받은 데이터:', userData);

  const {name, id, password } = userData;

  try {

    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(409).json({ success: false, message: '이미 가입된 계정입니다.' });
    }
    const hashedPassword = await bcrypt.hash( password, 10);

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
