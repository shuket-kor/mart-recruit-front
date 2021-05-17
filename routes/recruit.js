var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { get, list, recommend, apply, cancelApply, scrap, cancelScrap } = require('../app/controllers/recruit.js');

router.get('/list', verify, list);

router.get('/recommend', verify, redirectLogin, recommend);

router.get('/detail', verify, get);

router.get('/apply', verify, redirectLogin, apply);

router.get('/cancelApply', verify, redirectLogin, cancelApply);

router.get('/scrap', verify, redirectLogin, scrap);

router.get('/cancelScrap', verify, redirectLogin, cancelScrap);

module.exports = router;
