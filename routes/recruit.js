var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { listRegion, listJobType } = require('../app/controllers/recruit.js');

router.get('/listRegion', verify, listRegion);

router.get('/listJobType', verify, listJobType);

module.exports = router;
