//* load modules
const User = require('../models/User');

module.exports = async (req, res, next) => {

  try {
    const user = await User.findById(req.session.userId);
    if (user) return next();
    res.redirect('/');
  } catch (err) {
    throw new Error(err);
  }

}