var db = require('../lib/db');
var path    = require("path");
var dateTime = require('node-datetime');


/*
Get all items from the record.
# GET /role
# GET /role.json
*/
exports.index = function(req, res){
  console.log("index");
  var query = db.query('SELECT * FROM users_role', function(err, rows){
		if(err)car
			console.log("Error Selecting : %s", err);

    console.log(rows);
    console.log("==================== data returen ends here ====================");
    res.json(rows);
	});
};

/*
Get an items with id = :id.
# GET /role
# GET /role.json
*/
exports.show = function(req, res){
  var id = req.params.id;
  var query = db.query('SELECT * FROM users_role WHERE id=' + id, function(err, rows){
		if(err)
			console.log("Error Selecting : %s", err);

		console.log(rows[0]);
    res.json(rows[0]);
	});
};

/*
Create an items and save the record.
# POST /role
# POST /role.json
*/
exports.create = function(req, res){
  console.log(req.session);
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    id    : req.session.passport.user_id,
    role  : input.role
  };
  console.log(data);

  var datetime = dateTime.create().format('Y-m-d H:M:S');
  // console.log("INSERT INTO users_role VALUES (null, '"+data.id+"','"+data.role+"','"+datetime+"','"+datetime+"');");
  var query = db.query("INSERT INTO users_role VALUES (null, '"+data.id+"','"+data.role+"','"+datetime+"','"+datetime+"');", function(err, rows){
    if(err) {
      console.log("Error Inserting : %s", err);
      res.json({"status":"400 Bad Request!"});
    } else {
      // res.sendFile(path.join(__dirname+'/../views/profile.html'));
      // res.redirect('./views/profile.html');
      // res.json({"status":"200 OK!"});
      res.json({"status":"200 OK!", "url": "requestPage"});
    }
  });
};

/*
Update an items with id = :id.
# PUT /role/1
# PUT /role/1.json
*/
exports.update = function(req, res){
	var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    type    : input.type
  };
  var query = db.query("UPDATE users_role SET type='" + data.type + "' WHERE id = " + id, function(err, rows) {
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
# DELETE /role/1
# DELETE /role/1.json
*/
exports.destroy = function(req,res){
  var id = req.params.id;
  var query = db.query("DELETE FROM users_role  WHERE id = " + id, function(err, rows) {
    if(err) {
      console.log("Error deleting : %s ",err );
      res.json({"status":"400 Bad Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};
