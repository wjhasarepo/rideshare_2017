/*
module.exports = function(app, passport) {

    // HOME PAGE
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // LOGIN
    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

    // SIGNUP
    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

    // PROFILE SECTION
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // LOGOUT
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
*/

var mysql = require('mysql');
var bcrypt = require('bcrypt');

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
    console.log("Database is connected! :) ");
});

exports.register = function(req, res) {  
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var device_user = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    };

    console.log(device_user);
  	console.log("INSERT INTO device_users VALUES ('"+device_user.firstname+"','"+device_user.lastname+"','"+device_user.email+"','"+device_user.password+"');");
  	var query = connection.query("INSERT INTO device_users VALUES (1, '"+device_user.firstname+"','"+device_user.lastname+"','"+device_user.email+"','"+device_user.password+"', null, null, null, null, null, null, null, null, null, null, null, null);", function(err, rows){
    	if(err) {
      	console.log("Error Inserting : %s", err);
      	res.json({"status":"400 Back Request!"});
    	} else {
      	res.json({"status":"200 OK!"});
    	}
  	});
  }
}

exports.authenticate = function(req, res) {
	var id = req.params.id; 
  var query = connection.query('SELECT * FROM customer WHERE id=' + id, function(err, user) {
    if (err) {
			throw err;
		} else {
    	if (!row.length) {                                                   
    		return console.log('Error2');
  		} else if (!row[0].something) {
    		return console.log('Error3');
  		} else {
      	comparePassword(req.body.password, function(err, isMatch) {
        	if (isMatch && !err) {
          	// Create token if the password matched and no error was thrown
          	//var token = jwt.sign(user, config.secret, {
          	//  expiresIn: 10080 // in seconds
          	//});
          	res.json({ success: true, token: 'JWT ' + token });
        	} else {
          	res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        	}
      	});
    	}
		}
  });
}

exports.dashboard = function(req, res) {  
  res.send('It worked! User id is: ' + req.user._id + '.');
}

comparePassword = function(pwd, callback) {  
  bcrypt.compare(pwd, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    	callback(null, isMatch);
  });
};
