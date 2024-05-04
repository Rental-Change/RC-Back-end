const cors = require("cors");
const express = require('express');
const app = express();
const userController = require('./controller/userController')
const PORT = process.env.PORT || 5001;
const mongoose = require('mongoose');
const DB = "mongodb+srv://lgh0385hh:PEjPdAIA2iRoeDRJ@cluster0.r68uyyf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(DB, {useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


// 미들웨어 설정
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('백엔드 서버가 동작 중입니다.');
});

// 회원가입
app.post('/signup', userController.createUser);
app.post('/signin', userController.loginUser);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 포트에서 실행 중입니다.`);
});
