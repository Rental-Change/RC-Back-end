const mongoose = require('mongoose');
const { Schema } = mongoose;

// 채팅 정보를 담을 스키마 정의
const chatSchema = new mongoose.Schema({
  chat: String,
  user: {
    id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    name: String,
  },
},
  {timestmap: true }
);

// 모델 생성
const User = mongoose.model('Chat', chatSchema);

module.exports = User;