var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { recruitList, recruitCreate, recruitEdit, recruitProcess, recruitResume } = require('../app/controllers/mart.js');

// 지원자 채용
router.get('/recruit', verify, redirectLogin, recruitList);

// 공고 추가
router.get('/recruitCreate', verify, redirectLogin, recruitCreate);

// 공고 수정
router.get('/recruitEdit', verify, redirectLogin, recruitEdit);

// 공고 추가/수정 처리
router.post('/recruitProcess', verify, redirectLogin, recruitProcess);

// 공고에 지원한 지원자 관리
router.get('/recruitResume', verify, redirectLogin, recruitResume);

module.exports = router;
