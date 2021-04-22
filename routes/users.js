var express = require('express');
var router = express.Router();
const { login, getuser, create } = require("../app/controllers/users")

/* GET home page. */
router.get('/', function(req, res, next) {
  var title = '마트협회 구인/구직';
    res.render('index', { 
    layout: 'layouts/default',
    title: title
  });
});

router.post('/userlogin', login);

router.get('/login', function(req, res, next) {
  var title = '마트협회 구인/구직';
    res.render('login', { 
    layout: 'layouts/default',
    title: title
  });
});

router.post('/usercreate', create);

router.get('/signup', function(req, res, next) {
  var title = '마트협회 구인/구직';
    res.render('signup', { 
    layout: 'layouts/default',
    title: title
  });
});

router.get('/userlist', getuser);

router.get('/mart', function(req, res, next) {
  var title = '마트협회 구인/구직';
    res.render('mart', { 
    layout: 'layouts/default',
    title: title
  });
});

router.get('/user', function(req, res, next) {
  var title = '마트협회 구인/구직';
    res.render('user', { 
    layout: 'layouts/default',
    title: title
  });
});
router.get('/logout', function(req, res, next) {
  res.cookie("user", "");
  res.json({ logoutSuccess: "success" });
  res.redirect('/');
});

router.get('/mypage', function(req, res, next) {
  var title = '마트협회 구인/구직';
    res.render('mypage', { 
    layout: 'layouts/default',
    title: title
  });
});

// router.get('/', functionName);

module.exports = router;
