var express = require('express');
var router = express.Router();

// const { functionName } = require('../app/controllers/controllerName.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/', functionName);

module.exports = router;
