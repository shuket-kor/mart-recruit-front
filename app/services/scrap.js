const logger = require("../config/logger");
const got = require("got");
const secretKey = require("../config/secretKey").secretKey;

module.exports = class scrapService {
    static async scrapList(token, userSeq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/scrap/list`;

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
                logger.writeLog('error', `services/mypageService/scrapList: ${body.result}`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `services/mypageService/scrapList: ${error}`);
            return null;
        }

    } 

};
