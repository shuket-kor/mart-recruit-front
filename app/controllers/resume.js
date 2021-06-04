const moment = require('moment');
const numeral = require('numeral');
const logger = require('../config/logger.js');
const commonService = require('../services/common');
const martService = require('../services/mart');
const resumeService = require('../services/resume');
const rowCount = 10;

module.exports = {
    async list(req, res, next) {
        if (req.user.Type != 'M') res.redirect("/");
        
        const currentPage = (req.query.page) ? req.query.page : 1;
        const regions = (req.query.regions) ? req.query.regions : '';
        const jobKinds = (req.query.jobKinds) ? req.query.jobKinds : '';
        const certificate = (req.query.certificate) ? req.query.certificate : '';

        // 지역 리스트를 얻는다
        const regionList = await commonService.listWorkingRegion();
        // 업종 리스트를 얻는다
        const jobKindList = await commonService.listJobKind();

        // 페이지에 따른 리스트를 얻는다
        const returnData = await resumeService.list(req.cookies.xToken, regions, null, jobKinds, certificate, currentPage, rowCount);

        res.render('resume/list', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 이력서 열람',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            regionList: regionList,
            regions: regions,
            jobKindList: jobKindList,
            jobKinds: jobKinds,
            certificate: certificate,
            totalCount: (returnData) ? returnData.totalCount : 0,
            rowCount: rowCount,
            page: currentPage,
            list: (returnData) ? returnData.list : null
        })
    },

    async detail(req, res, next) {
        if (req.user.Type != 'M') res.redirect("/");
        let martInfo = await martService.getMartByUser(req.cookies.xToken, req.user.Seq);

        const regions = (req.query.regions) ? req.query.regions : '';
        const jobKinds = (req.query.jobKinds) ? req.query.jobKinds : '';
        const certificate = (req.query.certificate) ? req.query.certificate : '';

        const resumeSeq = req.query.seq;
        const listPage = (req.query.listPage) ? req.query.listPage : 1; // 이것은 지원자 목록 페이지의 페이지 번호이다 
        const currentPage = (req.query.page) ? req.query.page : 1; // 이것은 이력서 상세 좌측의 이력서 목록의 페이지 번호이다

        await resumeService.increaseViewCount(resumeSeq);
        // 이력서 정보를 얻는다
        const resumeInfo = await resumeService.get(req.cookies.xToken, resumeSeq);
        const listCareer = await resumeService.listCareer(req.cookies.xToken, resumeInfo.SEQ);

        // 좌측에 나타날 이력서 리스트를 얻는다
        const returnData = await resumeService.list(req.cookies.xToken, regions, null, jobKinds, certificate, currentPage, 5);
        const jobRequest = await martService.getJobRequest(req.cookies.xToken, martInfo.SEQ, resumeInfo.USER_SEQ);
        const resumeScrap = await resumeService.getScrap(req.cookies.xToken, martInfo.SEQ, resumeInfo.SEQ);

        res.render('resume/detail', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 이력서 상세 열람',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            regions: regions,
            jobKinds: jobKinds,
            certificate: certificate,
            totalCount: (returnData) ? returnData.totalCount : 0,
            list: (returnData) ? returnData.list : null,
            resumeInfo: resumeInfo,
            listCareer: listCareer,
            jobRequest: jobRequest,
            resumeScrap: resumeScrap,
            rowCount: 5,
            listPage: listPage,
            page: currentPage
        })
    },

    async scrap(req, res, next) {
        const userSeq = req.user.Seq;
        const resumeSeq = req.query.resumeSeq;
        // 마트 정보를 얻는다
        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);

        // 이력서를 스크랩한다
        let result = await resumeService.createScrap(req.cookies.xToken, martInfo.SEQ, resumeSeq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    async removeScrap(req, res, next) {
        const userSeq = req.user.Seq;
        const resumeSeq = req.query.resumeSeq;
        // 마트 정보를 얻는다
        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);

        // 스크랩한 이력서를 제거한다
        let result = await resumeService.removeScrap(req.cookies.xToken, martInfo.SEQ, resumeSeq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },
}