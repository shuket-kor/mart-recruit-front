const noticeService = require('../services/notice.js');

module.exports = {
    
    // 공지사항 리스트
    async noticeList(req, res, next) {
        var title = '공지사항';
        //const body = req.body;
        let list = await noticeService.list();

        res.render('noticelist', {
            layout: 'layouts/default',
            title: title,
            data: list
        })
    }





};