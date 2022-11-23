const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { ddb } = require('../dynamo');

const router = express.Router();

/* GET challenges list. */
router.get('/', (req, res) => {
  res.send('Get challenges');
});

router.post('/', async (req, res) => {
  const item = {
    ChallengeID: { S: uuidv4() },
    challengeName: { S: req.body.challengeName },
    participants: { SS: req.body.participants },
    calorieGoal: { N: req.body.calorieGoal },
    exerciseGoal: { N: req.body.exerciseGoal },
  };

  try {
    await ddb.putItem({
      TableName: 'Challenges',
      Item: item,
      Expected: { ChallengeID: { Exists: false } },
    }).promise();

    res.send('Challenge posted');
  } catch (e) {
    let returnStatus = 500;

    if (e.code === 'ConditionalCheckFailedException') {
      returnStatus = 409;
    }

    res.status(returnStatus).end();
    console.log(`DDB Error: ${e}`);
  }
});

module.exports = router;
