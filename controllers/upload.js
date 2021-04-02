const upload = require('../lib/upload');
const User = require('../models/user');

exports.uploadAvatar = async (req, res) => {
  const id = req.user.id;
  const user = await User.findOne({
    where: { id },
  });
  try {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
      }

      user.avatar = req.files[0].location;
      await user.save();
      return res.json({ user });
    });
  } catch (error) {
    return res.status(401).json({ error });
  }
};
