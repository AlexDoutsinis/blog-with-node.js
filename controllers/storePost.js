//* load modules
const path = require('path');

//* load models
const Post = require('../models/Post');

module.exports = async (req, res) => {
  const { image } = req.files

  try {
    await image.mv(path.resolve(__dirname, '..', 'public/posts', image.name));
    await Post.create({
      ...req.body,
      image: `/posts/${image.name}`,
      user_id: req.session.userId
    });
    res.redirect('/');
  } catch (err) {
    throw new Error(err);
  }

}