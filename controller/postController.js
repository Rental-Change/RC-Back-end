//postControlloer.js
const Post = require('../Models/Post')
const User = require('../Models/User')
const Like = require('../Models/Like')
const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;
const DB = mongoose;

// //목록 접근
// exports.getPost = async(req, res, next) => {
//     if (req.query.write) {
//         res.render('/posts/edit');
//         return;
//     }
//     try {
//         const post = await Post.find({});
//         res.render('/posts', { post });
//     } catch (err) {
//         next(err);
//     }  
// };
// 게시물 상세 페이지
exports.post_View = async (req, res) => {
    console.log(req.params.id)
    req.params.id = new objId(req.params.id)
try {
    const postView = DB.collection('posts').findOne({ _id : req.params.id })

    res.redirect('/',{ postView })
    
    //res.status(200).json(postView);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}
//작성
exports.createPost = async(req, res,next) => {
    try {
        console.log("Received body data: ", req.body);  // Debugging line to log the request body
        console.log("Received file data: ", req.file);  // Debugging line to log the file data

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const {userID, title, amount, period, content, status} = req.body
    
        const objID = await User.findOne( { user_ID : userID })

        const postImage = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };
        
        const post = new Post({
            user: objID._id,
            postTitle: title,
            postAmount: amount,
            postPeriod: period,
            postContent: content,
            postStatus: status,
            postImage: postImage,
        });
        
        console.log("받은 데이터: ", post)
        await post.save()
        res.status(201).json({ message: 'Post created successfully' });

    } catch(err) {
        console.error("Error while creating post: ", err);
        next(err);
    }
};
exports.getEdit = async (req, res, next) => {
    const { userID } = req.params;
    const post = await Post.findOne({ user_ID : userID });
    console.log(post)
    if (!post) {
        next(new Error('Post NotFound'));
        return;
    }
    //수정페이지
    if (req.query.edit) {
        res.render('/posts/edit', { post });
        return;
    }
    res.render('/posts', { post });
}; 
//수정
exports.editPost = async(req, res, next) => {
    const { userID } = req.params;
    const { title, amount, period,content, status } = req.body;
    const postImage = {
        data: req.file.buffer,
        fileName: req.file.filename,
        contentType: req.file.mimetype,
      };
    
    try {
        const post = await Post.findOneAndUpdate({ user_ID : userID }, { 
                postTitle : title, 
                postContent : content, 
                postAmount: amount , 
                postPeriod: period,
                postStatus: status,
                postImage : postImage
            });
        console.log(post)
        if (!post) {
            throw new Error('Post not found');
        }
        res.redirect(`/posts/${userID}`);
    } catch (err) {
        next(err);
    }
};
//삭제
exports.deletePost = async (req, res, next) => {
    const {userID} = req.params;
    try {
        await Post.deleteOne({ user_ID : userID });
        res.send('OK');

    } catch (err){
        next(err);
    }
};
