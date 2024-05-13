//express 모듈 불러오기
const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const app = express()
const userController = require("./controller/userController")
var postController = require('./controller/postController')


app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5001;
const DBuri = "mongodb+srv://lgh0385hh:PEjPdAIA2iRoeDRJ@cluster0.r68uyyf.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(DBuri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

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
module.exports = app