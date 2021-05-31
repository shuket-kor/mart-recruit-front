var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { list, detail, scrap, removeScrap } = require('../app/controllers/resume.js');

router.get('/list', verify, redirectLogin, list);

router.get('/detail', verify, redirectLogin, detail);

router.get('/scrap', verify, scrap);

router.get('/removeScrap', verify, removeScrap);

module.exports = router;
