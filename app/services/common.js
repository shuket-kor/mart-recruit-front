const logger = require('../config/logger.js');
const got = require('got');

module.exports = class commonService {
    static async getWorkingRegion() {
        try {
            var apiURL = `${process.env.APIHOST}/api/workingRegion/list`;

            const {body} = await got.post(apiURL, {responseType: 'json'});
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/commonService/getWorkingRegion: ${body.result}`);           
                return body.data;
            }
        } catch (error) {
            logger.writeLog('error', `services/commonService/getWorkingRegion: ${error}`);
            return null;
        }
    }      
    static async getWorkingType() {
        try {
            var apiURL = `${process.env.APIHOST}/api/workingType/list`;

            const {body} = await got.post(apiURL, {responseType: 'json'});
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/commonService/getWorkingType: ${body.result}`);           
                return body.data;
            }
        } catch (error) {
            logger.writeLog('error', `services/commonService/getWorkingType: ${error}`);
            return null;
        }
    }  
    static async getJobKind() {
        try {
            var apiURL = `${process.env.APIHOST}/api/jobKind/list`;

            const {body} = await got.post(apiURL, {responseType: 'json'});
            if (body.result === 'success') {
                return body.data;
            } else {
                //실패
                logger.writeLog('error', `services/commonService/getJobKind: ${body.result}`);           
                return body.data;
            }
        } catch (error) {
            logger.writeLog('error', `services/commonService/getJobKind: ${error}`);
            return null;
        }
    }  
}