const logger = require('../config/logger.js');
const got = require('got');

module.exports = class noticeService {
    /*static async list() {
        try {
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/list';
            } else {
                apiURL = 'http://localhost:3000/api/notice/list';
                const {response} = await got.get(apiURL, {
                    responseType: 'json'
                });
            }
        } catch (error) {
            logger.writeLog('error',`serives/noticeService/list: ${error}`)
        }
    }*/
    static async list() {
        try {
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/list';
            } else {
                apiURL = 'http://api.martrecuruit.com/api/notice/list';
            }
            var {body} = await got(apiURL, {
                responseType: 'json'
            });

            if (body.result == 'success'){
                console.log('response.result === success');
                return body.data;
            } else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeService/list: ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error',`serives/noticeService/list: ${error}`)
            return null;
        }
    }


    
};