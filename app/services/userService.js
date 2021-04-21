const logger = require('../config/logger.js');
const got = require('got');
const { json } = require('express');

module.exports = class userService {
    static async login(body) {
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope")
                apiURL = "http://localhost:3000/api/users/login";
            else
                apiURL = `http://localhost:3000/api/users/login`;

            const userData = await got.post(apiURL,{
                json:{
                        user_id: body.user_id,
                        password: body.password
                },
                responseType: 'json'
            });
            console.log("userData 는 : " + userData.body);
            console.log(JSON.stringify(userData.body));
    
            if (userData.body.result === 'success') {
                console.log("userData.body.result === success");
                // console.log(userData.body.data)
                // console.log(userData.body.token)
                return userData.body
            } else {
                //실패
                console.log("userData.body.result !== success");
                logger.writeLog('error', `services/userService/login: ${body}`);           
                return userData.resultData;
            }
        } catch (error) {
            logger.writeLog('error', `services/tokenService/login: ${error}`);
        }
    }  

    static async getuser(token) {
        try {
            // console.log("getUser Service 들어옴"+token)
            var apiURL = "";
            if (process.env.NODE_ENV == "develope")
                apiURL = "http://localhost:3000/api/users";
            else
                apiURL = `http://localhost:3000/api/users`;

                const {body} = await got.get(apiURL, {
                    headers: {
                        'contentType': 'application/json',
                        'User-Agent': 'DEVICE-AGENT',
                        'userAgent': 'DEVICE-AGENT',
                        'Authorization': token
                    }
                });
            if (body.result === 'success') {
                console.log('body.result === success')
                return body.resultData;
            } else {
                //실패
                console.log("실패~~~~~~~~~~~~~~~~~~")
                logger.writeLog('error', `services/tokenService/login: ${body.result}`);           
                return body.resultData;
            }
        } catch (error) {
            logger.writeLog('error', `services/tokenService/login: ${error}`);
        }
    }  
    
}