// process.env.NODE_ENV = "production";
process.env.NODE_ENV = "develope";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const morgan = require('morgan');
const logger = require('./app/config/logger');
const expressLayouts = require('express-ejs-layouts');

var app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));

// app.set('layout', 'layout');
// app.set("layout extractScripts", true);
app.use(expressLayouts);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, '/assets/')));
app.use('/', express.static(path.join(__dirname, '/')));

app.set('baseTitle', '마트협회구인구직 ');
if (process.env.NODE_ENV == 'develope') {
  process.env.APIHOST = 'http://localhost:3000';
} else {
  process.env.APIHOST = 'http://localhost:3000';
}

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/notice', require('./routes/notice'));
app.use('/recruit', require('./routes/recruit'));
app.use('/mart', require('./routes/mart'));
app.use('/mypage', require('./routes/mypage'));
app.use('/martPage', require('./routes/martPage'));

app.use(
  morgan('combined', 
    {
      skip: function (req, res) { return res.statusCode < 400 }, // http return 이 에러일때만 출력
      stream: logger.stream // logger에서 morgan의 stream 을 받도록 추가
    }
  )
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
