var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const {  } = require('../app/controllers/resume.js');

// router.get('/', verify);

// router.get('/', verify);

module.exports = router;
