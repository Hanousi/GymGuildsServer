const { v4: uuidv4 } = require('uuid');
const express = require('express');
const { ddb, dbClient } = require('../dynamo');

const router = express.Router();

router.put('/', async (req, res) => {
  try {
    await dbClient.update({
      TableName: 'Challenges',
      Key: { ChallengeID: req.query.challengeID },
      UpdateExpression: 'set #participants = list_append(if_not_exists(#participants, :empty_list), :participant)',
      ExpressionAttributeNames: {
        '#participants': 'participants',
      },
      ExpressionAttributeValues: {
        ':participant': [req.body.participant],
        ':empty_list': [],
      },
    }).promise();

    res.send('Added user to challenge');
  } catch (e) {
    res.status(500).end();
    console.log(`DDB Error: ${e}`);
  }
});

/* GET challenges list. */
router.get('/', (req, res) => {
  res.send('Get challenges');
});

router.post('/', async (req, res) => {
  const item = {
    ChallengeID: uuidv4(),
    challengeName: req.body.challengeName,
    participants: req.body.participants,
    calorieGoal: req.body.calorieGoal,
    exerciseGoal: req.body.exerciseGoal,
  };

  try {
    await dbClient.put({
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
