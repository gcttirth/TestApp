var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/demo', function(req, res, next) {
  res.send('Demo');
  console.log("Demo");
});

module.exports = router;
