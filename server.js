var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require("body-parser");
var passport = require('passport');

var customer = require('./routes/customer');
var index = require('./routes/index');

var app = express();

require('./lib/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.set('view engine', 'ejs');

app.get('/', index.index);
app.get('/customer', customer.index);
app.get('/customer/:id', customer.show);
app.post('/customer', customer.create);
app.delete('/customer/delete/:id', customer.destroy)
app.put('/customer/update/:id',customer.update);

app.post('/signup', passport.authenticate('local-signup',
  function(req, res) {
    console.log("hello");
  })
);
app.post('/login', passport.authenticate('local-signin'));
app.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});



/*
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'jzl000jzl',
    database : 'mysql',
    debug    : false
});

function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from user",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
   });
}

app.get("/",function(req,res){-
    handle_database(req,res);
});
*/


app.listen(8080, ()=>{
    console.log('App listening on port 8080');
});
