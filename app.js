var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var dashboardRouter = require('./routes/dashboard');
var matchRouter = require('./routes/match');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var teamRankRouter = require('./routes/team_rank');
var getData = require('./routes/test_get_data');
var topTenLeague = require('./routes/topten_league');
var topTenConf = require('./routes/topten_conf');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/dashboard', dashboardRouter);
app.use('/match', matchRouter);
app.use('/users', usersRouter);
app.use('/all', getData)
app.use('/team_rank', teamRankRouter);
app.use('/topten_league', topTenLeague);
app.use('/topten_conference', topTenConf);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
