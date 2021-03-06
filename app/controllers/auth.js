const logger = require('../config/logger.js');
const url = require('url');
const authService = require('../services/auth.js');
const { ConsoleTransportOptions } = require('winston/lib/winston/transports');

module.exports = {

    async verify(req, res, next) {
        const authData = await authService.verify(req);
        req.user = null;

        if (authData) {
            // 사용자 정보를 얻어서 보관
            let userData = {
                Seq: authData[0],
                LoginId: authData[1],
                Type: authData[2]
            }
            if (authData[2] == 'A') {
                res.cookie('xToken', { expires: 0 });
                res.redirect("/");
            }
            req.user = userData;
        }
        next();
    },

    async redirectLogin(req, res, next) {
        if (!req.user) {
            let loginUrl = "/auth/login?refer=" + ((req.route.path != 'login') ? req.originalUrl : '');
            res.redirect(loginUrl);
        } else
            next();
    },

    // 유저 로그인
    async login(req, res, next) {
        // 0: 정상 1 :로그인 에러 후
        let resultCode = (req.query.result) ? req.query.result : '0';
        let refer = (req.query.refer) ? req.query.refer : '';

        res.render("auth/login", {
            layout: "layouts/default",
            title: '마트인 - 한국마트협회',
            user: req.user,
            resultCode: resultCode,
            refer: refer
        });
    },

    //  로그인 프로세스
    async loginProcess(req, res, next) {
        let userId = req.body.userId;
        let password = req.body.password;
        let refer = (req.body.refer) ? req.body.refer : '';
        // 인증서버로부터 인증 정보를 받는다.
        const loginbody = await authService.authorizatoin(userId, password);

        if (loginbody) {
            // 인증용 토큰 보관
            res.cookie("xToken", loginbody.data.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            console.log(refer.indexOf(`/users/signup`));
            console.log(refer.indexOf(`/auth/login`));
            if (refer.indexOf(`/users/signup`) != -1 || refer.indexOf(`/auth/login`) != -1) {
                res.redirect('/');
            } else {
                res.redirect(refer);
            }
        } else {
            res.redirect(`/auth/login?refer=${refer}&result=1`);
        }
    },

    async logout(req, res, next) {
        // 토큰 쿠키의 유효기간을 0으로 세팅
        res.cookie('xToken', { expires: 0 });

        res.redirect("/");
    }
}
