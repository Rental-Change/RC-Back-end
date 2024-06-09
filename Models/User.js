const mongoose = require('mongoose');

// 유저 정보를 담을 스키마 정의
const userSchema = new mongoose.Schema({
  user_Name: String,
  user_ID: {
    type: String,
    required: true,
    unique: true
  },
  user_PW: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;