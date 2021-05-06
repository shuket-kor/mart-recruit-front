module.exports = {    
    
async main(req, res, next) {
    res.render('users/main', {
        layout: 'layouts/default',
        title: '한국마트협회 구인구직'
    });
  }
}