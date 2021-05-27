// const numeral = require('numeral');
const userService = require("../services/users.js");
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
        let bizno = req.body.bizno

        let userCreate = await userService.create(userId, password, userType, active);
        // if(userType == 'M'){
        // let seq = userCreate.insertId
        // let martCreate = await userService.martCreate(seq,bizno)
        // }

        // 로그인 화면으로 리다이렉트.
        res.redirect("../auth/login");
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
    
    // 유저 삭제
    async delete(req, res, next) {
        let seq = req.body.seq
        let userDelete = await userService.userDelete(seq);
        res.render("userdelete", {
            layout: "layouts/default",
            info: userDelete,
        });
    },

    // 사업자등록번호 조회
    async bizNoCheck(req, res, next) {
        let bodyData = req.body.bodyData
        let bizNoCheck = await userService.bizNoCheck(bodyData);
        // res.json({
        //     result: (userCheckId == null) ? 'fail' : 'success',
        //     data: bizNoCheck
        // });
        console.log(bizNoCheck)
        return bizNoCheck;
    },
    
    async index(req, res, next){
        res.render("index", {
            layout: "layouts/default",
        });
    },

    async signup(req, res, next){
        res.render("signup", {
            layout: "layouts/default",
            title: '한국마트협회 구인구직',
            user: req.user
        });
    },

    async mypage(req, res, next){
        let refer = (req.query.refer) ? req.query.refer : ''; 
        
        // 내 정보를 가져와야함.
        res.render("users/mypage", {
            layout: "layouts/default",
            title: '한국마트협회 구인구직',
            user: req.user,
            refer: refer
        });
    },
    
};
