const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/User');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require("cors")
const app = express()
app.use(cors());



mongoose.connect(process.env.BD, {useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.get('/homepage', (req, res) => {
  res.send('This is the homepage');
});

app.get('/', (req, res) => {
  res.render('hello'); // Renders index.ejs in views directory
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
