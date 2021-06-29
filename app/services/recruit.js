const logger = require('../config/logger.js');
const secretKey = require('../config/secretKey').secretKey;
const got = require("got");

module.exports = class recruitService {
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
    static async list(token, active, regions, jobKinds, workingTypes, searchType, keyword, page, rowCount) {
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
                    active: active,
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
    static async listByMart(token, martSeq, active, page, rowCount) {
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
                    active: active,
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
    static async create(token, MART_SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
        PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
        GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION, ACTIVE) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/create`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    MART_SEQ: MART_SEQ,
                    HRONAME: HRONAME,
                    HROCONTACT: HROCONTACT,
                    HROEMAIL: HROEMAIL,
                    SUBJECT: SUBJECT, 
                    CAREER_SEQ: CAREER_SEQ,
                    CHARGE: CHARGE,
                    PREFERENTIAL: PREFERENTIAL,
                    EDUCATION: EDUCATION,
                    SALARYTYPE: SALARYTYPE,
                    SALARY: SALARY,
                    PROBATIONTERM: PROBATIONTERM,
                    WORKSHIFT: WORKSHIFT,
                    WORKSHIFTTIME: WORKSHIFTTIME,
                    GENDER: GENDER,
                    AGE: AGE,
                    STARTDATE: STARTDATE,
                    ENDDATE: ENDDATE,
                    HIRINGSTEP: HIRINGSTEP,
                    REQUIREDOCS: REQUIREDOCS,
                    CONTENT: CONTENT,
                    JOBKIND: JOBKIND,
                    JOBRANK: JOBRANK,
                    WORKINGTYPE: WORKINGTYPE,
                    WORKREGION: WORKREGION,
                    ACTIVE: ACTIVE
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/create: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/create: ${error}`);
            return null;
        }
    }  
    static async update(token, SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
        PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
        GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION, ACTIVE) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/update`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    SEQ: SEQ,
                    HRONAME: HRONAME,
                    HROCONTACT: HROCONTACT,
                    HROEMAIL: HROEMAIL,
                    SUBJECT: SUBJECT, 
                    CAREER_SEQ: CAREER_SEQ,
                    CHARGE: CHARGE,
                    PREFERENTIAL: PREFERENTIAL,
                    EDUCATION: EDUCATION,
                    SALARYTYPE: SALARYTYPE,
                    SALARY: SALARY,
                    PROBATIONTERM: PROBATIONTERM,
                    WORKSHIFT: WORKSHIFT,
                    WORKSHIFTTIME: WORKSHIFTTIME,
                    GENDER: GENDER,
                    AGE: AGE,
                    STARTDATE: STARTDATE,
                    ENDDATE: ENDDATE,
                    HIRINGSTEP: HIRINGSTEP,
                    REQUIREDOCS: REQUIREDOCS,
                    CONTENT: CONTENT,
                    JOBKIND: JOBKIND,
                    JOBRANK: JOBRANK,
                    WORKINGTYPE: WORKINGTYPE,
                    WORKREGION: WORKREGION,
                    ACTIVE: ACTIVE,
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/create: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/create: ${error}`);
            return null;
        }
    }  
    static async active(token, recruitSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/active`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    seq: recruitSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/close: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/close: ${error}`);
            return null;
        }
    }  
    static async close(token, recruitSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/close`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    seq: recruitSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/close: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/close: ${error}`);
            return null;
        }
    }  
    static async copy(token, recruitSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/copy`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    seq: recruitSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/copy: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/copy: ${error}`);
            return null;
        }
    }  
    static async getActiveCount(token, martSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/getActiveCount`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    martSeq: martSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/getActiveCount: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/getActiveCount: ${error}`);
            return null;
        }
    }  
    static async getResumeCount(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/getResumeCount`;

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
                logger.writeLog('error', `services/recruitService/getActiveCount: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/getActiveCount: ${error}`);
            return null;
        }
    }  
    static async setRead(token, recruitSeq, resumeSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/setRead`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    recruitSeq: recruitSeq,
                    resumeSeq: resumeSeq
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/setRead: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/setRead: ${error}`);
            return null;
        }
    }  
    static async setStep(token, recruitSeq, resumeSeq, step) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/setStep`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    recruitSeq: recruitSeq,
                    resumeSeq: resumeSeq,
                    step: step
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/setStep: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/setStep: ${error}`);
            return null;
        }
    }  
    static async getApply(token, recruitSeq, resumeSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/getApply`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    recruitSeq: recruitSeq,
                    resumeSeq: resumeSeq,
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/getApply: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/getApply: ${error}`);
            return null;
        }
    }  
    static async listUserApply(token, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/recruit/listUserApply`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    userSeq: userSeq,
                    key: secretKey
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/recruitService/listUserApply: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/recruitService/listUserApply: ${error}`);
            return null;
        }
    }  
    static applyStatus(step) {
        switch (step) {
            case 'D' : return '서류 전형'; break;
            case 'I' : return '면접'; break;
            case 'P' : return '합격'; break;
            case 'F' : return '불합격'; break;
        }
    }
}