var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { martpage, userpage, create, edit, userCreate, userEdit, resumeList,support, bookmark, remove, updateImage} = require('../app/controllers/mypage.js');

// 유저 > 내정보
router.get('/user', verify, userpage);

// 이력서 생성 table RESUME 
router.get('/user/create', verify, create);
router.post('/user/create', verify, userCreate);

// 이력서 수정
router.get('/user/edit', verify, edit);
router.post('/user/edit', verify, userEdit);

// 이미지 업데이트
router.post('/user/updateimage', updateImage)

// 이력서 리스트
router.get('/user/resume', verify, resumeList);

// 북마크
router.get('/user/bookmark', verify, bookmark);

// 지원 현황
router.get('/user/support', verify, support);

// 북마크
router.get('/user/remove', verify, remove);
//////////////////////////////////////////////// 

// 마트 > 내정보
router.get('/mart', verify, martpage);

// 

module.exports = router;
