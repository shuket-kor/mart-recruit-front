var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { recruit } = require('../app/controllers/mart.js');

// 유저 > 내정보
router.get('/recruit', verify, redirectLogin, recruit);

module.exports = router;
