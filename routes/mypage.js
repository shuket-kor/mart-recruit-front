var express = require('express');
var router = express.Router();

const { verify, redirectLogin, checkPermission } = require('../app/controllers/auth.js');
const { martpage, userPage,  edit, userEdit, resumegetByUserSeq, apply, scrap, closeAccount,
     updateImage, updatecertificate, removeCareer, updateCareer, createCareer, getCareer,
     updateWorkingRegion, updateJobKind} = require('../app/controllers/mypage.js');

// 유저 > 내정보
router.get('/user', verify, userPage);

// 이력서 수정
router.get('/user/edit', verify, edit);
router.post('/user/edit', verify, userEdit);

// 이미지 업데이트
router.post('/user/updateimage', verify, updateImage)

// 증명서 업로드
router.post('/user/updatecertificate', verify, updatecertificate)

// 한개 이력서 보기
router.get('/user/resume', verify, resumegetByUserSeq);

// 북마크
router.get('/user/scrap', verify, scrap);

// 지원 현황
router.get('/user/apply', verify, apply);

// 지원 현황
router.get('/user/closeAccount', verify, closeAccount);

// 경력 삭제
router.post('/user/removeCareer', verify, removeCareer)

// 경력 한개 가져오기
router.get('/user/getCareer', verify, getCareer)

// 경력 수정
router.post('/user/updateCareer', verify, updateCareer)

// 근무위치 수정
router.post('/user/updateWorkingRegion', verify, updateWorkingRegion)

// 직종 수정
router.post('/user/updateJobKind', verify, updateJobKind)

// 증명서 업로드
router.post('/user/createCareer', verify, createCareer)

// 마트 > 내정보
router.get('/mart', verify, martpage);


module.exports = router;
