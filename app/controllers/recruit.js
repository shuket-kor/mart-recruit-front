const moment = require('moment');
const numeral = require('numeral');
const logger = require('../config/logger.js');
const commonService = require('../services/common.js');
const recruitService = require('../services/recruit.js');
const rowCount = 10;

module.exports = {
    async get(req, res, next) {
        const seq = req.query.seq;
        if (!seq) res.redirect("/recruit/list");
        const applyResult = (req.query.applyResult) ? req.query.applyResult : '';

        const regions = (req.query.regions) ? req.query.regions : '';
        const jobKinds = (req.query.jobKinds) ? req.query.jobKinds : '';
        const workingTypes = (req.query.workingTypes) ? req.query.workingTypes : '';
        const searchType = (req.query.searchType) ? req.query.searchType : ''; //m: 마트이름, r: 공고명
        const keyword = (req.query.keyword) ? req.query.keyword : '';

        // 검색된 공고의 최신 4개를 얻어온다. 관련 공고를 표시하기 위하여 사용
        const returnData_Top = await recruitService.list(req.cookies.xToken, 'Y', regions, jobKinds, workingTypes, searchType, keyword, 1, 4);
        // 공고 상세를 얻는다
        const recruitInfo = await recruitService.get(req.cookies.xToken, seq);
        // 현재 사용자가 있으면 그 사용자가 이 공고에 지원했는지, 북마크를 했는지 여부를 가져온다
        let userStatus = null;
        if (req.user && req.user.Type == "U") {
            userStatus = await recruitService.getUserStatus(req.cookies.xToken, seq, req.user.Seq);
        }

        res.render('recruit/detail', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 지역별공고',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            regions: regions,
            jobKinds: jobKinds,
            workingTypes: workingTypes,
            searchType: searchType,
            keyword: keyword,
            topList: (returnData_Top) ? returnData_Top.list : null,
            recruitInfo: (recruitInfo) ? recruitInfo : null,
            status: userStatus,
            applyResult: applyResult
        })
    },

    async list(req, res, next) {
        const currentPage = (req.query.page) ? req.query.page : 1;
        const regions = (req.query.regions) ? req.query.regions : '';
        const jobKinds = (req.query.jobKinds) ? req.query.jobKinds : '';
        const workingTypes = (req.query.workingTypes) ? req.query.workingTypes : '';
        const searchType = (req.query.searchType) ? req.query.searchType : ''; //m: 마트이름, r: 공고명
        const keyword = (req.query.keyword) ? req.query.keyword : '';
        const active = 'Y';

        // 지역 리스트를 얻는다
        const regionList = await commonService.listWorkingRegion();
        // 업종 리스트를 얻는다
        const jobKindList = await commonService.listJobKind();
        // 근무 형태 리스트를 얻는다
        const workingTypeList = await commonService.listWorkingType();
        // 최신 8개의 리스트를 따로 얻는다
        const returnData_Top = await recruitService.list(req.cookies.xToken, active, regions, jobKinds, workingTypes, searchType, keyword, 1, 8);
        // 페이지에 따른 리스트를 얻는다
        const returnData = await recruitService.list(req.cookies.xToken, active, regions, jobKinds, workingTypes, searchType, keyword, currentPage, rowCount);

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

    async recommend(req, res, next) {
        const currentPage = (req.query.page) ? req.query.page : 1;
        const regions = (req.query.regions) ? req.query.regions : '';
        const jobKinds = (req.query.jobKinds) ? req.query.jobKinds : '';
        const workingTypes = (req.query.workingTypes) ? req.query.workingTypes : '';
        const searchType = (req.query.searchType) ? req.query.searchType : ''; //m: 마트이름, r: 공고명
        const keyword = (req.query.keyword) ? req.query.keyword : '';

        // 지역 리스트를 얻는다
        const regionList = await commonService.listWorkingRegion();
        // 업종 리스트를 얻는다
        const jobKindList = await commonService.listJobKind();
        // 근무 형태 리스트를 얻는다
        const workingTypeList = await commonService.listWorkingType();


        // 로그인한 사용자의 이력서를 얻는다
        // const resumeInfo = 



        // 최신 8개의 리스트를 따로 얻는다
        const returnData_Top = await recruitService.list(req.cookies.xToken, regions, jobKinds, workingTypes, searchType, keyword, 1, 8);
        // 페이지에 따른 리스트를 얻는다
        const returnData = await recruitService.list(req.cookies.xToken, regions, jobKinds, workingTypes, searchType, keyword, currentPage, rowCount);

        res.render('recruit/recommend', {
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

    async close(req, res, next) {
        let recruitSeq = req.query.seq;

        // 구인 공고를 마감한다
        let result = await recruitService.close(req.cookies.xToken, recruitSeq);

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

    async active(req, res, next) {
        let recruitSeq = req.query.seq;

        // 구인 공고를 마감한다
        let result = await recruitService.active(req.cookies.xToken, recruitSeq);

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

    async copy(req, res, next) {
        let recruitSeq = req.query.seq;

        // 구인 공고를 복사한다
        let result = await recruitService.copy(req.cookies.xToken, recruitSeq);

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
    async apply(req, res, next) {
        let recruitSeq = req.query.seq;
        let userSeq = req.user.Seq;

        // 공고 정보가 전달되지 않았으면 리스트로 이동
        if (!recruitSeq) res.redirect("/recruit/list");
        if (req.user.Type != "U") res.redirect(`/recruit/detail?seq=${recruitSeq}&applyResult=userNotMatch`);

        // 구인 공고에 지원 처리를 한다
        let result = await recruitService.apply(req.cookies.xToken, recruitSeq, userSeq);

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

    async cancelApply(req, res, next) {
        let recruitSeq = req.query.seq;
        let userSeq = req.user.Seq;

        // 공고 정보가 전달되지 않았으면 리스트로 이동
        if (!recruitSeq) res.redirect("/recruit/list");
        if (req.user.Type != "U") res.redirect(`/recruit/detail?seq=${recruitSeq}&applyResult=userNotMatch`);

        // 구인 공고에 지원 취소 처리를 한다
        let result = await recruitService.cancelApply(req.cookies.xToken, recruitSeq, userSeq);

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

    async scrap(req, res, next) {
        let recruitSeq = req.query.seq;
        let userSeq = req.user.Seq;

        // 공고 정보가 전달되지 않았으면 리스트로 이동
        if (!recruitSeq) res.redirect("/recruit/list");
        if (req.user.Type != "U") res.redirect(`/recruit/detail?seq=${recruitSeq}&applyResult=userNotMatch`);

        // 구인 공고에 지원 처리를 한다
        let result = await recruitService.scrap(req.cookies.xToken, recruitSeq, userSeq);

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

    async cancelScrap(req, res, next) {
        let recruitSeq = req.query.seq;
        let userSeq = req.user.Seq;

        // 공고 정보가 전달되지 않았으면 리스트로 이동
        if (!recruitSeq) res.redirect("/recruit/list");
        if (req.user.Type != "U") res.redirect(`/recruit/detail?seq=${recruitSeq}&applyResult=userNotMatch`);

        // 구인 공고에 지원 취소 처리를 한다
        let result = await recruitService.cancelScrap(req.cookies.xToken, recruitSeq, userSeq);

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
    async setStep(req, res, next) {
        let recruitSeq = req.query.recruitSeq;
        let resumeSeq = req.query.resumeSeq;
        let step = req.query.step;

        // 구인 공고에 지원 처리를 한다
        let result = await recruitService.setStep(req.cookies.xToken, recruitSeq, resumeSeq, step);

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