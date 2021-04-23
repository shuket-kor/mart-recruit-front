// const numeral = require('numeral');
const userService = require("../services/users.js");

module.exports = {
    // 유저 로그인
    async login(req, res, next) {
        const body = req.body;
        let userInfo = await userService.login(body);
        // console.log(userInfo.token);
        res.cookie("xToken", userInfo.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.render("user", {
            layout: "layouts/default",
            info: userInfo,
        });
    },
    
    // 유저 조회
    async getuser(req, res, next) {
        // const body = req.body;
        let token = req.cookies.xToken;
        console.log("token ? ? " + token);
        let getuser = await userService.getuser(token);
        // console.log(userInfo.token);
        // res.cookie("xToken", userInfo.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.render("userlist", {
            layout: "layouts/default",
            info: getuser,
        });
    },

    // 유저 생성
    async create(req, res, next) {
        const body = req.body;
        let userCreate = await userService.userCreate(body);
        // console.log("완료 이다음 렌더 해야함.");
        res.render("user", {
            layout: "layouts/default",
            info: userCreate,
        });
    },

    // 유저 수정
    async update(req, res, next) {
        const body = req.body;
        let userUpdate = await userService.userUpdate(body);
        // console.log("완료 이다음 렌더 해야함.");
        res.render("userupdate", {
            layout: "layouts/default",
            info: userUpdate,
        });
    },
    
    // 유저 삭제
    async delete(req, res, next) {
        const body = req.body;
        let userDelete = await userService.userDelete(body);
        // console.log("완료 이다음 렌더 해야함.");
        res.render("userdelete", {
            layout: "layouts/default",
            info: userDelete,
        });
    },
};
