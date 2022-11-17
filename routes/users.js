const express = require('express');
const AWS = require('aws-sdk');

const router = express.Router();
const ddb = new AWS.DynamoDB();

/* GET users listing. */
router.get('/', (req, res, next) => {
  const { email } = req.query;

  ddb.getItem({
    TableName: 'Users',
    Key: {
      email: {
        S: email,
      },
    },
  }, (err, data) => {
    if (err) console.log(err, err.stack);
    else res.send(data);
  });
});

module.exports = router;
