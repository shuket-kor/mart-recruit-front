const moment = require('moment');
const numeral = require('numeral');
const logger = require('../config/logger.js');
const recruitService = require('../services/recruit.js');
const rowCount = 5;

module.exports = {
    async listRegion(req, res, next) {
        const currentPage = (req.query.page) ? req.query.page : 1;
        const regions = (req.query.regions) ? req.query.regions : '';
        const name = (req.query.name) ? req.query.name : '';

        // 지역 리스트를 얻는다
        const regionList = await recruitService.getWorkingRegion();
        const returnData = await recruitService.list(req.cookies.xToken, regions, name, currentPage, rowCount);

        res.render('recruit/region', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 지역별공고',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            regionList: regionList,
            regions: regions,
            name: name,
            totalCount: (returnData) ? returnData.totalCount : 0,
            rowCount: rowCount,
            page: currentPage,
            list: (returnData) ? returnData.list : null
        })
    },

    async listJobType(req, res, next) {
        res.render('recruit/jobType', {
            layout: 'layouts/default',
            title: '직종별공고',
            user: req.user,
            list: null
        })
    }
}