//listViewController.js
const BookMark = require('../Models/BookMark');
const Post = require('../Models/Post')
const User = require('../Models/User');
const mongoose = require('mongoose');

//전체 게시물 보여주기
exports.all_List = async (req, res) => {
    try {
    // const allList = DB.collection('posts').find()
    // res.redirect('/', { allList });
    
    const allList = await Post.find();
    res.status(200).json(allList);

    } catch (error) {
        console.error('post 리스트를 불러오는 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류: post 리스트를 불러올 수 없습니다.' });
    }
}
// 사용자가 쓴 게시물 보여주기
exports.my_List = async (req, res) => {
try {
    //const myList = DB.collection('posts').find({ user_ID : userID })
    //res.redirect('/',{ myList })
    const { userID } = req.params;

    if (!userID) {
        throw new Error('요청에서 userID를 찾을 수 없습니다.');
      }

    const userobjID = await User.findOne( { user_ID : userID })
    if (!userobjID) {
        throw new Error('해당하는 유저를 찾을 수 없습니다.');
      }
  
    const myList = await Post.find({ user : userobjID._id });
    res.status(200).json(myList);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}
// 좋아요 누른 게시물 보여주기
exports.bookMark_List = async (req, res) => {
try {
    const { userID } = req.params;

    if (!userID) {
        throw new Error('요청에서 userID를 찾을 수 없습니다.');
      }

    const user = await User.findOne( { user_ID : userID })
    if (!user) {
        throw new Error('해당하는 유저를 찾을 수 없습니다.');
      }
    console.log( user )
    const bookMark = await BookMark.find({ user : user._id });

    if (!bookMark) {
      console.log("등록된 북마크가 없습니다.")
    }

    res.status(200).json(bookMark);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}
