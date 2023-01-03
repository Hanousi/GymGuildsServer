const Sequelize = require('sequelize');

const { Op } = Sequelize;
const User = require('../models/User');
const Banner = require('../models/Banner');
const Challenge = require('../models/Challenges');
const UserStat = require('../models/UserStats');
const Badge = require('../models/Badge');

exports.getUser = async (req, res) => {
  const todaysStart = new Date().setHours(0, 0, 0, 0);
  const now = new Date();

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
    }, {
      model: UserStat,
      group: 'statName',
      attributes: {
        include: [
          [Sequelize.fn('MAX', Sequelize.col('value')), 'mostRecent'],
        ],
      },
      where: {
        createdAt: {
          [Op.gt]: todaysStart,
          [Op.lt]: now,
        },
      },
      required: false,
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

exports.updateStat = async (req, res) => {
  const newUserStat = new UserStat({
    userId: req.params.userId,
    statName: req.body.statName,
    value: req.body.value,
  });

  try {
    await newUserStat.save();
  } catch (e) {
    console.log(e);
    return res.status(500);
  }

  return res.send('User stat added');
};
