var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { list } = require('../app/controllers/recruit.js');

router.get('/list', verify, list);


module.exports = router;
