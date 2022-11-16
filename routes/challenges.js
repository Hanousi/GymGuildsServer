var express = require('express');
var router = express.Router();

/* GET challenges list. */
router.get('/', function(req, res, next) {
  res.send('Get challenges');
});

module.exports = router;