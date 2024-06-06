//postControlloer.js
const Post = require('../Models/Post')
const User = require('../Models/User')
const Like = require('../Models/BookMark')
const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose;
const DB = mongoose;


//작성
exports.createPost = async(req, res,next) => {
    try {
        console.log("Received body data: ", req.body);  // Debugging line to log the request body
        console.log("Received file data: ", req.file);  // Debugging line to log the file data

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const { userID, title, amount, period, content, status } = req.body
    
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

// 게시물 상세 페이지
exports.post_View = async (req, res) => {
try {
    const { postID } = req.params;
    console.log( postID )
    // const postView = DB.collection('posts').findOne({ _id : req.params.id })
    // res.redirect('/',{ postView })
    const postView = await Post.findOne( { _id : postID });
    res.status(200).json(postView);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}

// exports.getEdit = async (req, res, next) => {
//     const { userID } = req.params;
//     const { postID } = req.body;

//     const post = await Post.findOne({ user_ID : userID, _id : postID });
//     console.log(post)

//     if (!post) {
//         next(new Error('Post NotFound'));
//         return;
//     }
//     //수정페이지
//     if (req.query.edit) {
//         res.render('/posts/edit', { post });
//         return;
//     }
//     res.render('/posts', { post });
// }; 
//수정
exports.editPost = async(req, res, next) => {
    const { userID } = req.params;
    const { title, amount, period, content, status, postImage } = req.body

    try {
        const updateFields = { 
            postTitle: title,
            postAmount: amount,
            postPeriod: period,
            postContent: content,
            postStatus: status,
            postImage: postImage, 
        };

        const post = await Post.findOneAndUpdate({ user_ID : userID }, updateFields, { new: true });
        console.log(post);
        if (!post) {
            throw new Error('Post not found');
        }
    } catch (err) {
        next(err);
    }
};
//삭제
exports.deletePost = async (req, res, next) => {    
    try {
        const { userID } = req.params;
        const { postID } = req.body;

        // Check if the user is authorized to delete the post
        const post = await Post.findOne({ _id: postID, user_ID: userID });
        if (!post) {
            throw new Error('Post not found or you are not authorized to delete this post');
        }

        // Delete the post
        await Post.deleteOne({ _id: postID, user_ID: userID });

        res.status(200).send({ message: 'Post deleted successfully' });
        
    } catch (err){
        next(err);
    }
};

