var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { get, list, recommend, apply, cancelApply, scrap, cancelScrap, close, active, copy, setStep } = require('../app/controllers/recruit.js');

router.get('/list', verify, list);

router.get('/recommend', verify, redirectLogin, recommend);

router.get('/detail', verify, get);

router.get('/apply', verify, redirectLogin, apply);

router.get('/cancelApply', verify, redirectLogin, cancelApply);

router.get('/scrap', verify, redirectLogin, scrap);

router.get('/cancelScrap', verify, redirectLogin, cancelScrap);

router.get('/close', verify, redirectLogin, close);

router.get('/active', verify, redirectLogin, active);

router.get('/copy', verify, redirectLogin, copy);

router.get('/setStep', verify, redirectLogin, setStep);

module.exports = router;
