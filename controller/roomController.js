//roomController.js
const Room = require("../Models/Room");
const User = require("../Models/User");
const Chat = require("../Models/Chat");

exports.getAllRooms = async ( req, res ) => { 
    try {
        const { userID } = req.params;
        
        const myID = await User.findOne({ user_ID : userID });
        const roomList = await Room.find({
            $or: [
              { my_ID: myID },
              { postUser_ID: myID }
            ]
          }).populate('my_ID','user_ID user_Name').populate('postUser_ID', 'user_ID user_Name');
        
          res.status(200).json(roomList);

    } catch (error) {
        res.status(500).json({ message: '서버 오류', error });
    }
}

exports.createRoom = async ( req, res ) => {
    try {
        const { myid, postid, postTitle } = req.body;

        if ( !myid || !postid ) {
            console.log("사용자를 찾을 수 없습니다.");
            return;
        }
        const myID = await User.findOne({ user_ID : myid });
        const postID = await User.findOne({ user_ID : postid });
        
        // 동일한 채팅방이 이미 있는지 확인
        const existingRoom = await Room.findOne({
            my_ID: myID._id,
            postUser_ID: postID._id,
            roomName: postTitle
        });

        if (existingRoom) {
            console.log("이미 존재하는 방입니다.");
            res.status(409).json({ message: "이미 존재하는 방입니다." });
            return;
        }

        const newRoom = new Room({
            roomName : postTitle,
            my_ID: myID._id,
            postUser_ID: postID._id,
        });

        await newRoom.save();

        res.status(200).json("성공");

    } catch (error) {
        res.status(500).json({ message: '서버 오류', error });
    }

};

exports.leaveRoom = async (req, res) => {
    try {
        const { myid, postid } = req.body;

        const room = await Room.findOne({ my_ID: myid , postUser_ID: postid});
        if (!room) {
            throw new Error("Room not found");
        }

        // 채팅방 삭제
        await Room.deleteOne({ my_ID: myid , postUser_ID: postid });
        // 삭제한 채팅방의 채팅 내용 삭제
        await Chat.deleteMany({ room : room._id })

    } catch (error) {
        res.status(500).json({ message: '서버 오류', error });
    }
    
};