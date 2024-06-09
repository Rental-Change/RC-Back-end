//postControlloer.js
const Post = require('../Models/Post')
const User = require('../Models/User')

// 작성
exports.createPost = async (req, res, next) => {
    try {
        console.log("Received body data: ", req.body);  // 요청 본문 데이터를 로그로 기록합니다
        console.log("Received file data: ", req.file);  // 파일 데이터를 로그로 기록합니다

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        const { userID, title, amount, period, content, status } = req.body;
    
        const objID = await User.findOne({ user_ID: userID });

        const postImage = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };
        
        const post = new Post({
            user: objID._id,
            userID: userID,
            userName: objID.user_Name, // userName을 명시적으로 저장합니다
            postTitle: title,
            postAmount: amount,
            postPeriod: period,
            postContent: content,
            postImage: postImage,
            postStatus: status,
        });
        
        console.log("받은 데이터: ", post);
        await post.save();
        res.status(201).json({ message: 'Post created successfully' });

    } catch(err) {
        console.error("Error while creating post: ", err);
        next(err);
    }
};

// 게시물 상세 페이지
exports.post_View = async (req, res) => {
try {
    const { productId } = req.body;

    const postView = await Post.findOne( { _id : productId });
    
    res.status(200).json(postView);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}

//수정
exports.editPost = async (req, res, next) => {
  const { userID, title, amount, period, content, status, obj } = req.body;
  console.log(userID, title, amount, period, content, status, obj)
  try {
    // Find the post by _id
    const post = await Post.findOne({ _id: obj });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let postImage = post.postImage; // Default to existing image

    if (req.file && req.file.buffer) {
      postImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Fields to update
    const updateFields = { 
      postTitle: title,
      postAmount: amount,
      postPeriod: period,
      postContent: content,
      postImage: postImage,
      postStatus: status,
    };

    console.log(updateFields)
    // Update post
    const updatedPost = await Post.findOneAndUpdate(
      { _id: obj },
      updateFields,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Failed to update post" });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

//삭제
exports.deletePost = async (req, res, next) => {    
    try {
        // const { postID } = req.params;
        const { userID, productId } = req.body;
        console.log(userID)
        console.log(productId)

        // Check if the user is authorized to delete the post
        const post = await Post.findOne({ _id: productId, userID: userID });
        if (!post) {
            throw new Error('Post not found or you are not authorized to delete this post');
        }

        // Delete the post
        await Post.deleteOne({ _id: productId, userID: userID });

        res.status(200).send({ message: 'Post deleted successfully' });
        
    } catch (err){
        next(err);
    }
};