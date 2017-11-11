// var mysql = require('mysql');
// var bcrypt = require('bcrypt');
//
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'jzl000jzl',
//   database : 'rideshare'
// });
//
// connection.connect(function(err) {
//   if(err)
//     console.log("Error connecting database! :( ");
//   else
//     console.log("Database is connected! :) ");
// });

var db = require('./lib/db_conn.js');

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
  	var query = db.query("INSERT INTO device_users VALUES (1, '"+device_user.firstname+"','"+device_user.lastname+"','"+device_user.email+"','"+device_user.password+"', null, null, null, null, null, null, null, null, null, null, null, null);", function(err, rows){
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
  var query = db.query('SELECT * FROM device_users WHERE user_id=' + id, function(err, user) {
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
