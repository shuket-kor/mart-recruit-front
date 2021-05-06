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
      const userSeq = await authService.verify(req);
      console.log(userSeq);
      if (userSeq) {
        // 사용자 정보를 얻어서 보관
        req.userSeq = userSeq[0];
        next();
      }        
      else
        res.redirect("/users/login");
    },

    async logout(req, res, next) {
      res.cookie('xToken', {expires: 0});

      res.redirect("/");
    }
}
