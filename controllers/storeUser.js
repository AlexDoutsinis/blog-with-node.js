//* load models
const User = require('../models/User');

module.exports = async (req, res) => {

  try {
    await User.create(req.body);

    res.redirect('/');
  } catch (err) {
    const registrationErrors = Object.keys(err.errors).map(key => err.errors[key].message);

    req.flash('registrationErrors', registrationErrors);
    req.flash('data', req.body);

    res.redirect('/auth/register');
  }

}