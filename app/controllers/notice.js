const { notice } = require('../config/logger.js');
const noticeService = require('../services/notice.js');
const moment = require('moment');
const rowCount = 5;
module.exports = {
    
    // 공지사항 리스트
    async list(req, res, next) {
        
        const seq = req.query.seq;
        const currntPage = (req.query.page) ? req.query.page : 1;

        const noticeData = await noticeService.list(seq, currntPage, rowCount);
        res.render('noticelist', {
            layout: 'layouts/default',
            moment:moment,
            user: req.user,
            totalCount: noticeData.totalCount,
            rowCount: rowCount,
            page: currntPage,
            list: noticeData.list
        });
    },
    
    // 공지사항 자세히 보기
    async view(req, res, next) {

        var seq = req.query.seq;
        let noticeData = await noticeService.views(seq);

        res.redirect('list');
    }

};