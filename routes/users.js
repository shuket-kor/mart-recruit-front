var express = require('express');
var router = express.Router();
const { login, list, create, index, signup, mypage, signin, logout } = require("../app/controllers/users")

/* GET home page. */
// 인덱스페이지, 첫 접속화면
router.get('/', index);

// 회원가입 페이지
router.get('/signup', signup);
router.post('/usercreate', create);

// 마이페이지
router.get('/mypage', mypage);

router.get('/login', signin);
router.post('/userlogin', login);

router.get('/logout', logout)
router.get('/userlist', list);


// router.get('/', functionName);

module.exports = router;
