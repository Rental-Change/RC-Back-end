const Chat = require("../Models/Chat")
const chatController ={};
const moment = require('moment')



exports.saveChat = async (message,user) =>{
    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    console.log(date)

    const newMessage = new Chat({
        chat:message,
        user:{
            user_ID: user._id,
            user_Name: user.name,
        },
        createdAt: date,

        room: user.room,
    });
    await newMessage.save();
    return newMessage;
}

exports.createChat = async (message,user) =>{
    const { postTitle } = req.body.postTitle;

    Room.insertMany([
        {
            room: postTitle,
            members: [],
        },
    ])
        .then(() => res.send("Chat room created"))
        .catch((error) => res.send(error));
}

