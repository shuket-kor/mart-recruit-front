const numeral = require('numeral');
const sampleService = require('../services/sample.js');

module.exports = {
    async sample(req, res, next) {
        
        let sampleInfo = await sampleService.get(req.params.code);

        res.render('sampleejs', { 
            layout: 'layouts/default',
            info: sampleInfo
          });
    }
}

