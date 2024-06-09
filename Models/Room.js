//Room.js
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
    roomName: { 
            type: String, 
            required: true 
        },
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