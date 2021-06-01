const { notice } = require('../config/logger.js');
const noticeService = require('../services/notice.js');
const moment = require('moment');
const rowCount = 3;
module.exports = {
    
    // 공지사항 리스트
    async list(req, res, next) {
        let title = req.app.get("baseTitle") + '공지사항';
        const seq = req.query.seq;
        const currntPage = (req.query.page) ? req.query.page : 1;
        
        const noticeData = await noticeService.list( seq, currntPage, rowCount);

        res.render('notice/list', {
            layout: 'layouts/default',
            moment:moment,
            user: req.user,
            title: title,
            totalCount: (noticeData) ? (noticeData.totalCount) : 0,
            rowCount: rowCount,
            page: currntPage,
            list: (noticeData) ? noticeData.list : null,
        });
    },
    


};