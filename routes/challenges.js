const express = require('express');

const router = express.Router();

/* GET challenges list. */
router.get('/', (req, res, next) => {
  res.send('Get challenges');
});

module.exports = router;
