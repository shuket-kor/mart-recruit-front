const moment = require('moment');
const numeral = require('numeral');
const { ConsoleTransportOptions } = require('winston/lib/winston/transports');
const logger = require('../config/logger.js');
const commonService = require('../services/common.js');
const martService = require('../services/mart.js');
const recruitService = require('../services/recruit.js');
const resumeService = require('../services/resume.js');
let rowCount = 10;

module.exports = {
    async recruitList(req, res, next) {
        // 사용자 정보로부터 마트 정보를 얻는다
        const userSeq = req.user.Seq;
        const currentPage = (req.query.page) ? req.query.page : 1;
        const active = (req.query.active) ? req.query.active : '';
        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);
        if (!martInfo) res.redirect("/error?message=NoMartInfo")
        // 마트의 공고 진행 카운트를 얻는다
        let activeInfo = await recruitService.getActiveCount(req.cookies.xToken, martInfo.SEQ);
        // 마트의 공고 목록을 얻는다
        let recruitList = await recruitService.listByMart(req.cookies.xToken, martInfo.SEQ, active, currentPage, rowCount);

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
            active: active,
            totalCount: recruitList.totalCount,
            rowCount: rowCount,
            page: currentPage,
            list: recruitList.list
        })
    },

    async recruitCreate(req, res, next) {
        // 사용자 정보로부터 마트 정보를 얻는다
        const userSeq = req.user.Seq;
        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);
        if (!martInfo) res.redirect("/error?message=NoMartInfo")

        // 기초 정보를 얻는다
        let jobKindList = await commonService.listJobKind();
        let regionList = await commonService.listWorkingRegion();
        let workingTypeList = await commonService.listWorkingType();

        // 마트의 공고  정보를 얻는다
        let recruitInfo = null;

        res.render('mart/recruitEdit', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 지원자 채용',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            workType: 'create',
            martInfo: martInfo,
            page: 1,
            jobKindList: jobKindList,
            workingTypeList: workingTypeList,
            regionList: regionList,
            recruitInfo: recruitInfo
        })
    },
    
    async recruitEdit(req, res, next) {
        const recruitSeq = req.query.seq;
        // 사용자 정보로부터 마트 정보를 얻는다
        const userSeq = req.user.Seq;
        const currentPage = (req.query.page) ? req.query.page : 1;
        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);
        if (!martInfo) res.redirect("/error?message=NoMartInfo")

        // 기초 정보를 얻는다
        let jobKindList = await commonService.listJobKind();
        let regionList = await commonService.listWorkingRegion();
        let workingTypeList = await commonService.listWorkingType();

        // 공고 정보를 얻는다
        let recruitInfo = await recruitService.get(req.cookies.xToken, recruitSeq);

        res.render('mart/recruitEdit', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 지원자 채용',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            workType: 'edit',
            martInfo: martInfo,
            page: currentPage,
            jobKindList: jobKindList,
            workingTypeList: workingTypeList,
            regionList: regionList,
            recruitInfo: recruitInfo
        })
    },
    // 추가 또는 변경을 처리
    async recruitProcess(req, res, next) {
        const workType = req.body.workType;
        const MART_SEQ = req.body.MART_SEQ;
        const SEQ = req.body.SEQ;
        const HRONAME = req.body.HRONAME;
        const HROCONTACT = req.body.HROCONTACT;
        const HROEMAIL = req.body.HROEMAIL;
        const SUBJECT = req.body.SUBJECT;
        const CAREER_SEQ = req.body.CAREER;
        const CHARGE = req.body.CHARGE;
        const PREFERENTIAL = req.body.PREFERENTIAL;
        const EDUCATION = req.body.EDUCATION;
        const SALARYTYPE = req.body.SALARYTYPE;
        const SALARY = (SALARYTYPE == "연봉") ? req.body.SALARY_YEAR :  req.body.SALARY_OTHER;
        const PROBATIONTERM = req.body.PROBATIONTERM;
        const WORKSHIFT = req.body.WORKSHIFT;
        const WORKSHIFTTIME = req.body.WORKSHIFTTIME;
        const GENDER = req.body.GENDER;
        const AGE = req.body.AGE;
        const STARTDATE = req.body.STARTDATE;
        const ENDDATE = req.body.ENDDATE;
        const HIRINGSTEP = req.body.HIRINGSTEP;
        const REQUIREDOCS = req.body.REQUIREDOCS;
        const CONTENT = req.body.CONTENT;
        const JOBKIND = (Array.isArray(req.body.JOBKIND)) ? req.body.JOBKIND.join() : req.body.JOBKIND;
        let JOBRANK = '';
        if (req.body.JOBRANK && Array.isArray(req.body.JOBRANK)) {
            req.body.JOBRANK.forEach(item => {
                JOBRANK += "'" + item + "',";
            });
            if (JOBRANK.length > 0) JOBRANK = JOBRANK.substring(0, JOBRANK.length - 1);
        } else {
            JOBRANK = "'" + req.body.JOBRANK + "'";
        }
        const WORKINGTYPE = (Array.isArray(req.body.WORKINGTYPE)) ? req.body.WORKINGTYPE.join() : req.body.WORKINGTYPE;
        const WORKREGION = (Array.isArray(req.body.WORKREGION)) ? req.body.WORKREGION.join() : req.body.WORKREGION;
        const ACTIVE = req.body.ACTIVE;

        let result = null;

        if (workType == "CREATE") {
            result = await recruitService.create(req.cookies.xToken, MART_SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
                PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
                GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION);
        } else {
            result = await recruitService.update(req.cookies.xToken, SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
                PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
                GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION, ACTIVE);
        }
        if (result) res.redirect(`/mart/recruitEdit?seq=${result}`);
    },

    async recruitResume(req, res, next) {
        const recruitSeq = req.query.seq;
        const currentPage = (req.query.page) ? req.query.page : 1;
        const step = req.query.step;

        // 공고 정보를 얻는다
        let recruitInfo = await recruitService.get(req.cookies.xToken, recruitSeq);
        if (!recruitInfo) res.redirect("/");
         // 공고의 지원 카운트를 얻는다
         let activeInfo = await recruitService.getResumeCount(req.cookies.xToken, recruitSeq);
         // 공고 정보로부터 마트 정보를 얻는다
        let martInfo = await martService.get(req.cookies.xToken, recruitInfo.MART_SEQ);
        // 공고에 지원한 지원자 목록을 얻는다
        let resumeList = await resumeService.listForRecruit(req.cookies.xToken, recruitInfo.SEQ, step);

        res.render('mart/recruitResume', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 지원자 채용',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            martInfo: martInfo,
            recruitInfo: recruitInfo,
            activeInfo: activeInfo,
            step: step,
            totalCount: resumeList.totalCount,
            list: resumeList.list,
            rowCount: rowCount,
            page: currentPage
        })
    },

    async recruitResumeView(req, res, next) {
        const recruitSeq = req.query.recruitSeq;
        const resumeSeq = req.query.resumeSeq;
        const listPage = (req.query.listPage) ? req.query.listPage : 1; // 이것은 지원자 목록 페이지의 페이지 번호이다 
        const currentPage = (req.query.page) ? req.query.page : 1; // 이것은 이력서 상세 좌측의 이력서 목록의 페이지 번호이다
        const step = req.query.step;

        await resumeService.increaseViewCount(resumeSeq);
        await recruitService.setRead(req.cookies.xToken, recruitSeq, resumeSeq);
        // 이력서 정보를 얻는다
        const resumeInfo = await resumeService.get(resumeSeq);
        const listCareer = await resumeService.listCareer(resumeInfo.SEQ);
        const applyInfo = await recruitService.getApply(req.cookies.xToken, recruitSeq, resumeSeq);
        if (applyInfo) applyInfo.STEPNAME = recruitService.applyStatus(applyInfo.STEP);
        // 공고 정보를 얻는다
        let recruitInfo = await recruitService.get(req.cookies.xToken, recruitSeq);
        if (!recruitInfo) res.redirect("/");
         // 공고 정보로부터 마트 정보를 얻는다
        let martInfo = await martService.get(req.cookies.xToken, recruitInfo.MART_SEQ);
        // 공고에 지원한 지원자 목록을 얻는다
        let resumeList = await resumeService.listForRecruit(req.cookies.xToken, recruitInfo.SEQ, step);
        rowCount = 5;

        res.render('mart/recruitResumeView', {
            layout: 'layouts/default',
            title: req.app.get('baseTitle') + ' 지원자 채용',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            martInfo: martInfo,
            recruitInfo: recruitInfo,
            totalCount: resumeList.totalCount,
            list: resumeList.list,
            resumeInfo: resumeInfo,
            listCareer: listCareer,
            applyInfo: applyInfo,
            step: step,
            rowCount: rowCount,
            listPage: listPage,
            page: currentPage
        })
    },

    async updateLogo(req, res, next) {
        const SEQ = req.body.SEQ;
        const location = req.body.location;
        const LOGOFILE = location + "/" + req.body.LOGOFILE;
        
        const returnData = await martService.updateLogo(req.cookies.xToken, SEQ, LOGOFILE);
        
        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },

    async resumeList(req, res, next) {
        const userSeq = req.user.Seq;
       
    },

    async createJobRequest(req, res, next) {
        const userSeq = req.user.Seq;
        const martSeq = req.query.martSeq;
        const targetUserSeq = req.query.userSeq;

        let martInfo = await martService.getMartByUser(req.cookies.xToken, userSeq);
       
        const returnData = await martService.createJobRequest(req.cookies.xToken, martInfo.SEQ, targetUserSeq);
        
        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },
}