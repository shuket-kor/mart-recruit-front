const { logger } = require('../config/logger.js');
const mypageService = require('../services/mypage.js');
module.exports = {
    
    // 유저 페이지
    async userpage(req, res, next) {
        let title = '유저 페이지';
        
        // const userData = await mypageService.user();

        res.render('mypage/userpage', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        });
    },
    async userCreate(req, res, next){
        
    },

    async userEdit(req, res, next){

    },
    async create(req, res, next){
        let title = '이력서 생성';
        
        res.render('mypage/userpagecreate', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },
    async edit(req, res, next){

    },
    async resumeList(req, res, next){

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