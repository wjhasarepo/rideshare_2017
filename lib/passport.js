var connection = require('db');
var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');


// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'keybridge!',
//   database : 'mysqltestdb'
// });
//
// connection.connect(function(err) {
//   if(err)
//     console.log("Error connecting database! :( ");
//   else
//     console.log("Database is connected for passport! :) ");
// });

module.exports = function(passport) {

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    connection.query("SELECT * FROM users WHERE id = " + id, function(err, rows){
      done(err, rows[0]);
    });
  });

  passport.use('local-signup',
    new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback: true
      //session: false
    },
    function(req, email, password, done) {
      connection.query("SELECT * FROM device_users WHERE email = " + email, function(err, rows) {
        if (err)
          return done(err);
        if (rows.length) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {
          var device_user = {
            first_name: firstname,
            last_name: lastname,
            phone_number: phone,
            email: email,
            password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
          };

          var insertQuery = "INSERT INTO users (first_name, last_name, phone_number, email, encrypted_password, sign_in_count, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, failed_attempts, locked_at, unlock_token, token, created_at, updated_at) "+
                            "values (" + device_user.first_name + ", " + device_user.last_name + ", " + device_user.phone_number + ", " + device_user.email + ", " + device_user.password + ", 0, null, null, null, null, 0, null, null, null, null)";

          connection.query(insertQuery, function(err, rows) {
            if(err)
              return done(err)

            console.log("Insert Success!");
            return done(null, newUser);
          });
        }
      });
    })
  );

  passport.use(
    new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true, // allows us to pass back the entire request to the callback
      session: false
    },
    function(req, email, password, done) { // callback with email and password from our form
      console.log(req.body);
      connection.query("SELECT * FROM users WHERE username = " + username, function(err, rows){
        if (err)
          return done(err);
        if (!rows.length) {
          return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        }

        if (!bcrypt.compareSync(password, rows[0].password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

        // all is well, return successful user
        return done(null, rows[0]);
      });
    })
  );
};
