const moment = require('moment');
const numeral = require('numeral');
const logger = require('../config/logger.js');
const recruitService = require('../services/recruit.js');
const rowCount = 10;

module.exports = {
    async list(req, res, next) {
        const currentPage = (req.query.page) ? req.query.page : 1;
        const regions = (req.query.regions) ? req.query.regions : '';
        const jobKinds = (req.query.jobKinds) ? req.query.jobKinds : '';
        const workingTypes = (req.query.workingTypes) ? req.query.workingTypes : '';
        const searchType = (req.query.searchType) ? req.query.searchType : ''; //m: 마트이름, r: 공고명
        const keyword = (req.query.keyword) ? req.query.keyword : '';

        // 지역 리스트를 얻는다
        const regionList = await recruitService.listWorkingRegion();
        // 업종 리스트를 얻는다
        const jobKindList = await recruitService.listJobKind();
        // 근무 형태 리스트를 얻는다
        const workingTypeList = await recruitService.listWorkingType();
        // 최신 8개의 리스트를 따로 얻는다
        const returnData_Top = await recruitService.list(req.cookies.xToken, regions, jobKinds, workingTypes, searchType, keyword, 1, 8);
        // 페이지에 따른 리스트를 얻는다
        const returnData = await recruitService.list(req.cookies.xToken, regions, jobKinds, workingTypes, searchType, keyword, currentPage, rowCount);

        res.render('recruit/list', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 지역별공고',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            regionList: regionList,
            regions: regions,
            jobKindList: jobKindList,
            jobKinds: jobKinds,
            workingTypeList: workingTypeList,
            workingTypes: workingTypes,
            searchType: searchType,
            keyword: keyword,
            topList: (returnData_Top) ? returnData_Top.list : null,
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