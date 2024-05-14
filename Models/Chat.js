const mongoose = require('mongoose');

// 채팅 정보를 담을 스키마 정의
const chatSchema = new mongoose.Schema({
  chat: String,
  user: {
    user_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    user_Name: String,
  },
},
  {timestmap: true }
);

// 모델 생성
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;