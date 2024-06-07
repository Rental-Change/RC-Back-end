//roomController.js
const Room = require("../Models/Room");
const User = require("../Models/User");


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
    const { myid, postid, postTitle } = req.body;

    if ( !myid || !postid ) {
        console.log("사용자를 찾을 수 없습니다.");
        return;
    }
    const myID = await User.findOne({ user_ID : myid });
    const postID = await User.findOne({ user_ID : postid });
    
    const newRoom = new Room({
        roomName : postTitle,
        my_ID: myID._id,
        postUser_ID: postID._id,
        // members : [ myID._id, postID._id ],
    });

    await newRoom.save();
    // const room = await Room.findById(roomId);
    // if (!room) {
    //     throw new Error("해당 방이 없습니다.");
    // }
    // if (!room.members.includes(user._id)) {
    //     room.members.push(user._id);
    //     await room.save();
    // }
    // user.room = roomId;
    // await user.save();
};

exports.leaveRoom = async (req, res) => {
    const { myid, postid } = req.body;
    const room = await Room.findOne({ my_ID: myid , postUser_ID: postid});
    if (!room) {
        throw new Error("Room not found");
    }
    await Room.deleteOne({ my_ID: myid , postUser_ID: postid });
};
