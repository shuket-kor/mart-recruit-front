const { logger } = require('../config/logger.js');
const resumeService = require('../services/resume.js');
const moment = require('moment');
module.exports = {
    
    // 유저 페이지
    async userpage(req, res, next) {
        let title = '마이 페이지';
        let user_seq = req.user.Seq;
        console.log(req.user.Seq);
        const get = await resumeService.get(user_seq);

        res.render('mypage/userpage', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            get: get,
            moment: moment,
            hostName: process.env.APIHOST
        });
    },
    async userCreate(req, res, next){
        
    },

    async create(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpagecreate', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },

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


    },

    async edit(req, res, next){
        let title = '마이 페이지';
        let user_seq = req.user.Seq;
        const getByUserSeq = await resumeService.get(user_seq);

        res.render('mypage/userpageresumeedit', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            get: getByUserSeq,
            moment: moment,
            hostName: process.env.APIHOST
        })
    },

    async updateImage(req, res, next){
        const SEQ = req.body.SEQ;
        const location = req.body.location;
        const RESUMEFILE = location + "/" + req.body.RESUMEFILE;
        console.log(SEQ);
        console.log(location);
        console.log(RESUMEFILE);
        const returnData = await resumeService.updateImage(req.cookies.xToken, SEQ, RESUMEFILE);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },
    async updatecertificate(req, res, next){
        const SEQ = req.body.SEQ;
        const location = req.body.location;
        const RESUMEFILE = location + "/" + req.body.RESUMEFILE;
        console.log(SEQ);
        console.log("로케이션 " +location);
        console.log("래줌 " + RESUMEFILE);
        const returnData = await resumeService.updatecertificate(req.cookies.xToken, SEQ, RESUMEFILE);

        res.json({
            result: (returnData == null) ? 'fail' : 'success',
            data: returnData
        });
    },
    

    async resumeList(req, res, next){
        let title = '마이 페이지';
        let user_seq = req.user.Seq;
        const get = await resumeService.get(user_seq);
        
        console.log(get)
        res.render('mypage/userpageresume', {
            layout: 'layouts/default',
            title: title,
            user: req.user,
            get: get,
            moment: moment,
            hostName: process.env.APIHOST
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
    async support(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpagesupport', {
            layout: 'layouts/default',
            title: title,
            user: req.user
        })
    },
    async remove(req, res, next){
        let title = '마이 페이지';

        res.render('mypage/userpageremove', {
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