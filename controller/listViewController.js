const User = require('../Models/User');
const Post = require('../Models/Post')
const mongoose = require('mongoose');
const DB = mongoose;

exports.allList = async (req, res) => {
    const listData = req.body;
    console.log('받은 데이터:', listData);
    try {
        const { title, image } = listData;
    const existingTitle = await User.findOne({ postTitle : title , postImage : image});
    DB.collection('posts').find({ existingTitle }).toArray(function(err,rst){
        res.redirect('/');
    })
    } catch (error) {
        console.error('매장 리스트를 불러오는 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류: 매장 리스트를 불러올 수 없습니다.' });
    }
    
    
}

// exports.myList = async (req, res) => {
//     const listData = req.body;
//     console.log('받은 데이터:', listData);

//     const { id ,title } = listData;
// try {
//     const existingUser = await User.findOne({ user_ID : id });
//     if (existingUser) {
//         db.collection('post').find({ existingUser }).toArray(function(err,rst){
//             res.redirect('/post')
//         })
//       }
//     } catch (error) {
//         next(error);
//     }    
// }