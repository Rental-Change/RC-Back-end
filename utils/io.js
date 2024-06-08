const chatController = require("../controller/chatController");
const Chat = require("../Models/Chat");

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('a user connected');
      
        socket.on('sendMessage', async (msg, callback) => {
          try {
              const newMessage = await chatController.saveChat(msg.chat, {
                  receiverID: msg.receiverID, // 메시지를 받는 사용자의 ID
                  senderID: msg.senderID, // 메시지를 보내는 사용자의 ID
                  room: msg.roomID
              });
              io.emit('chat message', newMessage);
              callback({ ok: true });
          } catch (err) {
              console.error('Error saving message:', err);
              callback({ ok: false, data: err.message });
          }
      });
        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
    });
};