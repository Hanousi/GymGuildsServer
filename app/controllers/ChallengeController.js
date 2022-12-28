const { v4: uuidv4 } = require('uuid');
const Challenge = require('../models/Challenges');
const ChallengeUser = require('../models/ChallengeUser');
const User = require('../models/User');

exports.createChallenge = async (req, res) => {
  const user = await User.findOne({
    where: {
      userId: req.body.userId,
    },
  });

  if (!user) {
    res.status(404);
    return res.send('No user found with that ID');
  }

  const challengeId = uuidv4();
  const challenge = new Challenge({
    challengeId,
    challengeName: req.body.challengeName,
    calorieGoal: req.body.calorieGoal,
    exerciseGoal: req.body.exerciseGoal,
  });

  const challengeUser = new ChallengeUser({
    challengeId,
    userId: req.body.userId,
  });

  try {
    await Promise.all([challenge.save(), challengeUser.save()]);
  } catch (e) {
    console.log(e);
  }

  return res.send('Challenge Added');
};

exports.addUserToChallenge = async (req, res) => {
  const existingChallengeUser = await ChallengeUser.findOne({
    where: {
      challengeId: req.body.challengeId,
      userId: req.body.userId,
    },
  });

  if (!existingChallengeUser) {
    const challengeUser = new ChallengeUser({
      challengeId: req.body.challengeId,
      userId: req.body.userId,
    });

    try {
      await challengeUser.save();
    } catch (e) {
      console.log(e);
    }

    return res.send('User added to challenge');
  }

  res.status(400);
  return res.send('User already participating in challenge');
};
