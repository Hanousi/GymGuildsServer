const Sequelize = require('sequelize');

const { Op } = Sequelize;
const User = require('../models/User');
const Banner = require('../models/Banner');
const Challenge = require('../models/Challenges');
const UserStat = require('../models/UserStats');
const Badge = require('../models/Badge');
const FriendRequest = require('../models/FriendRequest');
const ChallengeRequest = require('../models/ChallengeRequest');
const PointsUser = require('../models/Points');

exports.getUser = async (req, res) => {
  const todaysStart = new Date().setHours(0, 0, 0, 0);
  const now = new Date();

  try {
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
        required: false,
      },
      {
        model: FriendRequest,
        as: 'recievedFriendRequests',
        where: {
          status: 0,
        },
        include: [{
          model: User,
        }],
        required: false,
      },
      {
        model: ChallengeRequest,
        as: 'recievedChallengeRequests',
        where: {
          status: 0,
        },
        include: [{
          model: Challenge,
        }],
        required: false,
      },
      {
        model: Banner,
        required: false,
      },
      {
        model: Challenge,
        required: false,
      },
      {
        model: UserStat,
        group: 'statName',
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
        required: false,
      }],
    });

    res.send(user);
  } catch (e) {
    console.log(e);
  }
};

exports.addUserStat = async (req, res) => {
  const todaysStart = new Date().setHours(0, 0, 0, 0);
  const now = new Date();
  const promises = [];

  req.body.forEach(async (stat) => {
    const existingUserStat = await UserStat.findOne({
      where: {
        createdAt: {
          [Op.gt]: todaysStart,
          [Op.lt]: now,
        },
        userId: req.params.userId,
        statName: stat.statName,
      },
    });

    if (!existingUserStat) {
      const newUserStat = new UserStat({
        userId: req.params.userId,
        statName: stat.statName,
        value: stat.value,
      });

      const promise = newUserStat.save();
      promises.push(promise);
    } else {
      existingUserStat.value = stat.value;

      const promise = existingUserStat.save();
      promises.push(promise);
    }
  });

  try {
    await Promise.all(promises);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }

  let calcPoints = 0;
  req.body.forEach((stat) => {
    if (stat.statName === 'Calories Burned') {
      calcPoints += parseInt(stat.value, 10);
    } else if (stat.statName === 'Minutes excerised') {
      calcPoints += (parseInt(stat.value, 10) * 5);
    }
  });

  const existingPointsUser = await PointsUser.findOne({
    where: {
      createdAt: {
        [Op.gt]: todaysStart,
        [Op.lt]: now,
      },
      userId: req.params.userId,
    },
  });

  if (!existingPointsUser) {
    const pointsUser = new PointsUser({
      points: calcPoints,
      userId: req.params.userId,
    });

    try {
      await pointsUser.save();
    } catch (e) {
      console.log(e);
    }
  } else {
    existingPointsUser.points = calcPoints;

    try {
      await existingPointsUser.save();
    } catch (e) {
      console.log(e);
    }
  }

  const user = await User.findOne({
    where: {
      userId: req.params.userId,
    },
  });

  user.points += calcPoints;

  try {
    await user.save();
  } catch (e) {
    console.log(e);
  }

  return res.send('User stats added');
};
