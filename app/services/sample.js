const logger = require('../config/logger.js');
const got = require('got');

module.exports = class sampleService {
    static async getFromUrl(token, code) {
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope")
                apiURL = "http://localhost:3000/sample/get/" + code;
            else
                apiURL = `http://localhost:3000/sample/get/${code}`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, 
                json: {
                    code: code
                },
                responseType: 'json'
            });
            if (body.result === 'success') {
                return body.resultData;
            } else {
                //실패
                logger.writeLog('error', `services/sampleService/getFromUrl: ${body.result}`);           
                return body.resultData;
            }
        } catch (error) {
            logger.writeLog('error', `services/sampleService/getFromUrl: ${error}`);
        }
    }  

}