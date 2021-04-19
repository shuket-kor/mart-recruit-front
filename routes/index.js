var express = require('express');
var router = express.Router();

// const { functionName } = require('../app/controllers/controllerName.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = '마트협회 구인/구직';

    res.render('index', { 
    layout: 'layouts/default',
    title: title
  });
});

router.get('/login', function(req, res, next) {
  var title = '마트협회 구인/구직';

    res.render('login', { 
    layout: 'layouts/default',
    title: title
  });
});

router.get('/signup', function(req, res, next) {
  var title = '마트협회 구인/구직';

    res.render('signup', { 
    layout: 'layouts/default',
    title: title
  });
});
// router.get('/', functionName);

module.exports = router;
