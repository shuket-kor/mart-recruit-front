const moment = require('moment');
const numeral = require('numeral');
const logger = require('../config/logger.js');
const recruitService = require('../services/recruit.js');

module.exports = {       
    async main(req, res, next) {
        const currentPage = 1;
        const rowCount = 20;
        const searchType = (req.query.searchType) ? req.query.searchType : ''; //m: 마트이름, r: 공고명
        const keyword = (req.query.keyword) ? req.query.keyword : '';

        // 최신 8개의 리스트를 따로 얻는다
        const returnData_Top = await recruitService.list(req.cookies.xToken, 'Y', null, null, null, searchType, keyword, 1, 8);
        // 페이지에 따른 리스트를 얻는다
        const returnData = await recruitService.list(req.cookies.xToken, 'Y', null, null, null, searchType, keyword, currentPage, rowCount);
        if (returnData) {
            if (returnData.list.length > 8) {
                for (let i=0; i < 8; i++) {returnData.list.shift();} 
            }
        }

        res.render('main', {
            layout: 'layouts/default',
            title: '한국마트협회 구인구직',
            user: req.user,
            moment: moment,
            numeral: numeral,
            hostName: process.env.APIHOST,
            searchType: searchType,
            keyword: keyword,
            topList: (returnData_Top) ? returnData_Top.list : null,
            totalCount: (returnData) ? returnData.totalCount : 0,
            rowCount: rowCount,
            page: currentPage,
            list: (returnData) ? returnData.list : null
        });
    },
  
    async error(req, res, next) {
        let message = req.query.message;

        res.render('error', {
            layout: 'layouts/default',
            title: '한국마트협회 구인구직 에러',
            user: req.user,
            message: message
        });
      }
  
  
  }