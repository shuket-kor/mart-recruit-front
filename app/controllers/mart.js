const moment = require('moment');
const numeral = require('numeral');
const logger = require('../config/logger.js');
const martService = require('../services/mart.js');
const recruitService = require('../services/recruit.js');
const rowCount = 10;

module.exports = {
    async recruit(req, res, next) {
        // 사용자 정보로부터 마트 정보를 얻는다
        const userSeq = req.user.Seq;
        const currentPage = (req.query.page) ? req.query.page : 1;
        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);
        if (!martInfo) res.redirect("/error?message=NoMartInfo")
        // 마트의 공고 진행 카운트를 얻는다
        let activeInfo = await martService.getActiveCount(req.cookies.xToken, martInfo.SEQ);
        // 마트의 공고 목록을 얻는다
        let recruitList = await recruitService.listByMart(req.cookies.xToken, martInfo.SEQ, currentPage, rowCount);

        // console.log(recruitList);

        res.render('mart/recruit', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 지원자 채용',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            martInfo: martInfo,
            activeInfo: activeInfo,
            totalCount: recruitList.totalCount,
            rowCount: rowCount,
            page: currentPage,
            list: recruitList.list
        })
    }
}