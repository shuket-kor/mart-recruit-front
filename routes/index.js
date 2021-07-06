var express = require('express');
var router = express.Router();

const { verify, redirectLogin } = require('../app/controllers/auth.js');
const { main, error, privacy, terms, intro } = require('../app/controllers/main.js');

// 
router.get('/', verify, main);

router.get('/error', error);

router.get('/privacy', privacy);

router.get('/terms', terms);

router.get('/intro', intro);

module.exports = router;
