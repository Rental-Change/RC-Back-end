const Post = require('../Models/Post')
const mongoose = require('mongoose');
const DB = mongoose;

exports.all_List = async (req, res) => {
    try {
    const allList = DB.collection('posts').find().toArray()
        res.redirect('/', { allList });
    
    //const listPost = await Post.find();
    //res.status(200).json(listPost);

    } catch (error) {
        console.error('post 리스트를 불러오는 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류: post 리스트를 불러올 수 없습니다.' });
    }
    
    
}

exports.my_List = async (req, res) => {
    const userId = req.User.user_ID
try {
    const myList = DB.collection('posts').find({ user_ID : userId }).toArray()

    res.redirect('/',{ myList })

    //res.status(200).json(myList);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}

exports.like_List = async (req, res) => {
    const userId = req.User.user_ID;
try {
    const likeList = DB.collection('posts').find({ user_ID : userId, postLike: true }).toArray()

    res.redirect('/',{ likeList })
    
    //res.status(200).json(likeList);


    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}
