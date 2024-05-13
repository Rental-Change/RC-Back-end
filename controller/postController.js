const express = require('express')
const router = express.Router();
const userID = require('../Models/User')
const post = require('../Models/Post')
const bcrypt = require("bcrypt")


// 게시물 작성
router.post('/', async (req, res, next) => {
    const { title, content } = req.body;
    try {
        // 새로운 게시물 생성
        const newPost = await post.create({
            title,
            image,
            content,
        });

        // 생성된 게시물 정보를 클라이언트에 응답으로 보내기
        res.status(201).json({ success: true, message: '게시물이 성공적으로 생성되었습니다.', post: newPost });
    } catch (err) {
        // 에러가 발생한 경우, 에러를 다음 미들웨어에 전달하여 처리
        next(err);
    }
});

module.exports = router;


// //목록 접근
// router.get('/', async(req, res, next) => {
//     if (req.query.write) {
//         res.render('posts/edit');
//         return;
//     }
//     try {
//         const posts = await post.find({});
//         res.render('posts/list', { posts });
//     } catch (err) {
//         next(err);
//     }  
// })
// //작성

// router.get('/:userID', async (req, res, next) => {
//     const { userID } = req.params;
//     const post = await Post.findOne({ userID });
//     if (!post) {
//         next(new Error('Post NotFound'));
//         return;
//     }
//     //수정페이지
//     if (req.query.edit) {
//         res.render('posts/edit', { post });
//         return;
//     }
//     res.render('posts/view', { post });
// }); 
// //수정
// router.post('/:userID', async(req, res, next) => {
//     const {userID} = req.params;
//     const {title, content} = req.body;
    
//     try {
//         const post = await Post.findOneAndUpdate({ userID }, { title, content });
//         if (!post) {
//             throw new Error('Post not found');
//         }
//         res.redirect(`/posts/:${userID}`);
//     } catch (err) {
//         next(err);
//     }
// });
// //삭제
// router.delete('/:userID', async (req, res, next) => {
//     const {userID} = req.params;
//     try {
//         await Post.deleteOne({ userID });
//         res.send('ok');

//     } catch (err){
//         next(err);
//     }
// });

module.exports = router;