var express = require('express');
var router = express.Router();

const { verify, redirectLogin } = require('../app/controllers/auth.js');
const { main, error, privacy, terms } = require('../app/controllers/main.js');

// 
router.get('/', verify, main);

router.get('/error', error);

router.get('/privacy', privacy);

router.get('/terms', terms);

module.exports = router;
