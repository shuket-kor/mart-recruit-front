const logger = require('../config/logger.js');

module.exports = {       
    async main(req, res, next) {
        res.render('users/main', {
            layout: 'layouts/default',
            title: '한국마트협회 구인구직',
            user: req.user
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