const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/User');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Connect to MongoDB
const PORT = process.env.PORT || 8080;
const uri = "mongodb://localhost:27017";

app.use(express.static(path.join(__dirname, '..', 'RC-client', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'RC-client', 'dist', 'assets')));
app.use('/homepage', express.static(path.join(__dirname, 'public')));
app.use(express.json());


mongoose.connect(uri, {useNewUrlParser: true,  useUnifiedTopology: true}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.get('/homepage', (req, res) => {
  res.send('This is the homepage');
});

app.get('/', (req, res) => {
  res.render('index'); // Renders index.ejs in views directory
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});