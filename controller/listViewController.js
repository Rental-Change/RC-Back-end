//listViewController.js

const Post = require('../Models/Post')
const mongoose = require('mongoose');
const DB = mongoose;
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
    const userId = req.User.user_ID
try {
    const myList = DB.collection('posts').find({ user_ID : userId })

    res.redirect('/',{ myList })

    //res.status(200).json(myList);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}
// 좋아요 누른 게시물 보여주기
exports.like_List = async (req, res) => {
    const userId = req.parmas.userID;
try {
    const likeList = DB.collection('posts').find({ user_ID : userId, postLike: true })

    res.redirect('/',{ likeList })
    
    //res.status(200).json(likeList);


    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}
