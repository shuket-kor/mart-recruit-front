const logger = require('../config/logger.js');
const url = require('url');
const authService = require('../services/auth.js');

module.exports = {
  // async login(req, res, next) {
  //     var resultCode = 0; // 0: 정상 1 :로그인 에러 후
  //     if (req.query.result) {
  //       resultCode = req.query.result;
  //     }

  //     res.render('loginForm', { 
  //         layout: 'layouts/full',
  //         title : req.app.get('baseTitle') + ' 로그인',
  //         mediaPath: req.app.get('mediaPath'),
  //         resultCode: resultCode
  //       });
  // },

  // async loginProcess(req, res, next) {
  //   // 인증서버로부터 인증 정보를 받는다.
  //   const token = await authService.authorizatoin(req.body.userId, req.body.password);

  //   if (token) {
  //     res.cookie("xToken", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

  //     res.redirect("/");
  //   } else {
  //     res.redirect("/auth/login?result=1");
  //   }
  // },

    async verify(req, res, next) {
        const authData = await authService.verify(req);
        req.user = null;

        if (authData) {
        // 사용자 정보를 얻어서 보관
            let userData = {
                Seq: authData[0],
                LoginId: authData [1],
                Type: authData[2]
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

        logger.writeLog("info", `controller/auth/login: login - ${resultCode}`);

        res.render("auth/login", {
            layout: "layouts/default",
            user: req.user,
            resultCode: resultCode,
            refer: refer
        });
    },

    //  로그인 프로세스
    async loginProcess(req, res, next) {
        let userId = req.body.userid;
        let password = req.body.password;
        let refer = (req.body.refer) ? req.body.refer : '';
        // 인증서버로부터 인증 정보를 받는다.
        const loginbody = await authService.authorizatoin(userId, password);
    
        if (loginbody) {
          // 인증용 토큰 보관
            res.cookie("xToken", loginbody.data.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
            
            if (refer != '') {
                // console.log("여기서 잘못되고있음");
                // res.redirect(refer);
                res.redirect('/');
            }else 
            res.redirect('/mypage/user');
        } else {
            res.redirect(`/auth/login?refer=${refer}&result=1`);
        }    
    },

    async logout(req, res, next) {
        // 토큰 쿠키의 유효기간을 0으로 세팅
        res.cookie('xToken', {expires: 0});

        res.redirect("/");
    }
}
