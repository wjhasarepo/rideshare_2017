var db = require('../lib/db');
var path    = require("path");
var dateTime = require('node-datetime');


/*
Get all items from the record.
# GET /transaction
# GET /transaction.json
*/
exports.index = function(req, res){
  console.log("index");
  var query = db.query('SELECT * FROM rides_transactions', function(err, rows){
		if(err)car
			console.log("Error Selecting : %s", err);

    console.log(rows);
    console.log("==================== data returen ends here ====================");
    res.json(rows);
	});
};

/*
Get an items with id = :id.
# GET /transaction
# GET /transaction.json
*/
exports.show = function(req, res){
  var id = req.params.id;
  var query = db.query('SELECT * FROM rides_transactions WHERE id=' + id, function(err, rows){
		if(err)
			console.log("Error Selecting : %s", err);

		console.log(rows[0]);
    res.json(rows[0]);
	});
};

/*
Create an items and save the record.
# POST /transaction
# POST /transaction.json
*/
exports.create = function(req, res){
  console.log(req.body);
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    id      : req.body.ride_match_id,
    status  : 'pending'
  };
  console.log(data);

  var datetime = dateTime.create().format('Y-m-d H:M:S');
  // console.log("INSERT INTO rides_transactions VALUES (null, '"+data.id+"','"+data.transaction+"','"+datetime+"','"+datetime+"');");
  var query = db.query("INSERT INTO rides_transactions VALUES (null, '"+data.id+"','"+data.status+"','"+datetime+"','"+datetime+"');", function(err, rows){
    if(err) {
      console.log("Error Inserting : %s", err);
      res.json({"status":"400 Bad Request!"});
    } else {
      // res.json({"status":"200 OK!"});
      res.json({"status":"200 OK!", "url": "request"});
    }
  });
};

/*
Update an items with id = :id.
# PUT /transaction/1
# PUT /transaction/1.json
*/
exports.update = function(req, res){
	var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
    status    : 'complete'
  };
  var query = db.query("UPDATE rides_transactions SET type='" + data.status + "' WHERE id = " + id, function(err, rows) {
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
# DELETE /transaction/1
# DELETE /transaction/1.json
*/
exports.destroy = function(req,res){
  var id = req.params.id;
  var query = db.query("DELETE FROM rides_transactions  WHERE id = " + id, function(err, rows) {
    if(err) {
      console.log("Error deleting : %s ",err );
      res.json({"status":"400 Bad Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};
