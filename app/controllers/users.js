// const numeral = require('numeral');
const userService = require("../services/users");
const authService = require("../services/auth");
const secretkey = require("../config/secretKey").secretKey;

module.exports = {
    // 유저 조회
    async list(req, res, next) {
        let token = req.cookies.xToken;
        let getuser = await userService.list(token, secretkey);
        // res.cookie("xToken", userInfo.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.render("userlist", {
            layout: "layouts/default",
            info: getuser,
        });
    },

    // 유저 생성
    async create(req, res, next) {
        let userId = req.body.userid
        let password = req.body.password
        let userType = req.body.usertype
        let active = req.body.active
        let bizno = req.body.bizno1 + '-' + req.body.bizno2 + '-' + req.body.bizno3;
        let martName = (req.body.martName) ? req.body.martName : "";

        let result = await userService.create(userId, password, userType, bizno, martName, active);

        if (result) {
            // 가입이 성공했다면, 로그인을 처리한다
            const loginbody = await authService.authorizatoin(userId, password);
            if (loginbody) {
                // 인증용 토큰 보관
                res.cookie("xToken", loginbody.data.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                if (userType == 'U') { 
                    res.redirect('/mypage/user');
                } else {
                    res.redirect('/martPage/userInfo');
                }
            } else {
                res.redirect("/users/signup?message=fail");
            }    
        } else {
                res.redirect("/users/signup?message=fail");
        }
        // if(userType == 'M'){
        // let seq = userCreate.insertId
        // let martCreate = await userService.martCreate(seq,bizno)
        // }

        // 로그인 화면으로 리다이렉트.
        // res.redirect("/auth/login?refer=/");
    },

    // 아이디 중복체크
    async checkid(req, res, next){
        let userId = req.body.loginid
        let userCheckId = await userService.checkid(userId);
        res.json({
            result: (userCheckId == null) ? 'fail' : 'success',
            data: userCheckId
        });
    },
    // 유저 수정
    async update(req, res, next) {
        let userId = req.body.userid
        let password = req.body.password
        let userType = req.body.usertype
        let active = req.body.active
        let seq = req.body.seq
        let userUpdate = await userService.userUpdate(userId, password, userType, active, seq);
        res.render("userupdate", {
            layout: "layouts/default",
            info: userUpdate,
        });
    },
    
    // 유저 수정
    async updatePassword(req, res, next) {
        let password = req.body.password;
        let userSeq = req.user.Seq;

        let result = await userService.updatePassword(req.cookies.xToken, userSeq, password);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // 유저 삭제
    async closeAccount(req, res, next) {
        let userSeq = req.user.Seq;

        let result = await userService.userDelete(req.cookies.xToken, userSeq);
        if (result.result == "success") {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }

    },

    // 사업자등록번호 조회
    async bizNoCheck(req, res, next) {
        let bodyData = req.body.bodyData
        let bizNoCheck = await userService.bizNoCheck(bodyData);
        // res.json({
        //     result: (userCheckId == null) ? 'fail' : 'success',
        //     data: bizNoCheck
        // });
        // console.log(bizNoCheck)
        return bizNoCheck;
    },
    
    async index(req, res, next){
        res.render("index", {
            layout: "layouts/default",
        });
    },

    async signup(req, res, next){
        let message = req.query.message;
        res.render("signup", {
            layout: "layouts/default",
            title: '한국마트협회 구인구직',
            user: req.user,
            message: message
        });
    },

    
};
