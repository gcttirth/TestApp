var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express v2' });
  next();
},
  function(req,res,next) {
    console.log("Hi from function #2");
  }
  );

module.exports = router;
