var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { martpage, userpage, create, edit, userCreate, userEdit, resumeList} = require('../app/controllers/mypage.js');

// 유저 > 내정보
router.get('/user', verify, userpage);

// 이력서 생성 table RESUME 
router.get('/user/create', verify, create);
router.post('/user/create', verify, userCreate);

// 이력서 수정
router.get('/user/edit', verify, edit);
router.patch('/user/edit', verify, userEdit);

// 이력서 리스트
router.get('/user/list', verify, resumeList);

// 북마크
// router.get('/user/bookmark', verify, userpage);

// 지원 현황
// router.get('/user/support', verify, userpage);

//////////////////////////////////////////////// 

// 마트 > 내정보
router.get('/mart', verify, martpage);

// 

module.exports = router;
