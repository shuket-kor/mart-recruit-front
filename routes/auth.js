var express = require('express');
var router = express.Router();

const { login, loginProcess, logout } = require('../app/controllers/auth.js');

router.get('/login', login);

router.post('/loginProcess', loginProcess);

router.get('/logout', logout);

module.exports = router;
