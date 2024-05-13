//postControlloer.js
const express = require('express')
const router = express.Router();
const Post = require('../Models/Post')
const bcrypt = require("bcrypt")
//목록 접근
router.get('/posts', async(req, res, next) => {
    if (req.query.write) {
        res.render('posts/edit');
        return;
    }
    try {
        const post = await Post.find({});
        res.render('posts/list', { Post });
    } catch (err) {
        next(err);
    }  
})
//작성
router.post('/posts/create', async (req, res,next) => {
    const {id, title, content, image} = req.body;
    try {
         await Post.create({
            user_ID : id,
            postTitle : title,
            postContent : content,
            postImage : image,
        });
        res.redirect('/posts/create');
    } catch(err) {
        next(err);
    }
});
router.get('/posts/:userID', async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findOne({ user_ID : id });
    if (!post) {
        next(new Error('Post NotFound'));
        return;
    }
    //수정페이지
    if (req.query.edit) {
        res.render('posts/edit', { Post });
        return;
    }
    res.render('posts/view', { Post });
}); 
//수정
router.post('/posts/:userID', async(req, res, next) => {
    const {id} = req.params;
    const {title, content, image} = req.body;
    
    try {
        const post = await Post.findOneAndUpdate({ user_ID : id}, { postTitle : title, postContent : content, postImage : image});
        if (!post) {
            throw new Error('Post not found');
        }
        res.redirect('/posts/${userID}');
    } catch (err) {
        next(err);
    }
});
//삭제
router.delete('/posts/:userID', async (req, res, next) => {
    const {id} = req.params;
    try {
        await Post.deleteOne({ user_ID : id });
        res.send('OK');

    } catch (err){
        next(err);
    }
});

module.exports = router;