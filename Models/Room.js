const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        room: String,
        members: [ // 이 방안에 들어있는 멤버들 리스트
            {
                type: mongoose.Schema.ObjectId,
                unique: true,
                ref: "User",
            },
        ],
    },
    { timestamp: true }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;