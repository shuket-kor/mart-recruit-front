const logger = require('../config/logger.js');
const secretKey = require('../config/secretKey').secretKey;
const got = require("got");

module.exports = class resumeService {
    static async get(seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/get`;
            const { body } = await got.post(apiURL, { json: { seq: seq },responseType: "json" });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/resumeService/get: ${body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/resumeService/get: ${error}`);
            return null;
        }
    }
    static async getByUserSeq(user_seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/getByUserSeq`;
            const { body } = await got.post(apiURL, { json: { seq: user_seq },responseType: "json" });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/resumeService/getByUserSeq: ${body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/resumeService/getByUserSeq: ${error}`);
            return null;
        }
    }
    static async get(user_seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/get`;
            const { body } = await got.post(apiURL, { json: { seq: user_seq },responseType: "json" });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/resumeService/get: ${body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/resumeService/get: ${error}`);
            return null;
        }
    }
    static async update(seq, subject, name, contact, email, gender,
        postCode, address, addressExtra, education, educcationSchool, careerSeq, technical, license,
        isWelfare, isMilitaly, introduce, workingTypeSeqs, workingTypeNames, salary){
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/update`;
            const { body } = await got.post(apiURL, {
                json: { 
                    seq: seq,
                    subject: subject,
                    name: name,
                    contact: contact,
                    email: email,
                    gender: gender,
                    postCode: postCode,
                    address: address,
                    addressExtra: addressExtra,
                    education: education,
                    educcationSchool: educcationSchool,
                    careerSeq: careerSeq,
                    technical: technical,
                    license: license,
                    isWelfare: isWelfare,
                    isMilitaly: isMilitaly,
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
                return null;
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
            return null;
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
            return null;
        }
    }  
    
    static async listCareer(resumeSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/listCareer`;
            const { body } = await got.post(apiURL, { json: { resumeSeq: resumeSeq },responseType: "json" });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/resumeService/listCareer: ${body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/resumeService/listCareer: ${error}`);
            return null;
        }
    }

    static async listForRecruit(token, recruitSeq, step) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/listForRecruit`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json : {
                    recruitSeq: recruitSeq,
                    step: step
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/resumeService/listForRecruit: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/resumeService/listForRecruit: ${error}`);
            return null;
        }
    } 
    static async increaseViewCount(seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/increaseView`;

            const {body} = got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                }, json: {
                    seq: seq,
                },
                responseType: 'json'
            });
            return true;
        } catch (error) {
            logger.writeLog('error', `services/resumeService/increaseViewCount: ${error}`);
            
        }
    }
    static async removeCareer(resumeSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/removeCareer`;

            const {body} = got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                }, json: {
                    seq: resumeSeq,
                },
                responseType: 'json'
            });
            return true;
        } catch (error) {
            logger.writeLog('error', `services/resumeService/resumeSeq: ${error}`);
        }
    }  
    static async updateCareer(resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salaly) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/updateCareer`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                }, json: {
                    seq: resumeSeq,
                    company: company,
                    workStart: workStart,
                    workEnd: workEnd,
                    career: career,
                    position: position,
                    jobType: jobType,
                    workRegion: workRegion,
                    charge: charge,
                    salaly: salaly
                },
                responseType: 'json'
            });
            return body.data;
        } catch (error) {
            logger.writeLog('error', `services/resumeService/updateCareer: ${error}`);
            return null;
        }
    }
    static async createCareer(resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salaly) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/addCareer`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                }, json: {
                    resumeSeq: resumeSeq,
                    company: company,
                    workStart: workStart,
                    workEnd: workEnd,
                    career: career,
                    position: position,
                    jobType: jobType,
                    workRegion: workRegion,
                    charge: charge,
                    salaly: salaly
                },
                responseType: 'json'
            });
            return body;
        } catch (error) {
            logger.writeLog('error', `services/resumeService/createCareer: ${error}`);
            return null;
        }
    }
    static async getCareer(token ,resumeSeq) {
        try {
            // console.log("userseq ? ? ? ? ? ? ? 정상  4나옴" + resumeSeq );
            var apiURL = `${process.env.APIHOST}/api/resume/getCareer`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    seq: resumeSeq                    
                },
                responseType: 'json'
            });
            
            if(body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `FRONT - services/resumeService/getCareer: ${body}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `FRONT - services/resumeService/getCareer: ${error}`);
            return null;
        }
    }
    
};
