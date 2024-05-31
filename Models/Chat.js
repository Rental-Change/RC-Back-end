const mongoose = require('mongoose');
<<<<<<< HEAD
=======
const { Schema } = mongoose;
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9

// 채팅 정보를 담을 스키마 정의
const chatSchema = new mongoose.Schema({
  chat: String,
  user: {
<<<<<<< HEAD
    user_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    user_Name: String,
  },
  room: {
    type: mongoose.Schema.ObjectId,
    ref: "Room",
=======
    id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    name: String,
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9
  },
},
  {timestmap: true }
);

// 모델 생성
<<<<<<< HEAD
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
=======
const User = mongoose.model('Chat', chatSchema);

module.exports = User;
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9
