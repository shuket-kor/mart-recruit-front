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
        let userCreate = await userService.create(userId, password, userType, active);
        // 유저 화면으로 리다이렉트.
        res.redirect("/login");
    },

    // 아이디 중복체크
    async checkid(req, res, next){
        let userId = req.body.loginid
        let userCheckId = await userService.checkid(userId);
        res.json({
            result: (userCheckId == null) ? 'fail' : 'success',
            data: userCheckId
        });
        // res.redirect('/signup');
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
    
    async index(req, res, next){
        res.render("index", {
            layout: "layouts/default",
        });
    },

    async signup(req, res, next){
        res.render("signup", {
            layout: "layouts/default",
            user: req.user,
        });
    },

    async mypage(req, res, next){
        res.render("mypage", {
            layout: "layouts/default",
        });
    },
    
};
