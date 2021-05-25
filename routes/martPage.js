var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { martInfo } = require('../app/controllers/martPage.js');

// 유저 > 내정보
router.get('/martInfo', verify, martInfo);

module.exports = router;