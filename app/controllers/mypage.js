const { logger } = require('../config/logger.js');
const resumeService = require('../services/resume.js');
const moment = require('moment');
module.exports = {
    
    // 유저 정보 페이지
    async userpage(req, res, next) {
        let title = '마이 페이지';
        let user_seq = req.user.Seq;
        const getByUserSeq = await resumeService.getByUserSeq(user_seq);

        res.render('mypage/userpage', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            get: getByUserSeq,
            moment: moment,
            hostName: process.env.APIHOST
        });
    },

    // POST 로 이력서 수정
    async userEdit(req, res, next){
        let seq = req.body.seq
        let subject = req.body.subject;
        let photo = req.body.photo;
        let name = req.body.name;
        let contact = req.body.contact;
        let email = req.body.email;
        let postCode = req.body.postCode;
        let address = req.body.address;
        let addressExtra = req.body.addressExtra;
        let education = req.body.education;
        let educcationSchool = req.body.educcationSchool;
        let carrerSeq = req.body.carrerSeq;
        let technical = req.body.technical;
        let license = req.body.license;
        let isWelfare = req.body.isWelfare;
        let isMilitaly = req.body.isMilitaly;
        let carrerCertificate = req.body.carrerCertificate;
        let introduce = req.body.introduce;
        let workingTypeSeqs = req.body.workingTypeSeqs;
        let workingTypeNames = req.body.workingTypeNames;
        let salary = req.body.salary;

        
        const userEdit = await resumeService.update(seq, subject, photo, name, contact, email,
            postCode, address, addressExtra, education, educcationSchool, carrerSeq, technical, license,
            isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary);
        
        res.redirect('/mypage/user/resume');
    },

    async edit(req, res, next){
        let title = '마이 페이지';
        let user_seq = req.user.Seq;
        const getByUserSeq = await resumeService.getByUserSeq(user_seq);
        let resumeSeq = getByUserSeq.SEQ;
        const listCareer = await resumeService.listCareer(resumeSeq);
        let careerCnt = listCareer.length;
        console.log(listCareer);
        res.render('mypage/userpageresumeedit', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            get: getByUserSeq,
            moment: moment,
            hostName: process.env.APIHOST,
            listCareer: listCareer,
            careerCnt: careerCnt
            
        })
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
    

    async resumegetByUserSeq(req, res, next){
        let title = '마이 페이지';
        let user_seq = req.user.Seq;
        const getByUserSeq = await resumeService.getByUserSeq(user_seq);
        let resumeSeq = getByUserSeq.SEQ;
        const listCareer = await resumeService.listCareer(resumeSeq);
        console.log(getByUserSeq);
        console.log(listCareer);
        res.render('mypage/userpageresume', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            get: getByUserSeq,
            moment: moment,
            hostName: process.env.APIHOST,
            listCareer: listCareer
        })
    },

    async bookmark(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpagebookmark', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },

    // 지원현황
    async support(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpagesupport', {
            layout: 'layouts/default',
            title: title,
            user: req.user
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