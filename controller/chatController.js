//chatController.js
const Chat = require("../Models/Chat");
const moment = require('moment');

exports.saveChat = async (message, user) => {
    try {
        const newMessage = new Chat({
            chat: message,
            receiverID: user.receiverID, // 메시지를 받는 사용자의 ID
            senderID: user.senderID, // 메시지를 보내는 사용자의 ID
            createdAt: user.createdAt,
            room: user.room,
        });

        await newMessage.save();
        return newMessage;

    } catch (error) {
        console.error('Error saving message:', error);
        throw error; // 오류를 호출자에게 전달
    }
};



exports.getChat = async (req, res) => {
    const { roomId } = req.params; // roomId를 올바르게 추출합니다.
    console.log(roomId);
    try {
      // 해당 채팅방의 이전 채팅 기록을 조회
      const messages = await Chat.find({ room: roomId }).sort({ createdAt: 'asc' });
      res.status(200).json({ messages });

    } catch (error) {
      console.error('Error fetching previous chat messages:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
