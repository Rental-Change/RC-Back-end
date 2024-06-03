const Chat = require("../Models/Chat")
const chatController ={};

chatController.saveChat = async (message,user) =>{
    const newMessage = new Chat({
        chat:message,
        user:{
            user_ID: user._id,
            user_Name: user.name
        },
        room: user.room,
    });
    await newMessage.save();
    return newMessage;
}