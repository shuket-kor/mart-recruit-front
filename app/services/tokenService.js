const logger = require('../config/logger.js');
const got = require('got');
const { json } = require('express');

module.exports = class tokenService {
    static async login(body) {
        
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope")
                apiURL = "http://localhost:3000/api/users/login";
            else
                apiURL = `http://localhost:3000/api/users/login`;

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
                logger.writeLog('error', `services/tokenService/login: ${body.result}`);           
                return body.resultData;
            }
        } catch (error) {
            logger.writeLog('error', `services/tokenService/login: ${error}`);
        }
    }  

}