const express = require('express');
const app = express();
const router = express.Router();
const { noticeList ,noticeLook } = require('../app/controllers/notice.js')



// 공지사항 리스트 페이지
router.get('/list', noticeList);

// 공지사항 자세히 보기
router.get('/view', noticeLook);


module.exports = router;