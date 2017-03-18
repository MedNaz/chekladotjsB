//libraries
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var passport_facebook = require("./Features/Authentification/Social networks/Facebook/facebookStrategy");




mongoose.connect('mongodb://localhost:27017/thebigmarket');

//routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signInRouter = require('./routes/signIn');
var signUpRouter = require('./routes/signUp');
var messagingRouter = require('./routes/messaging');
var shopRouter = require('./routes/shop');
var searchRouter = require('./routes/search');
var profileRouter = require('./routes/profile');
var FacebookRouter = require('./routes/facebookAuth');

var facebookRouter = require('./routes/facebookAuth');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//middlewares
app.use(session({
    secret: 'keyboard cat',
    name: 'SessionID',
    resave: false,
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(__dirname + "/public"));

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(userID, done) {

    done(null, userID);
});

passport.deserializeUser(function(id, done) {
    // User.findById(id, function(err, user) {
    //     done(err, user);
    // });
    // console.log(id);
    done(null,id)
});


passport.use(passport_facebook());

//routers middlewares
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/messaging', messagingRouter);
app.use('/shop', shopRouter);
app.use('/search',searchRouter);
app.use('/profile', profileRouter);
app.use('/auth/facebook',facebookRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {

    res.statusCode = 404;
    res.send('Not found');
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
