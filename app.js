//app.js
const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const app = express()
const bodyParser = require('body-parser');
const loginRouter = require("./routers/loginRouter")
const signupRouter = require("./routers/signupRouter")
const postsRouter = require('./routers/postsRouter')
const viewRouter = require('./routers/listViewRouter')
const bookMarkRouter = require('./routers/bookMarkRouter')

app.use(express.json())
app.use(cors())
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser())

app.use(bodyParser.json());  // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const DBuri = "mongodb+srv://lgh0385hh:PEjPdAIA2iRoeDRJ@cluster0.r68uyyf.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DBuri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// 회원가입
app.use('/signup', signupRouter);
// 로그인
app.use('/signin', loginRouter);
// my_page 리스트
app.use('/', viewRouter);
// 매장 등록
app.use('/posts', postsRouter);
// 북마크
app.use('/', bookMarkRouter )



module.exports = app