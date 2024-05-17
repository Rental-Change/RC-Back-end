//app.js
const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const cors = require("cors")
const app = express()


app.use(express.json())
app.use(cors())

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
app.get("/posts", (req, res) => {
  //Hello World 데이터 반환
  res.send("Hello posts")
})


module.exports = app