const express = require('express');
const path = require('path');
const bodyparser = require ('body-parser');
const CRUD = require('./CRUD_functions');
const createDB = require('./DB/createDB');
const port =8080;

//set up app
var app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

const main=function(req,res){
  res.render('signin');
};
app.get('/',[main]);
app.get('/register',(req,res)=>{
  res.render('register');
});

app.get('/rate',(req,res)=>{
  res.render('rate');
});
app.get('/Search',(req,res)=>{
  res.render('Search2');
});
app.get('/SignIn',(req,res)=>{
  res.render('signin');
});

app.post('/createUser', CRUD.createNewUser);
app.post('/Search', CRUD.Finduser);
app.post('/Results', CRUD.searchDogsitter);
app.post('/sendRank', CRUD.sendRank);

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
  res.render('error.html');
});

// Initialize database schema & tables
createDB.InitDB();

app.listen(port , () =>{
  console.log("Server running on port :"+port);
});
