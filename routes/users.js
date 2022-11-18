const express = require('express');
const { ddb } = require('../dynamo');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  const { email } = req.query;

  const item = await ddb.getItem({
    TableName: 'Users',
    Key: {
      email: {
        S: email,
      },
    },
  }).promise();

  res.send(item);
});

module.exports = router;
