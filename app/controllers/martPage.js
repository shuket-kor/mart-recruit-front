const { logger } = require('../config/logger');
const martService = require('../services/mart');
const userService = require('../services/users');
const moment = require('moment');

module.exports = {
    async userInfo(req, res, next) {
        let title = '마트 페이지';
        let userSeq = req.user.Seq;

        let userInfo = await userService.get(req.cookies.xToken, userSeq);
        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);

        res.render('martPage/userInfo', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            userInfo: userInfo,
            martInfo: martInfo,
        });
    },

    async martInfo(req, res, next) {
        let title = '마트 페이지';
        let userSeq = req.user.Seq;
        let message = (req.query.message) ? req.query.message : '';

        let userInfo = await userService.get(req.cookies.xToken, userSeq);
        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);        

        res.render('martPage/martInfo', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            userInfo: userInfo,
            martInfo: martInfo,
            message: message,
        });
    },

    async martUpdate(req, res, next) {
        const SEQ = req.body.SEQ;
        const NAME = req.body.NAME;
        const REGNO = `${req.body.REGNO1}-${req.body.REGNO2}-${req.body.REGNO3}`;
        const POSTCODE = req.body.POSTCODE;
        const ADDRESS = req.body.ADDRESS;
        const ADDRESSEXTRA = req.body.ADDRESSEXTRA;
        const CONTACT = req.body.CONTACT;
        const HRONAME = req.body.HRONAME;
        const HROCONTACT = req.body.HROCONTACT;
        const HRORANK = req.body.HRORANK;
        
        const returnData = await martService.update(req.cookies.xToken, SEQ, NAME, REGNO, POSTCODE, ADDRESS, ADDRESSEXTRA, CONTACT, HRONAME, HROCONTACT, HRORANK);

        if (returnData) {
            if (returnData.result == 'success') {
                res.redirect("/martPage/martInfo?message=0");
            } else {
                res.redirect("/martPage/martInfo?message=1");
            }
        } else {
            res.redirect("/martPage/martInfo?message=2");
        }        
    }
}
