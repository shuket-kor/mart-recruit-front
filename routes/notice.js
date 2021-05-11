const express = require('express');
const app = express();
const router = express.Router();
const { list ,view } = require('../app/controllers/notice.js')
const { verify  } = require('../app/controllers/auth.js');


// 공지사항 리스트 페이지
router.get('/list', verify, list);

// 공지사항 자세히 보기
router.get('/view', view);


module.exports = router;