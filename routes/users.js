var express = require('express');
var router = express.Router();
const { list, create, index, signup, mypage, checkid, bizNoCheck } = require("../app/controllers/users")
const { verify, redirectLogin } = require('../app/controllers/auth.js');
/* GET home page. */
// 인덱스페이지, 첫 접속화면
router.get('/', index);

// 회원가입 페이지
router.get('/signup', signup);
router.post('/usercreate', create);

// 마이페이지
router.get('/mypage',verify,  mypage);

// 로그인 페이지
// router.get('/login', login);
// router.post('/login', loginProcess);

// router.get('/logout', logout)
router.get('/userlist', list);

// 아이디 체크
router.post('/checkid', checkid);

// 사업자등록 번호 조회
router.post('/bizNoCheck', bizNoCheck);
// router.get('/', functionName);

module.exports = router;
