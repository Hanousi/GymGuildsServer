const Friends = require('../models/Friends');
const User = require('../models/User');

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      userId: req.params.userId,
    },
    include: {
      model: User,
      as: 'myFriends',
      attributes: [
        'fullName',
        'points',
      ],
      order: [
        [{ model: User, as: 'myFriends' }, Friends, 'points', 'DESC'],
      ],
    },
  });

  res.send(user);
};

exports.addPoints = async (req, res) => {
  const user = await User.findOne({
    where: {
      userId: req.params.userId,
    },
  });
  const newPoints = parseInt(req.body.points, 10);
  const originalPoints = user.points;

  user.points = originalPoints + newPoints;

  try {
    await user.save();
  } catch (e) {
    console.log(e);
  }

  res.send('Points added!');
};
