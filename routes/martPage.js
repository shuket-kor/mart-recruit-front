var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { userInfo, martInfo, martUpdate } = require('../app/controllers/martPage.js');

// 유저 > 내정보
router.get('/userInfo', verify, userInfo);

router.get('/martInfo', verify, martInfo);

router.post('/update', verify, martUpdate);

module.exports = router;