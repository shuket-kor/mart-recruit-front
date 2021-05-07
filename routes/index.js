var express = require('express');
var router = express.Router();

const { verify, redirectLogin } = require('../app/controllers/auth.js');
const { main } = require('../app/controllers/main.js');

// 
router.get('/', verify, main);

module.exports = router;
