const logger = require('../config/logger.js');
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
    if (!req.user) res.redirect("/auth/login");
    next();
  },

  // 유저 로그인
  async login(req, res, next) {
    var resultCode = 0; // 0: 정상 1 :로그인 에러 후
    if (req.query.result) {
        resultCode = req.query.result;
    }
    logger.writeLog("info", `controller/auth/login: login - ${resultCode}`);

    res.render("auth/login", {
        layout: "layouts/default",
        user: req.user,
        resultCode: resultCode,
    });
  },

//  로그인 프로세스
  async loginProcess(req, res, next) {
    // 인증서버로부터 인증 정보를 받는다.
    const loginbody = await authService.authorizatoin(req.body.userid, req.body.password);
    console.log(loginbody);
    if (loginbody) {
      res.cookie("xToken", loginbody.data.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      if(loginbody.data.USERTYPE == 'U'){
            res.redirect("/");
      }else if(loginbody.data.USERTYPE == 'M'){
          res.redirect("/");
      }else{
        res.redirect("/");
      }
    } else {
      res.redirect("/auth/login?result=1");
    }
  },

  async logout(req, res, next) {
    res.cookie('xToken', {expires: 0});
    res.redirect("/");
  }
}
