const Chat = require("../Models/Chat")
const chatController ={};

chatController.saveChat = async (message,user) =>{
    const newMessage = new Chat({
        chat:message,
        user_ID,
    });
    await newMessage.save();
    return newMessage;
}