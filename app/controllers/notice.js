const { notice } = require('../config/logger.js');
const noticeService = require('../services/notice.js');
const rowCount = 5;
module.exports = {
    
    // 공지사항 리스트
    async noticeList(req, res, next) {
        const currntPage = (req.query.page) ? req.query.page : 1;

        const noticeData = await noticeService.list(currntPage, rowCount);
        res.render('noticelist', {
            layout: 'layouts/default',
            totalCount: noticeData.totalCount,
            rowCount: rowCount,
            page: currntPage,
            list: noticeData.list
        });
    },
    
    // 공지사항 자세히 보기
    async noticeLook(req, res, next) {
        var title = '공지사항';
        //const body = req.query.seq;
        var seq = req.query.seq;

        let noticeData = await noticeService.views(seq);

        res.render('noticeview', {
            layout: 'layouts/default',
            title: title,
            //rowCount: rowCount,
            data: noticeData
        })
    }

};