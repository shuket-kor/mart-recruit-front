var express = require('express');
var router = express.Router();

const { verify, redirectLogin } = require('../app/controllers/auth.js');
const { listRegion } = require('../app/controllers/recruit.js');

router.get('/listRegion', verify, redirectLogin, listRegion);

module.exports = router;
