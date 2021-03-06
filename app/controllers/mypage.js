const { logger } = require('../config/logger');
const userService = require('../services/users');
const resumeService = require('../services/resume');
const recruitService = require('../services/recruit');
const scrapService = require('../services/scrap');
const martService = require('../services/mart');
const commonService = require('../services/common');

const moment = require('moment');

module.exports = {

    // 유저 정보 페이지
    async userPage(req, res, next) {
        let title = '마트인 - 한국마트협회';
        let userSeq = req.user.Seq;
        // 사용자 정보를 포함한 이력서 정보이다
        const userInfo = await userService.get(req.cookies.xToken, userSeq);
        const resumeInfo = await resumeService.getByUserSeq(req.cookies.xToken, userSeq);
        console.log(userInfo);
        res.render('mypage/userPage', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            userInfo: userInfo,
            resumeInfo: resumeInfo,
        });
    },

    // POST 로 이력서 수정
    async userEdit(req, res, next) {
        let seq = req.body.seq
        let subject = req.body.subject;
        let name = req.body.name;
        let contact = req.body.contact;
        let birthyear = req.body.birthyear;
        let email = req.body.email;
        let gender = req.body.gender;
        let postCode = req.body.postCode;
        let address = req.body.address;
        let addressExtra = req.body.addressExtra;
        let education = req.body.education;
        let educcationSchool = req.body.educcationSchool;
        let careerSeq = req.body.careerSeq;
        let technical = req.body.technical;
        let license = req.body.license;
        let isWelfare = req.body.isWelfare;
        let isMilitaly = req.body.isMilitaly;
        let introduce = req.body.introduce;
        let workingTypeSeqs = req.body.workingTypeSeqs;
        let workingTypeNames = req.body.workingTypeNames;
        let salary = req.body.salary;


        const returnData = await resumeService.update(req.cookies.xToken, seq, subject, name, contact, birthyear, email, gender,
            postCode, address, addressExtra, education, educcationSchool, careerSeq, technical, license,
            isWelfare, isMilitaly, introduce, workingTypeSeqs, workingTypeNames, salary);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },

    async edit(req, res, next) {
        let title = '마트인 - 한국마트협회';
        let user_seq = req.user.Seq;
        // 이력서 정보
        const resumeInfo = await resumeService.getByUserSeq(req.cookies.xToken, user_seq);
        let resumeSeq = resumeInfo.SEQ;

        // 경력이 있을때만 가져오면 됨.
        const listCareer = await resumeService.listCareer(req.cookies.xToken, resumeSeq);
        // 근무 형태 리스트를 얻는다
        const workingTypeList = await commonService.listWorkingType();
        // 지역 리스트를 얻는다
        const regionList = await commonService.listWorkingRegion();
        // 업종 리스트를 얻는다
        const jobKindList = await commonService.listJobKind();

        res.render('mypage/userPageEdit', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            resumeInfo: resumeInfo,
            moment: moment,
            hostName: process.env.APIHOST,
            listCareer: listCareer,
            workingTypeList: workingTypeList,
            regionList: regionList,
            jobKindList: jobKindList
        })
    },

    // updateWorkingRegion
    async updateWorkingRegion(req, res, next) {
        let seq = req.body.seq
        let regions = req.body.regions;

        const returnData = await resumeService.updateWorkingRegion(req.cookies.xToken, seq, regions);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },

    // updateWorkingJobKind
    async updateJobKind(req, res, next) {
        let seq = req.body.seq
        let jobKinds = req.body.jobKinds;

        const returnData = await resumeService.updateJobKind(req.cookies.xToken, seq, jobKinds);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },

    // 경력 추가
    async createCareer(req, res, next) {
        let resumeSeq = req.body.resumeSeq;
        let company = req.body.company;
        let workStart = req.body.workStart;
        let workEnd = req.body.workEnd;
        let career = req.body.career;
        let position = req.body.position;
        let jobType = req.body.jobType;
        let workRegion = req.body.workRegion;
        let charge = req.body.charge;
        let salary = req.body.salary;

        const returnData = await resumeService.createCareer(req.cookies.xToken, resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salary);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });

    },

    // 이력서 수정 > 사진 업로드 모달에서 사진 업로드
    async updateImage(req, res, next) {
        const SEQ = req.body.SEQ;
        const location = req.body.location;
        const RESUMEFILE = location + "/" + req.body.RESUMEFILE;

        const returnData = await resumeService.updateImage(req.cookies.xToken, SEQ, RESUMEFILE);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },
    // 이력서 수정 > 증명서 업로드 모달에서 증명서 업로드
    async updatecertificate(req, res, next) {
        const SEQ = req.body.SEQ;
        const location = req.body.location;
        const RESUMEFILE = location + "/" + req.body.RESUMEFILE;

        const returnData = await resumeService.updatecertificate(req.cookies.xToken, SEQ, RESUMEFILE);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },

    async getCareer(req, res, next) {
        let resumeSeq = req.query.seq;

        const returnData = await resumeService.getCareer(req.cookies.xToken, resumeSeq);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });

    },

    // 경력 삭제
    async removeCareer(req, res, next) {

        let resumeSeq = req.body.resumeSeq;

        const returnData = await resumeService.removeCareer(req.cookies.xToken, resumeSeq);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });

    },

    // 경력 수정
    async updateCareer(req, res, next) {
        let resumeSeq = req.body.resumeSeq;
        let company = req.body.company;
        let workStart = req.body.workStart;
        let workEnd = req.body.workEnd;
        let career = req.body.career;
        let position = req.body.position;
        let jobType = req.body.jobType;
        let workRegion = req.body.workRegion;
        let charge = req.body.charge;
        let salary = req.body.salary;

        const returnData = await resumeService.updateCareer(req.cookies.xToken, resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salary);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },

    // 
    async resumegetByUserSeq(req, res, next) {
        let title = '마트인 - 한국마트협회';
        let userSeq = req.user.Seq;

        const resumeInfo = await resumeService.getByUserSeq(req.cookies.xToken, userSeq);
        const listCareer = await resumeService.listCareer(req.cookies.xToken, resumeInfo.SEQ);

        console.log(resumeInfo);
        res.render('mypage/userPageResume', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            resumeInfo: resumeInfo,
            listCareer: listCareer
        })
    },

    async scrap(req, res, next) {
        let title = '마트인 - 한국마트협회';
        let userSeq = req.user.Seq;

        const resumeInfo = await resumeService.getByUserSeq(req.cookies.xToken, userSeq);
        const scrapList = await scrapService.scrapList(req.cookies.xToken, userSeq);

        res.render('mypage/userPageScrap', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            resumeInfo: resumeInfo,
            list: scrapList.list
        })
    },

    // 지원현황
    async apply(req, res, next) {
        let title = '마트인 - 한국마트협회';
        let userSeq = req.user.Seq;

        const resumeInfo = await resumeService.getByUserSeq(req.cookies.xToken, userSeq);
        const applyList = await recruitService.listUserApply(req.cookies.xToken, userSeq);

        res.render('mypage/userPageApply', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            resumeInfo: resumeInfo,
            list: applyList.list
        })
    },

    // 탈퇴
    async closeAccount(req, res, next) {
        let title = '마트인 - 한국마트협회';

        const userSeq = req.user.Seq;
        const resumeInfo = await resumeService.getByUserSeq(req.cookies.xToken, userSeq);

        res.render('mypage/userPageCloseAccount', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            resumeInfo: resumeInfo,

        })
    },

    async requestedMartList(req, res, next) {
        let title = '마트인 - 한국마트협회';

        const userSeq = req.user.Seq;
        const resumeInfo = await resumeService.getByUserSeq(req.cookies.xToken, userSeq);

        let returnData = await martService.listJobRequest(req.cookies.xToken, userSeq);

        res.render('mypage/userPageRequested', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            resumeInfo: resumeInfo,
            list: (returnData) ? returnData : null,
        })
    },

    async requestedRecruitList(req, res, next) {
        let title = '마트인 - 한국마트협회';

        const martSeq = req.query.martSeq;
        const userSeq = req.user.Seq;
        const resumeInfo = await resumeService.getByUserSeq(req.cookies.xToken, userSeq);
        const martInfo = await martService.get(req.cookies.xToken, martSeq);

        let returnData = await recruitService.listByMart(req.cookies.xToken, martSeq, 'Y', 1, 50);

        res.render('mypage/userPageRecruit', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            resumeInfo: resumeInfo,
            martInfo: martInfo,
            list: (returnData) ? returnData.list : null,
        })
    }
};