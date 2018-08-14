//* load modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Please provide your username'
  },
  email: {
    type: String,
    required: 'Please provide your email',
    unique: true
  },
  password: {
    type: String,
    required: 'Please provide your password'
  }
})

UserSchema.pre('save', function (next) {
  const user = this;

  bcrypt.hash(user.password, 10).then(encrypted => {
    user.password = encrypted;
    next();
  }).catch(err => console.log(err));
})

module.exports = mongoose.model('User', UserSchema);