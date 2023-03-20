const { v4: uuidv4 } = require('uuid');
const Sequelize = require('sequelize');

const { Op } = Sequelize;
const Challenge = require('../models/Challenges');
const ChallengeUser = require('../models/ChallengeUser');
const Banner = require('../models/Banner');
const Border = require('../models/Border');
const User = require('../models/User');
const PointsUser = require('../models/PointsUsers');

exports.getChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findOne({
      where: {
        challengeId: req.params.challengeId,
      },
      order: [
        [{ model: User, as: 'challengeParticipants' }, PointsUser, 'createdAt', 'ASC'],
      ],
      include: [{
        model: User,
        as: 'challengeParticipants',
        attributes: {
          include: [
            [
              // This is susceptible to cross site
              Sequelize.literal(`(
                      SELECT SUM(points)
                      FROM pointsUsers AS PointsUsers
                      WHERE
                      PointsUsers.userId = challengeParticipants.userId AND
                      PointsUsers.createdAt > (SELECT startDate FROM challenges WHERE challengeId = '${req.params.challengeId}') AND
                      PointsUsers.createdAt < (SELECT endDate FROM challenges WHERE challengeId = '${req.params.challengeId}')
                  )`),
              'challengePoints',
            ],
          ],
        },
        include: [
          {
            model: PointsUser,
            where: {
              createdAt: {
                [Op.gt]: Sequelize.literal(`(SELECT startDate FROM challenges WHERE challengeId = '${req.params.challengeId}')`),
                [Op.lt]: Sequelize.literal(`(SELECT endDate FROM challenges WHERE challengeId = '${req.params.challengeId}')`),
              },
            },
          },
          {
            model: Banner,
            as: 'chosenBanner',
          },
          {
            model: Border,
            as: 'chosenBorder',
          },
        ],
      }],
    });

    return res.send(challenge);
  } catch (e) {
    console.log(e);
    return res.send('oops');
  }
};

exports.restartChallenge = async (req, res) => {
  const challenge = await Challenge.findOne({
    where: {
      challengeId: req.params.challengeId,
    },
  });

  const newStartDate = new Date();
  const newEndDate = new Date();
  newStartDate.setUTCHours(0, 0, 0, 0);
  newEndDate.setUTCHours(0, 0, 0, 0);

  // Add a week to the date
  newEndDate.setDate(newEndDate.getDate() + 7);

  challenge.startDate = newStartDate;
  challenge.endDate = newEndDate;

  try {
    await challenge.save();
  } catch (err) {
    console.log(err);
    res.status(500);
    res.send('Something went wrong!');
  }

  res.send('Update Complete');
};

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
    startDate: new Date(),
    endDate: req.body.endDate,
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
