const express = require('express')
const router = express.Router();
const userID = require('../Models/User')
const Post = require('../Models/Post')
const bcrypt = require("bcrypt")
//목록 접근
router.get('/', async(req, res, next) => {
    if (req.query.write) {
        res.render('posts/edit');
        return;
    }
    try {
        const posts = await Post.find({});
        res.render('posts/list', { posts });
    } catch (err) {
        next(err);
    }  
})
//작성
router.post('/', async (req, res,next) => {
        const {title, content} = req.body;
        try {
            await Post.create({
                title,
                content,
            });
            res.redirect('/');
        } catch(err) {
            next(err);
        }
});
router.get('/:userID', async (req, res, next) => {
    const { userID } = req.params;
    const post = await Post.findOne({ userID });
    if (!post) {
        next(new Error('Post NotFound'));
        return;
    }
    //수정페이지
    if (req.query.edit) {
        res.render('posts/edit', { post });
        return;
    }
    res.render('posts/view', { post });
}); 
//수정
router.post('/:userID', async(req, res, next) => {
    const {userID} = req.params;
    const {title, content} = req.body;
    
    try {
        const post = await Post.findOneAndUpdate({ userID }, { title, content });
        if (!post) {
            throw new Error('Post not found');
        }
        res.redirect(`/posts/${userID}`);
    } catch (err) {
        next(err);
    }
});
//삭제
router.delete('/:userID', async (req, res, next) => {
    const {userID} = req.params;
    try {
        await Post.deleteOne({ userID });
        res.send('OK');

    } catch (err){
        next(err);
    }
});

module.exports = router;