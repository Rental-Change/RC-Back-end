const mongoose = require('mongoose');
<<<<<<< HEAD

// 유저 정보를 담을 스키마 정의
const userSchema = new mongoose.Schema({
  user_Name: {
    type: String,
    required: true,
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
=======
const { Schema } = mongoose;

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
    required: true
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9
  },
  token: {
    type: String,
  },
 
});

<<<<<<< HEAD
=======
// 모델 생성
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9
const User = mongoose.model('User', userSchema);

module.exports = User;