var connection = require('./db');
// var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var strategy = require('passport-local').Strategy;

module.exports = function(app) {
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    // for(key in user){
    //   if (user.hasOwnProperty(key)) {
    //     console.log("Key is " + key + ", value is " + user[key]);
    //   }
    // }

    console.log("user: " + user.user_id);
    done(null, user.user_id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    console.log("SELECT * FROM device_users WHERE user_id = " + id);
    connection.query("SELECT * FROM device_users WHERE user_id = " + id, function(err, user){
      done(err, user);
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
          };

          console.log("id: " + rows.insertId);
          var dummy_datetime = dateTime.create('1000-01-01 00:00:00').format('Y-m-d H:M:S');
          var datetime = dateTime.create().format('Y-m-d H:M:S');

          var insertQuery = "INSERT INTO device_users " +
                            "( user_id, first_name, last_name, phone_number, email, encrypted_password, sign_in_count, current_sign_in_at, last_sign_in_at, current_sign_in_ip, last_sign_in_ip, failed_attempts, locked_at, unlock_token, token, created_at, updated_at ) " +
                            "VALUES " +
                            "( null, '" + newUser.first_name + "', '" + newUser.last_name + "', '" + newUser.phone + "', '" + newUser.email + "', '" + newUser.password + "', " +
                            "0, '" + dummy_datetime + "', '" + dummy_datetime + "', null, null, 0, '" + dummy_datetime + "', null, null, '" + datetime + "', '" + datetime + "' )";


          connection.query(insertQuery, function(err, rows) {
            if (err) {
              console.log(insertQuery);
              return done(err);
            }

            connection.query("SELECT LAST_INSERT_ID() as id;", function(err, rows) {
              if (err) {
                throw err;
              }

              console.log(rows[0].id);
              newUser.user_id = rows[0].id;

              return done(null, newUser);
            })

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
      // console.log(req.body.email);
      // console.log(email);
      var user_email = req.body.email;

      connection.query("SELECT * FROM device_users WHERE email='" + email + "';", function(err, rows){
        if (err) {
          console.log("SELECT * FROM device_users WHERE email='" + email + "';");
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
};
