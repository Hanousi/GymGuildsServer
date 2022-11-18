const express = require('express');
const { ddb } = require('../dynamo');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
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
