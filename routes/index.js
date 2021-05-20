var express = require('express');
var router = express.Router();

const { verify, redirectLogin } = require('../app/controllers/auth.js');
const { main, error } = require('../app/controllers/main.js');

// 
router.get('/', verify, main);

router.get('/error', error);

module.exports = router;
