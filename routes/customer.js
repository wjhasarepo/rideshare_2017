var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'keybridge!',
  database : 'mysqltestdb'
});

connection.connect(function(err) {
  if(err)
    console.log("Error connecting database! :( ");
  else
    console.log("Database is connected! :) ");
});

/*
exports.create = function(req, res){
	res.render('add_customer',{page_title:"Add Customers - Node.js"});
};

exports.edit = function(req, res) {
  console.log(req.body);
  var id = req.params.id;
  var data = {
      name    : req.body.name,
      address : req.body.address,
      email   : req.body.email,
      phone   : req.body.phone
  };

  connection.query("UPDATE customer set " + data + " WHERE id = " + id, function(err, rows) {
    if (err)
      console.log("Error Updating : %s ",err );
    res.redirect('/customers');
  });
};

exports.save = function(req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
      name    : input.name,
      address : input.address,
      email   : input.email,
      phone   : input.phone
  };

  var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows) {
    if (err)
      console.log("Error inserting : %s ",err );
    res.redirect('/customers');
  });

  console.log(query.sql);
};
*/

/*
Get all items from the record.
# GET /users
# GET /users.json
*/
exports.index = function(req, res){
  console.log("index");
  var query = connection.query('SELECT * FROM customer', function(err, rows){
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
  var query = connection.query('SELECT * FROM customer WHERE id=' + id, function(err, rows){
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
      name    : input.name,
      address : input.address,
      email   : input.email,
      phone   : input.phone
  };
  console.log(data);
  console.log("INSERT INTO customer VALUES ('"+data.name+"','"+data.address+"','"+data.email+"','"+data.phone+"');");
  var query = connection.query("INSERT INTO customer VALUES (12, '"+data.name+"','"+data.address+"','"+data.email+"','"+data.phone+"');", function(err, rows){
    if(err) {
      console.log("Error Inserting : %s", err);
      res.json({"status":"400 Back Request!"});
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
      name    : input.name,
      address : input.address,
      email   : input.email,
      phone   : input.phone
  };
  var query = connection.query("UPDATE customer SET name='" + data.name + "', address='" + data.address + "', email='" + data.email + "', phone='" + data.phone + "' WHERE id = " + id, function(err, rows) {
    if(err) {
      console.log("Error Selecting : %s ", err );
      res.json({"status":"400 Back Request!"});
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
  connection.query("DELETE FROM customer  WHERE id = " + id, function(err, rows) {
    if(err) {
      console.log("Error deleting : %s ",err );
      res.json({"status":"400 Back Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};
