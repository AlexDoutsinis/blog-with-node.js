//* load modules
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    bcrypt.compare(password, user.password).then(same => {
      if (same) {
        req.session.userId = user._id;
        return res.redirect('/');
      }
      res.redirect('/auth/login')
    })
  } else {
    res.redirect('/auth/login');
  }

}