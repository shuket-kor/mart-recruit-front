const express = require('express');
const app = express();
const router = express.Router();
const { verify  } = require('../app/controllers/auth.js');
const { list ,view } = require('../app/controllers/notice.js')

// 공지사항 리스트 페이지
router.get('/list',verify,  list);

module.exports = router;