const logger = require('../config/logger.js');
const got = require('got');

module.exports = class noticeService {
    
        // 공지사항 리스트
        static async list(seq, page, rowCount) {
            try {

                var apiURL = "";
                if(process.env.NODE_ENV == "develope") {
                    apiURL = 'http://localhost:3000/api/notice/list';
                } else {
                    apiURL = 'http://localhost:3000/api/notice/list';
                }
                const {body} = await got.post(apiURL + "?page=" + page + "&offset=" + rowCount, { json : {
                    SEQ:seq,
                    page: page,
                    rowCount: rowCount },
                responseType: 'json'});
                
                if (body.result == 'success'){
                    console.log('response.result === success 확인');
                    
                    return body.data;
                } else {
                    console.log('response.result !== success');
                    logger.writeLog('error', `services/noticeService/list : ${error}`);
                    return null;
                }
            } catch (error) {
                logger.writeLog('error',`serives/noticeService/list: ${error}`)
                return null;
            }
        }

    // 공지사항 자세히 보기
    /*static async views(seq) {

        try {
            var apiURL = "";
            if(process.env.NODE_ENV == "develope") {
                apiURL = 'http://localhost:3000/api/notice/view';
            } else {
                apiURL = 'http://localhost:3000/api/notice/view';
            }
            var {body} = await got.get(apiURL + "?seq=" + seq , { responseType: 'json' });

            if (body.result == 'success'){
                console.log('response.result === success');
                return body.data;
            } else {
                console.log('response.result !== success');
                logger.writeLog('error', `services/noticeService/views: ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error',`serives/noticeService/views: ${error}`)
            return null;
        }
    }*/

    
};