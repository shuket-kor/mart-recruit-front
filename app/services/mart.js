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
    

}