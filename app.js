<<<<<<< HEAD
//app.js
=======
//express 모듈 불러오기
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9
const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const app = express()
<<<<<<< HEAD
const bodyParser = require('body-parser');
const loginRouter = require("./routers/loginRouter")
const signupRouter = require("./routers/signupRouter")
const postsRouter = require('./routers/postsRouter')
const viewRouter = require('./routers/listViewRouter')
const booMarkRouter = require('./routers/bookMarklRouter')

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());  // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const DBuri = "mongodb+srv://lgh0385hh:PEjPdAIA2iRoeDRJ@cluster0.r68uyyf.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";

=======
const userController = require("./controller/userController")
var postController = require('./controller/postController')


app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5001;
const DBuri = "mongodb+srv://lgh0385hh:PEjPdAIA2iRoeDRJ@cluster0.r68uyyf.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";


>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9
mongoose.connect(DBuri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

<<<<<<< HEAD
app.use('/signup', signupRouter);
// 로그인
app.use('/signin', loginRouter);
// my_page 리스트
app.use('/', viewRouter);
// 매장 등록
app.use('/posts', postsRouter);

app.use('/likepost', booMarkRouter )


=======
app.get("/", (req, res) => {
  //Hello World 데이터 반환
  res.send("Hello World")
})
//회원가입
app.post('/signup', userController.createUser);
//로그인
app.post('/signin', userController.loginUser);
//게시글 목록
app.use('/posts', postController);




// http listen port 생성 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 포트에서 실행 중입니다.`);
});
>>>>>>> 768ced843bdc2d8e095a03a448cee0f9c62c51e9
module.exports = app