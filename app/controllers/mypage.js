const { logger } = require('../config/logger.js');
const mypageService = require('../services/mypage.js');
module.exports = {
    
    // 유저 페이지
    async userpage(req, res, next) {
        let title = '마이 페이지';
        
        // const userData = await mypageService.user();

        res.render('mypage/userpage', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        });
    },
    async userCreate(req, res, next){
        
    },

    async create(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpagecreate', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },

    async userEdit(req, res, next){
        
    },

    async edit(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpageresumeedit', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },
    
    
    async resumeList(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpageresume', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },

    async bookmark(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpagebookmark', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },
    async support(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpagesupport', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },
    async remove(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpageremove', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },
    // 마트페이지
    async martpage(req, res, next) {
        let title = '마트 페이지';

        // let martData = await mypageService.mart(seq);

        res.render('mypage/martpage', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    }

};