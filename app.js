var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const session = require('express-session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const articlePosts = require('./routes/posts');
const jwt = require ('jsonwebtoken');
const mongoose = require('mongoose');

try{

  let connection = mongoose.connect(
            "mongodb+srv://fakeUser:OkxojOOmqv3rF9Q8@appclust-rpwwy.mongodb.net/test?retryWrites=true&w=majority",
            { 
              useNewUrlParser: true,
              useUnifiedTopology: true 
            });
  console.log("Connected Successfully To DB");          
}
catch(error){
  console.log("unable to login to DB: ",error);
}
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS configuration
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers","Origin,Accept,Authorization,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,x-access-token,referer");

  next();

});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlePosts);

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
