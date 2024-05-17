//postControlloer.js
const Post = require('../Models/Post')
const upload = require('../utils/upload')

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
//작성
exports.createPost = async(req, res,next) => {
    upload.single('postImage') 
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log("받은 파일 데이터: ", req.file)

        const {userID, title, content} = req.body;
        const postImage = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          };
    
        const post = new Post({
            user : userID,
            postTitle : title,
            postContent : content,
            postImage : postImage,
        });
        
        console.log("받은 데이터: ", post)
        await post.save()
        res.redirect('/posts');

    } catch(err) {
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
    const { title, content } = req.body;
    const image = {
        data: req.file,//.buffer,
        contentType: req.file,//.mimetype,
      };
    
    try {
        const post = await Post.findOneAndUpdate({ user_ID : userID }, { postTitle : title, postContent : content, postImage : image});
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