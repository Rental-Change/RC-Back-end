//roomController.js
const Room = require("../Models/Room");
const User = require("../Models/User");


exports.getAllRooms = async ( req, res ) => { 
    try {
        const { userID } = req.params;
        const myID = await User.findOne({ user_ID : userID });
        const postUserID = await User.findOne({ user_ID : postUserID });
        const roomList = await Room.find({
            $or: [
                { my_ID: myID._id },
                { postUser_ID : myID._id}
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
    if (!myID || !postID) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    // 중복 방 체크
    const existingRoom = await Room.findOne({
        $or: [
            { my_ID: myID._id, postUser_ID: postID._id },
            { my_ID: postID._id, postUser_ID: myID._id }
        ]
    });

    if (existingRoom) {
        return res.status(400).json({ message: '이미 존재하는 방입니다.' });
    }

    const newRoom = new Room({
        roomName : postTitle,
        my_ID: myID._id,
        postUser_ID: postID._id,
        // members : [ myID._id, postID._id ],
    });

    await newRoom.save();
    res.status(201).json({ message: '새로운 방이 생성되었습니다.', room: newRoom });
};

// 채팅방을 떠나는 함수
exports.leaveRoom = async (req, res) => {
    const { myid, postid } = req.body;

    try {
        const myID = await User.findOne({ user_ID: myid });
        const postID = await User.findOne({ user_ID: postid });

        if (!myID || !postID) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        const room = await Room.findOne({ my_ID: myID._id, postUser_ID: postID._id });

        if (!room) {
            return res.status(404).json({ message: '방을 찾을 수 없습니다.' });
        }

        await Room.deleteOne({ _id: room._id });

        res.status(200).json({ message: '방을 떠났습니다.' });
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error });
    }
};