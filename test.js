const mongoose = require('mongoose');

const Post = require('./database/models/Post');


mongoose.connect("mongodb://localhost/node-js-blog");

Post.create({
  title: 'title 3',
  description: 'desc',
  content: 'body'
}, (error, post) => {
  console.log(error, post);
})