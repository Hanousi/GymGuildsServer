const Challenge = require('../models/Challenges');

exports.createChallenge = async (req, res) => {
  console.log(req.body);

  const challenge = new Challenge({
    challengeName: req.body.challengeName,
    calorieGoal: req.body.calorieGoal,
    exerciseGoal: req.body.exerciseGoal,
  });

  try {
    await challenge.save();
  } catch (e) {
    console.log(e);
  }

  res.send('Challenge Added');
};
