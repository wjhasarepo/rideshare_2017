var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require("body-parser");
var passport = require('passport');
// var strategy = require('passport-local').Strategy;
var dateTime = require('node-datetime');

var customer = require('./routes/customer');
var index = require('./routes/index');
var device_user = require('./routes/device_user');
var car = require('./routes/car');
var role = require('./routes/role');
var request = require('./routes/request');
var offer = require('./routes/offer');
var match = require('./routes/match');
var transaction = require('./routes/transaction');
// require('./app/passport')(passport);

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// app.set('view engine', 'ejs');

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var connection = require('./lib/db');

require('./lib/auth')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	secret: 'waynejiaorideshare',
	resave: false,
	saveUninitialized: true
 })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



/*
 * Routes for requests
 */
app.get('/', index.index);
app.get('/loginPage', index.login);
app.get('/rolePage', index.role);
app.get('/profilePage', index.profile);
app.get('/ridePage', index.ride);
app.get('/requestPage', index.request);
app.get('/responsePage', index.response);
app.get('/offerPage', index.offer);
app.get('/matchPage', index.match);
app.get('/transactionPage', index.transaction);


app.get('/customer', customer.index);
app.get('/customer/:id', customer.show);
app.post('/customer', customer.create);
app.delete('/customer/delete/:id', customer.destroy)
app.put('/customer/update/:id',customer.update);

app.get('/car', car.index);
app.get('/car/:id', car.show);
app.post('/car', car.create);
app.delete('/car/delete/:id', car.destroy)
app.put('/car/update/:id',car.update);

app.get('/role', role.index);
app.get('/role/:id', role.show);
app.post('/role', role.create);
app.delete('/role/delete/:id', role.destroy)
app.put('/role/update/:id',role.update);

app.get('/request', request.index);
app.get('/request/:id', request.show);
app.post('/request', request.create);
app.delete('/request/delete/:id', request.destroy)
app.put('/request/update/:id',request.update);

app.get('/offer', offer.index);
app.get('/offer/:id', offer.show);
app.post('/offer', offer.create);
app.delete('/offer/delete/:id', offer.destroy)
app.put('/offer/update/:id',offer.update);

app.get('/match', match.index);
app.get('/match/:id', match.show);
app.post('/match', match.create);

app.get('/transaction', transaction.index);
app.get('/transaction/:id', transaction.show);
app.post('/transaction', transaction.create);
app.delete('/transaction/delete/:id', transaction.destroy)
app.put('/transaction/update/:id',transaction.update);

/*
 * Initial site actions
 */
app.post('/signup', passport.authenticate('signup'),
  function(req, res) {
    res.json({"Status":"Success"});
  }
);
app.post('/login', passport.authenticate('login', {
    successRedirect : '/rolePage',
    failureRedirect : '/loginPage',
    failureFlash : true
  }
  // ),
  // function(req, res) {
  //   res.json({"Status":"Success"});
  // }
));
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});


app.listen(8081, ()=>{
    console.log('App listening on port 8081');
});
