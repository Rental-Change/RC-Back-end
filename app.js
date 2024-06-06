const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const loginRouter = require("./routers/loginRouter");
const signupRouter = require("./routers/signupRouter");
const postsRouter = require('./routers/postsRouter');
const viewRouter = require('./routers/listViewRouter');
const bookMarkRouter = require('./routers/bookMarkRouter');

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));

const DBuri = "mongodb+srv://lgh0385hh:PEjPdAIA2iRoeDRJ@cluster0.r68uyyf.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DBuri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use('/signup', signupRouter);
app.use('/signin', loginRouter);
app.use('/', viewRouter);
app.use('/', postsRouter);
app.use('/', bookMarkRouter );

module.exports = app;
