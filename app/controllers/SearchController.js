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
