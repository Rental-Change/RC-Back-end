const User = require('../Models/User');
const Post = require('../Models/Post')
const mongoose = require('mongoose');
const DB = mongoose;

exports.allList = async (req, res) => {
    const listData = req.body;
    console.log('받은 데이터:', listData);

    const { title, image } = listData;
    const existingTitle = await User.findOne({ postTitle : title , postImage : image});
    DB.collection('posts').find({ existingTitle }).toArray(function(err,rst){
        res.redirect('/')
    })
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