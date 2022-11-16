var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const email = req.query.email;

  ddb.getItem({
    'TableName': 'Users',
    'Key': {
      'email': {
        S: email
      }
    }
  }, function(err, data) {
  if (err) console.log(err, err.stack);
  else     res.send(data);          
})

  res.send('Get users');
});

module.exports = router;