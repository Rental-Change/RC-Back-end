//Room.js
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        roomName: { 
            type: String, 
            required: true 
        },
        // members: [ // 이 방안에 들어있는 멤버들 리스트
        //     {
        //         type: mongoose.Schema.ObjectId,
        //         unique: true,
        //         ref: "User",
        //     },
        // ],
    
    my_ID: { 
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
    postUser_ID: { 
        type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true 
        },
    },   
    { timestamp: true }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;