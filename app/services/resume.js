const logger = require('../config/logger.js');
const secretKey = require('../config/secretKey').secretKey;
const got = require("got");

module.exports = class resumeService {
    static async get(user_seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/getByUserSeq`;
            const { body } = await got.post(apiURL, { json: { seq: user_seq },responseType: "json" });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/resumeService/getByUserSeq: ${body.result}`);
                return body.data;
            }
        } catch (error) {
            logger.writeLog("error", `services/resumeService/getByUserSeq: ${error}`);
            return null;
        }
    }
    static async update(seq, subject, photo, name, contact, email,
        postCode, address, addressExtra, education, educcationSchool, carrerSeq, technical, license,
        isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary){
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/update`;
            const { body } = await got.post(apiURL, {
                json: { 
                    seq: seq,
                    subject: subject,
                    photo: photo,
                    name: name,
                    contact: contact,
                    email: email,
                    postCode: postCode,
                    address: address,
                    addressExtra: addressExtra,
                    education: education,
                    educcationSchool: educcationSchool,
                    carrerSeq: carrerSeq,
                    technical: technical,
                    license: license,
                    isWelfare: isWelfare,
                    isMilitaly: isMilitaly,
                    carrerCertificate: carrerCertificate,
                    introduce: introduce,
                    workingTypeSeqs: workingTypeSeqs,
                    workingTypeNames: workingTypeNames,
                    salary: salary
                    }
                ,responseType: "json" });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/resumeService/update: ${body.result}`);
                return body.data;
            }
        } catch (error) {
            logger.writeLog("error", `services/resumeService/update: ${error}`);
            return null;
        }
    }
    static async updateImage(token, SEQ, RESUMEFILE) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/updateImage`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    SEQ: SEQ,
                    RESUMEFILE: RESUMEFILE,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/resumeService/updateImage: 이력서 이미지 파일 업데이트 실패 SEQ: ${SEQ}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/resumeService/updateImage: ${error}`);
        }
    }  
    static async updatecertificate(token, SEQ, RESUMEFILE) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/updatecertificate`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    SEQ: SEQ,
                    RESUMEFILE: RESUMEFILE,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/resumeService/updatecertificate: 이력서 인증 파일 업데이트 실패 SEQ: ${SEQ}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/resumeService/updatecertificate: ${error}`);
        }
    }  
    
    
};
