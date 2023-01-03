const User = require('../models/User');
const Banner = require('../models/Banner');
const Challenge = require('../models/Challenges');
const Badge = require('../models/Badge');

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      userId: req.params.userId,
    },
    order: [
      [{ model: User, as: 'myFriends' }, 'points', 'DESC'],
    ],
    include: [{
      model: User,
      as: 'myFriends',
      attributes: [
        'fullName',
        'points',
      ],
    },
    {
      model: Banner,
    },
    {
      model: Challenge,
    },
    {
      model: Badge,
    }],
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
