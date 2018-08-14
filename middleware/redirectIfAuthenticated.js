//* load modules
const User = require('../models/User');

module.exports = async (req, res, next) => {

  if (req.session.userId) {
    return res.redirect('/');
  }

  next();
}