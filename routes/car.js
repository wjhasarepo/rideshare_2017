// var mysql = require('mysql');
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

/*
Get all items from the record.
# GET /users
# GET /users.json
*/
exports.index = function(req, res){
  console.log("index");
  var query = db.query('SELECT * FROM car', function(err, rows){
		if(err)
			console.log("Error Selecting : %s", err);

    console.log(rows);
    console.log("==================== data returen ends here ====================");
    res.json(rows);
	});
};

/*
Get an items with id = :id.
# GET /users
# GET /users.json
*/
exports.show = function(req, res){
  var id = req.params.id;
  var query = db.query('SELECT * FROM car WHERE id=' + id, function(err, rows){
		if(err)
			console.log("Error Selecting : %s", err);

		console.log(rows[0]);
    res.json(rows[0]);
	});
};

/*
Create an items and save the record.
# POST /users
# POST /users.json
*/
exports.create = function(req, res){
  console.log(req.body);
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    year    : input.year,
    make    : input.make,
    model   : input.model,
    color   : input.color
  };
  console.log(data);

  var datetime = dateTime.create().format('Y-m-d H:M:S');
  // console.log("INSERT INTO car VALUES ('"+data.id+"','"+data.address+"','"+data.email+"','"+data.phone+"');");
  var query = db.query("INSERT INTO car VALUES (null, '"+data.id+"','"+data.year+"','"+data.make+"','"+data.model+"','"+data.color+",'"+datetime+",'"+datetime+"');", function(err, rows){
    if(err) {
      console.log("Error Inserting : %s", err);
      res.json({"status":"400 Bad Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};

/*
Update an items with id = :id.
# PUT /users/1
# PUT /users/1.json
*/
exports.update = function(req, res){
	var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    year    : input.year,
    make    : input.make,
    model   : input.model,
    color   : input.color
  };
  var query = db.query("UPDATE car SET year='" + data.year + "', make='" + data.make + "', model='" + data.model + "', color='" + data.color + "' WHERE id = " + id, function(err, rows) {
    if(err) {
      console.log("Error Updating : %s ", err );
      res.json({"status":"400 Bad Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};

/*
Delete an item with id = :id
# DELETE /users/1
# DELETE /users/1.json
*/
exports.destroy = function(req,res){
  var id = req.params.id;
  var query = db.query("DELETE FROM car  WHERE id = " + id, function(err, rows) {
    if(err) {
      console.log("Error deleting : %s ",err );
      res.json({"status":"400 Bad Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};
