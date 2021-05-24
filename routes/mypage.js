var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { martpage, userpage,  edit, userEdit, resumegetByUserSeq,support, bookmark, updateImage, updatecertificate} = require('../app/controllers/mypage.js');

// 유저 > 내정보
router.get('/user', verify, userpage);

// 이력서 수정
router.get('/user/edit', verify, edit);
router.post('/user/edit', verify, userEdit);

// 이미지 업데이트
router.post('/user/updateimage', updateImage)

// 증명서 업로드
router.post('/user/updatecertificate', updatecertificate)

// 한개 이력서 보기
router.get('/user/resume', verify, resumegetByUserSeq);

// 북마크
router.get('/user/bookmark', verify, bookmark);

// 지원 현황
router.get('/user/support', verify, support);

// 마트 > 내정보
router.get('/mart', verify, martpage);


module.exports = router;
