const { logger } = require('../config/logger');
const martService = require('../services/mart');
const userService = require('../services/users');

const resumeService = require('../services/resume');
const recruitService = require('../services/recruit');
const scrapService = require('../services/scrap');
const moment = require('moment');

module.exports = {
    async martInfo(req, res, next) {
        let title = '마트 페이지';
        let userSeq = req.user.Seq;

        let userInfo = await userService.get(req.cookies.xToken, userSeq);
        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);

        res.render('martPage/mart', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            userInfo: userInfo,
            martInfo: martInfo,
        });
    },

}
