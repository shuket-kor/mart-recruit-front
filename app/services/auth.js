const logger = require('../config/logger.js');
const secretKey = require('../config/secretKey').secretKey;
const got = require("got");

module.exports = class authService {
    static async authorizatoin(userId, password) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/login`;

            const {body} = await got.post(apiURL, {
                json: {
                    userId: userId,
                    password: password,
                },
                responseType: "json",
            });

            if (body.result === "success") {
                logger.writeLog('info', `services/authService/authorizatoin: ${userId}`);
                // 인증에 성공하면 data에 담겨온 토큰을 리턴
                return body;
            } else {
                //실패
                logger.writeLog("error", `services/authService/authorizatoin: login fail - ${userId}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/authService/authorizatoin: system error - ${error}`);
            return null;
        }
    }

    static async verify(req) {
        try {
            var apiURL = `${process.env.APIHOST}/api/auth`;

            const {body} = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': req.cookies.xToken
                },
                json: {
                    key: secretKey,
                },
                responseType: "json",
            });

            if (body.result === "success") {
                logger.writeLog('info', `services/authService/verify: ${body.data}`);
                // 인증에 성공하면 data에 담겨온 토큰을 리턴
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/authService/verify: login fail`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/authService/verify: system error - ${error}`);
            return null;
        }
    }

    //  해당 페이지가 어떤 등급을 허용하는지, 허용하지 않으면 경고를 하고 루트로 리턴
    //  allows는 배열임
    static checkPermission(allows, userType) {
        if (allows.indexOf('A') != -1 || (allows.indexOf(userType) != -1)) {
            return true;
        } else {
            return false;
        }
      }
  
  
}