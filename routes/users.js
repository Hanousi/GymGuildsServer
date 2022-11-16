var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const email = req.query.email;

  const response = await ddb.getItem({
    'TableName': 'Users',
    'Key': {
      'email': {
        S: email
      }
    }
  })

  res.send(response);
});

module.exports = router;