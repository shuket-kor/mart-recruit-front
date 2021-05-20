const logger = require('../config/logger.js');
const secretKey = require('../config/secretKey').secretKey;
const got = require("got");

module.exports = class recruitService {
    static async listWorkingRegion() {
        try {
            var apiURL = `${process.env.APIHOST}/api/workingRegion/list`;

            const {body} = await got.post(apiURL, {responseType: 'json'});
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/listWorkingRegion: ${body.result}`);           
                return body.data;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/listWorkingRegion: ${error}`);
            return null;
        }
    } 
    static async listJobKind() {
        try {
            var apiURL = `${process.env.APIHOST}/api/jobKind/list`;

            const {body} = await got.post(apiURL, {responseType: 'json'});
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/listJobKind: ${body.result}`);           
                return body.data;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/listJobKind: ${error}`);
            return null;
        }
    } 
    static async listWorkingType() {
        try {
            var apiURL = `${process.env.APIHOST}/api/workingType/list`;

            const {body} = await got.post(apiURL, {responseType: 'json'});
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/listWorkingType: ${body.result}`);           
                return body.data;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/listWorkingType: ${error}`);
            return null;
        }
    } 
    static async get(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/get`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    seq: seq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/get: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/get: ${error}`);
            return null;
        }
    }  
    static async list(token, regions, jobKinds, workingTypes, searchType, keyword, page, rowCount) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/list`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    regions: regions,
                    jobKinds: jobKinds,
                    workingTypes: workingTypes,
                    name: (searchType == 'm') ? keyword : '',
                    subject: (searchType == 'r') ? keyword : '',
                    page: page,
                    rowCount: rowCount,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/list: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/list: ${error}`);
            return null;
        }
    }  
    static async listByMart(token, martSeq, page, rowCount) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/list`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    martSeq: martSeq,
                    page: page,
                    rowCount: rowCount,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/listByMart: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/listByMart: ${error}`);
            return null;
        }
    }  
    static async getUserStatus(token, recruitSeq, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/getUserStatus`;
            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    recruitSeq: recruitSeq,
                    userSeq: userSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/getUserStatus: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/getUserStatus: ${error}`);
            return null;
        }
    } 
    static async apply(token, recruitSeq, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/apply`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    recruitSeq: recruitSeq,
                    userSeq: userSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/apply: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/apply: ${error}`);
            return null;
        }
    }  
    static async cancelApply(token, recruitSeq, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/cancelApply`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    recruitSeq: recruitSeq,
                    userSeq: userSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/apply: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/apply: ${error}`);
            return null;
        }
    }  
    static async scrap(token, recruitSeq, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/scrap/create`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    recruitSeq: recruitSeq,
                    userSeq: userSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/scrap: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/scrap: ${error}`);
            return null;
        }
    }  
    static async cancelScrap(token, recruitSeq, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/scrap/remove`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    recruitSeq: recruitSeq,
                    userSeq: userSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/cancelScrap: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/cancelScrap: ${error}`);
            return null;
        }
    }  
}