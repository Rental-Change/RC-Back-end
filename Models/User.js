const mongoose = require('mongoose');
const { Schema } = mongoose;

// 유저 정보를 담을 스키마 정의
const userSchema = new mongoose.Schema({
  user_Name: {
    type: String,
    required: true,
    unique: true
  },
  user_ID: {
    type: String,
    required: true,
    unique: true
  },
  user_PW: {
    type: String,
    required: true
  },
});

// 모델 생성
const User = mongoose.model('user', userSchema);

module.exports = User;