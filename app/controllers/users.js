// const numeral = require('numeral');
const userService = require("../services/users.js");

module.exports = {
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

    async create(req, res, next) {
        const body = req.body;
        let userCreate = await userService.userCreate(body);
        // console.log("완료 이다음 렌더 해야함.");
        res.render("user", {
            layout: "layouts/default",
            info: userCreate,
        });
    },
};
