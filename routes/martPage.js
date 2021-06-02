var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { userInfo, martInfo, martUpdate, scrap, scrapDetail } = require('../app/controllers/martPage.js');

// 유저 > 내정보
router.get('/userInfo', verify, redirectLogin, userInfo);

router.get('/martInfo', verify, redirectLogin, martInfo);

router.post('/update', verify, martUpdate);

router.get('/scrap', verify, redirectLogin, scrap);

router.get('/scrapDetail', verify, scrapDetail);

module.exports = router;