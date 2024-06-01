//app.js
const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const app = express()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { refreshJwtMiddleware }  = require('./token/refreshJwtMiddleware')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// refresh 토큰 미들웨어
app.use(refreshJwtMiddleware);
app.use(bodyParser.json());  // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

const DBuri = "mongodb+srv://lgh0385hh:PEjPdAIA2iRoeDRJ@cluster0.r68uyyf.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DBuri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


// app.get("/posts", (req, res) => {
//   //Hello World 데이터 반환
// })


module.exports = app