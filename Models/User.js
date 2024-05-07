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
    unique: 1
  },
  user_PW: {
    type: String,
    required: true,
    minlength: 8
  },
  token: {
    type: String,
  },
 
});

const User = mongoose.model('User', userSchema);

module.exports = User;