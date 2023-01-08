const Sequelize = require('sequelize');

const { Op } = require('sequelize');
const Challenge = require('../models/Challenges');
const User = require('../models/User');

exports.searchFriendsAndChallenges = async (req, res) => {
  const userResults = await User.findAll({
    where: {
      fullName: {
        [Op.like]: `%${req.params.input}%`,
      },
    },
  });

  const challengeResults = await Challenge.findAll({
    where: {
      challengeName: {
        [Op.like]: `%${req.params.input}%`,
      },
    },
  });

  const result = {
    userResults,
    challengeResults,
  };

  return res.send(result);
};

exports.searchByLocation = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        userId: req.params.userId,
      },
    });

    user.location = Sequelize.fn('ST_GeomFromText', `Point(${req.query.longitude} ${req.query.latitude})`, 4269);

    try {
      await user.save();
    } catch (e) {
      console.log(e);
      res.status(500);
      return res.send('Something went wrong');
    }
  } catch (e) {
    console.log(e);
    res.status(404);
    return res.send('User not found');
  }

  try {
    const results = await User.findAll({
      where: {
        [Op.not]: {
          userId: req.params.userId,
        },
        $and: Sequelize.where(
          Sequelize.fn(
            'ST_Distance',
            Sequelize.fn('ST_GeomFromText', `Point(${req.query.longitude} ${req.query.latitude})`, 4269),
            Sequelize.col('location'),
            'metre',
          ),
          Op.lt,
          3000, // 3km range
        ),
      },
    });

    return res.send(results);
  } catch (e) {
    console.log(e);
    res.status(500);
    return res.send('Something went wrong');
  }
};
