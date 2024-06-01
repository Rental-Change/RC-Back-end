const Post = require('../Models/Post')
const User = require('../Models/User')
const Like = require('../Models/Like')
const mongoose = require('mongoose');


exports.addlikePost = async (req, res, next) => {
    try {
        const { userID, postID } = req.body;
        const userObjID = await User.findOne( { user_ID : userID })
        const postObjID = await Post.findOne( { _id : postID })

        const like = new Like({
            user: userObjID._id,
            post: postObjID._id,
            postLike: true,
        });
        console.log("받은 데이터: ", like);
        await like.save()

    } catch (err){
        next(err);
    }
};

exports.deleteLikePost = async (req, res, next) => {
    const { userID, postID } = req.body;
    try {
        await Like.deleteOne({ user_ID : userID, post: postID });
        res.send('delete 성공');
    } catch (err){
        next(err);
    }
};