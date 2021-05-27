const { logger } = require('../config/logger');
const resumeService = require('../services/resume');
const scrapService = require('../services/scrap');
const recruitService = require('../services/recruit.js');
const moment = require('moment');
module.exports = {
    
    // 유저 정보 페이지
    async userPage(req, res, next) {
        let title = '마이 페이지';
        let userSeq = req.user.Seq;
        // 사용자 정보를 포함한 이력서 정보이다
        const userInfo = await resumeService.getByUserSeq(userSeq);

        res.render('mypage/userPage', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            userInfo: userInfo,
        });
    },

    // POST 로 이력서 수정
    async userEdit(req, res, next){
        let seq = req.body.seq
        let subject = req.body.subject;
        let name = req.body.name;
        let contact = req.body.contact;
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
        let carrerCertificate = req.body.carrerCertificate;
        let introduce = req.body.introduce;
        let workingTypeSeqs = req.body.workingTypeSeqs;
        let workingTypeNames = req.body.workingTypeNames;
        let salary = req.body.salary;


        const userEdit = await resumeService.update(seq, subject, name, contact, email, gender,
            postCode, address, addressExtra, education, educcationSchool, careerSeq, technical, license,
            isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary);
        
        res.redirect('/mypage/user/resume');
    },

    async edit(req, res, next){
        let title = '마이 페이지';
        let user_seq = req.user.Seq;
        const userInfo = await resumeService.getByUserSeq(user_seq);
        let resumeSeq = userInfo.SEQ;
        // 경력이 있을때만 가져오면 됨.
        const listCareer = await resumeService.listCareer(resumeSeq);
        const workingTypeList = await recruitService.listWorkingType();

        res.render('mypage/userPageEdit', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            userInfo: userInfo,
            moment: moment,
            hostName: process.env.APIHOST,
            listCareer: listCareer,
            // careerCnt: careerCnt,
            workingTypeList: workingTypeList
        })
    },
    async createCareer(req, res, next){
        let resumeSeq = req.body.resumeSeq;
        let company = req.body.company;
        let workStart = req.body.workStart;
        let workEnd = req.body.workEnd;
        let career = req.body.career;
        let position = req.body.position;
        let jobType = req.body.jobType;
        let workRegion = req.body.workRegion;
        let charge = req.body.charge;
        let salaly = req.body.salaly;

        const returnData = await resumeService.createCareer(resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salaly);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });

    },
    
    // 이력서 수정 > 사진 업로드 모달에서 사진 업로드
    async updateImage(req, res, next){
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
    async updatecertificate(req, res, next){
        const SEQ = req.body.SEQ;
        const location = req.body.location;
        const RESUMEFILE = location + "/" + req.body.RESUMEFILE;
        const returnData = await resumeService.updatecertificate(req.cookies.xToken, SEQ, RESUMEFILE);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },
    
    async getCareer(req, res, next){
        let resumeSeq = req.query.seq;
        
        const returnData = await resumeService.getCareer(req.cookies.xToken, resumeSeq);
        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
        
    },
    async removeCareer(req, res, next){

        // let userSeq = req.user.Seq;
        let resumeSeq = req.body.resumeSeq;
        const returnData = await resumeService.removeCareer(resumeSeq);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
        
    },
    async updateCareer(req, res, next){
        let resumeSeq = req.body.resumeSeq;
        let company = req.body.company;
        let workStart = req.body.workStart;
        let workEnd = req.body.workEnd;
        let career = req.body.career;
        let position = req.body.position;
        let jobType = req.body.jobType;
        let workRegion = req.body.workRegion;
        let charge = req.body.charge;
        let salaly = req.body.salaly;
        
        const returnData = await resumeService.updateCareer(resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salaly);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },
    
    async resumegetByUserSeq(req, res, next){
        let title = '마이 페이지';
        let userSeq = req.user.Seq;
        const userInfo = await resumeService.getByUserSeq(userSeq);
        const listCareer = await resumeService.listCareer(userInfo.SEQ);

        res.render('mypage/userPageResume', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            userInfo: userInfo,
            listCareer: listCareer
        })
    },

    async scrap(req, res, next){
        let title = '마이 페이지';
        let userSeq = req.user.Seq;
        const userInfo = await resumeService.getByUserSeq(userSeq);
        const scrapList = await scrapService.scrapList(req.cookies.xToken, userSeq);

        console.log(scrapList.list);
        res.render('mypage/userPageScrap', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            userInfo: userInfo,
            list: scrapList.list
        })
    },

    // 지원현황
    async apply(req, res, next){
        let title = '마이 페이지';
        let userSeq = req.user.Seq;
        const userInfo = await resumeService.getByUserSeq(userSeq);

        res.render('mypage/userPageApply', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            userInfo: userInfo,

        })
    },

    // 지원현황
    async closeAccount(req, res, next){
        let title = '마이 페이지';
        let userSeq = req.user.Seq;
        const userInfo = await resumeService.getByUserSeq(userSeq);

        res.render('mypage/userPageCloseAccount', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            moment: moment,
            hostName: process.env.APIHOST,
            userInfo: userInfo,

        })
    },

    // 마트페이지
    async martpage(req, res, next) {
        let title = '마트 페이지';

        // let martData = await resumeService.mart(seq);

        res.render('mypage/martpage', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    }

    

};