var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require("body-parser");
var passport = require('passport');
var strategy = require('passport-local').Strategy;
var dateTime = require('node-datetime');

var customer = require('./routes/customer');
var index = require('./routes/index');
var device_user = require('./routes/device_user');

// require('./app/passport')(passport);

var app = express();app.set('view engine', 'ejs');

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'jzl000jzl',
  database : 'rideshare'
});

connection.connect(function(err) {
  if(err)
    console.log("Error connecting database! :( ");
  else
    console.log("Database is connected for passport! :) ");
});



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// used to serialize the user for the session
passport.serializeUser(function(id, done) {
  done(null, id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
  connection.query("SELECT * FROM users WHERE id = " + id, function(err, rows){
    done(err, rows[0]);
  });
});

passport.use(
  'signup',
  new strategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  function(req, email, password, done) {
    console.log(req.body)

    connection.query("SELECT * FROM device_users WHERE 'email'='" + req.body.email + "'", function(err, rows) {
      if (err)
        return done(err);
      if (rows.length) {
        return done(null, false, 'That username is already taken.');
      } else {
        var newUser = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            password: bcrypt.hashSync(req.body.password, null, null)  // use the generateHash function in our user model
        };            newUser.id = rows.insertId;

        var dummy = dateTime.create('1000-01-01 00:00:00').format('Y-m-d H:M:S');
        console.log(dummy);
        var datetime = dateTime.create().format('Y-m-d H:M:S');
        console.log(datetime);
        var insertQuery = "INSERT INTO device_users ( " +
                          "user_id, first_name, last_name, phone_number, email, encrypted_password, sign_in_count, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, failed_attempts, locked_at, unlock_token, token, created_at, updated_at ) " +
                          "VALUES ( " +
                          "null, '" + newUser.first_name + "', '" + newUser.last_name + "', '" + newUser.phone + "', '" + newUser.email + "', '" + newUser.password + "', " +
                          "0, '" + dummy + "', '" + dummy + "', null, null, 0, '" + dummy + "', null, null, '" + datetime + "', '" + datetime + "' )";

        console.log(insertQuery);
        connection.query(insertQuery, function(err, rows) {
          if (err)
            return done(err);

          console.log(rows);
          return done(null, newUser);
        });
      }
    });
  })
)

passport.use(
  'login',
  new strategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true, // allows us to pass back the entire request to the callback
    session: false
  },
  function(req, email, password, done) { // callback with email and password from our form
    console.log(req.body.email);
    console.log(email);
    var user_email = req.body.email;
    console.log("SELECT * FROM device_users WHERE email='" + email + "';");
    connection.query("SELECT * FROM device_users WHERE email='" + email + "';", function(err, rows){
      if (err) {
        return done(err);
      }

      if (!rows.length) {
        return done(null, false, 'No user found.'); // req.flash is the way to set flashdata using connect-flash
      }

      if (!bcrypt.compareSync(password, rows[0].encrypted_password)) {
        return done(null, false, 'Oops! Wrong password.');
      }

      console.log(rows[0]);
      // all is well, return successful user
      return done(null, rows[0]);
    });
  })
);

app.get('/', index.index);
app.get('/customer', customer.index);
app.get('/customer/:id', customer.show);
app.post('/customer', customer.create);
app.delete('/customer/delete/:id', customer.destroy)
app.put('/customer/update/:id',customer.update);

app.post('/signup', passport.authenticate('signup'),
  function(req, res) {
    res.json({"Status":"Success"});
  }
);
app.post('/login', passport.authenticate('login'),
  function(req, res) {
    res.json({"Status":"Success"});
  }
);
// app.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { res.json('Not Found'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       res.json(user);
//     });
//   })(req, res, next);
// });
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
