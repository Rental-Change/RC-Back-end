//listViewController.js
const BookMark = require('../Models/BookMark');
const Post = require('../Models/Post')
const User = require('../Models/User');

//전체 게시물 보여주기
exports.all_List = async (req, res) => {
    try {
    const allList = await Post.find();
    res.status(200).json(allList);

    } catch (error) {
        console.error('post 리스트를 불러오는 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류: post 리스트를 불러올 수 없습니다.' });
    }
}
// 사용자가 쓴 게시물 보여주기
exports.my_List = async (req, res) => {
try {
    const { userID } = req.params;

    if (!userID) {
        throw new Error('요청에서 userID를 찾을 수 없습니다.');
      }

    const user = await User.findOne( { user_ID : userID })
    if (!user) {
        throw new Error('해당하는 유저를 찾을 수 없습니다.');
      }
  
    const myList = await Post.find({ user : user._id });
    res.status(200).json(myList);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}
// 좋아요 누른 게시물 보여주기
exports.bookMark_List = async (req, res) => {
try {
    const { userID } = req.params;

    if (!userID) {
        throw new Error('요청에서 userID를 찾을 수 없습니다.');
      }
    const user = await User.findOne( { user_ID : userID })
    if (!user) {
          throw new Error('해당하는 유저를 찾을 수 없습니다.');
      }
    
    const userBookmark = await BookMark.find( { user : user._id })
    

  // Extract post IDs from userBookmarks
  const postIDs = userBookmark.map(bookmark => bookmark.post);

  // Fetch posts by the extracted post IDs
  const bookMarkList = await Post.find({ _id: { $in: postIDs } });
  res.status(200).json(bookMarkList);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }    
}

exports.status_List = async (req, res) => {
  try {
      const { userID } = req.params;

      console.log(status);

      if (!userID) {
          throw new Error('요청에서 userID를 찾을 수 없습니다.');
        }
  
      const user = await User.findOne( { user_ID : userID })
      if (!user) {
          throw new Error('해당하는 유저를 찾을 수 없습니다.');
        }
        const statusList = await Post.find({ 
          user: user._id,
          status: { $in: ["예약 중", "거래 중"] }
        });
        
      res.status(200).json(statusList);
  
      } catch (error) {
          console.error('Error fetching posts:', error);
          res.status(500).send('Internal Server Error');
      }    
  }
