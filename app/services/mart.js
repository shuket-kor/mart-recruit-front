const logger = require('../config/logger.js');
const secretKey = require('../config/secretKey').secretKey;
const got = require("got");

module.exports = class martService {
    static async get(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/get`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    seq: seq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/martService/seq: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService/seq: ${error}`);
            return null;
        }
    }

    static async getMartByUser(token, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/getByUser`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    userSeq: userSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/martService/getMartByUser: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService/getMartByUser: ${error}`);
            return null;
        }
    }
    
    static async update(token, SEQ, NAME, REGNO, POSTCODE, ADDRESS, ADDRESSEXTRA, CONTACT, HRONAME, HROCONTACT, HRORANK) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/update`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    SEQ: SEQ,
                    NAME: NAME,
                    REGNO: REGNO,
                    POSTCODE: POSTCODE,
                    ADDRESS: ADDRESS,
                    ADDRESSEXTRA: ADDRESSEXTRA,
                    CONTACT: CONTACT,
                    HRONAME: HRONAME,
                    HROCONTACT: HROCONTACT,
                    HRORANK: HRORANK,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body;
            } else {
                //실패
                logger.writeLog('error', `services/martService/update: 마트 정보 업데이트 실패 SEQ: ${SEQ}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService/update: ${error}`);
        }
    }  
    
    static async updateLogo(token, SEQ, LOGOFILE) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/updateLogo`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    SEQ: SEQ,
                    LOGOFILE: LOGOFILE,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body;
            } else {
                //실패
                logger.writeLog('error', `services/martService/updateLogo: 마트 로고 파일 업데이트 실패 SEQ: ${SEQ}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService/updateLogo: ${error}`);
        }
    } 

    static async createJobRequest(token, martSeq, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/createJobRequest`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    martSeq: martSeq,
                    userSeq: userSeq,
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body;
            } else {
                //실패
                logger.writeLog('error', `services/martService.createJobRequest: ${martSeq} to ${userSeq} // 입사 지원 요청 실패`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService.createJobRequest: ${error}`);
        }
    } 
    
    static async getJobRequest(token, martSeq, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/getJobRequest`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    martSeq: martSeq,
                    userSeq: userSeq,
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body;
            } else {
                //실패
                logger.writeLog('error', `services/martService.getJobRequest: ${martSeq} to ${userSeq} // 입사 지원 요청 정보 리턴 실패`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService.getJobRequest: ${error}`);
        }
    } 

    static async removeJobRequest(token, martSeq, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/removeJobRequest`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    martSeq: martSeq,
                    userSeq: userSeq,
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body;
            } else {
                //실패
                logger.writeLog('error', `services/martService.removeJobRequest: ${martSeq} to ${userSeq} // 입사 지원 요청 삭제 실패`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/martService.removeJobRequest: ${error}`);
        }
    } 

    static async listJobRequest(token, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/mart/listJobRequest`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json : {
                    key : secretKey,
                    userSeq: userSeq,
                },
                responseType: 'json'
            });
            if (body) {
                if (body.result === 'success') {
                    return body.data;
                } else {
                    //실패
                    logger.writeLog('error', `services/resumeService.listJobRequest: ${body.result}`);           
                    return null;
                }
            } else {
                //실패
                logger.writeLog('error', `services/resumeService.listJobRequest: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/resumeService.listJobRequest: ${error}`);
            return null;
        }
    } 

}