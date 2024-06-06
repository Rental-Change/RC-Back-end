const mongoose = require('mongoose');

// 채팅 정보를 담을 스키마 정의
const chatSchema = new mongoose.Schema({
  chat: String,
  user: { 
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
  createdAt: { 
      type: String, 
      default: Date.now 
    },
});

// 모델 생성
const User = mongoose.model('Chat', chatSchema);

module.exports = User;