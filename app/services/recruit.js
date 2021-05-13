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
}