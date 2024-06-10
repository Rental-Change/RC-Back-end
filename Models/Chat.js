const mongoose = require('mongoose');
const { Schema } = mongoose;

// 채팅 정보를 담을 스키마 정의
const chatSchema = new mongoose.Schema({
  chat: String,
  receiverID: { 
    type: String,
    required: true 
  },
  senderID: { 
        type: String,
        required: true 
    },
  createdAt: { 
      type: String, 
      default: Date.now 
    },
    room: { type: String, required: true },
});

// 모델 생성
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;