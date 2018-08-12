const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/node-js-blog", {
  useNewUrlParser: true
})

app.use(express.static('public'));

// set template engine Edge
app.use(require('express-edge'));
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {
  res.render('home');
})
// comment
app.get('/posts/new', (req, res) => {
  res.render('create');
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/post', (req, res) => {
  res.render('post');
})

app.get('/contact', (req, res) => {
  res.render('contact');
})

app.listen(4000, () => {
  console.log('App listening on port 4000');
})