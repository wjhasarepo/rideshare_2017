var mysql = require('mysql');

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



/*
Get all items from the record.
# GET /requests
# GET /requests.json
*/
exports.index = function(req, res){
  console.log("index");
  var query = connection.query('SELECT * FROM rides_requested', function(err, rows){
		if(err)
			console.log("Error Selecting : %s", err);

    console.log("==================== data return block ======================");
    console.log(rows);
    console.log("=============================================================");
    res.json(rows);
	});
};

/*
Get an items with id = :id.
# GET /requests
# GET /requests.json
*/
exports.show = function(req, res){
  var id = req.params.id;
  console.log('SELECT * FROM rides_requested WHERE user_id=' + id);
  var query = connection.query('SELECT * FROM rides_requested WHERE user_id=' + id, function(err, rows){
		if(err)
			console.log("Error Selecting : %s", err);

		console.log(rows);
    res.json(rows[0]);
	});
};

/*
Create an items and save the record.
# POST /requests
# POST /requests.json
*/
exports.create = function(req, res){
  console.log(req.body);
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
      passengers            : input.passengers,
      bags                  : input.bags,
      request_time          : input.request_time,
      start_address         : input.start_address,
      start_lat             : input.start_lat,
      start_lng             : input.start_lng,
      destination_address   : input.destination_address,
      destination_lat       : input.destination_lat,
      destination_lng       : input.destination_lng
  };
  console.log(data);

  var dummy = dateTime.create('1000-01-01 16:00:00').format('Y-m-d H:M:S');
  console.log(dummy);
  var datetime = dateTime.create().format('Y-m-d H:M:S');
  console.log(datetime);

  var query = connection.query("INSERT INTO rides_requested VALUES (null, '"+data.passengers+"','"+data.bags+"','"+data.request_time+"','"+data.start_address+"','"+data.start_lat+"','"+data.start_lng+"','"+data.destination_address+"','"+data.destination_lat+"','"+data.destination_lng+"','"+dateTime+"','"+dateTime+");", function(err, rows){
    if(err) {
      console.log("INSERT INTO rides_requested VALUES ('"+data.passengers+"','"+data.bags+"','"+data.start_address+"','"+data.start_lat+"');");
      console.log("Error Inserting : %s", err);
      res.json({"status":"400 Back Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};

/*
Update an items with id = :id.
# PUT /requests/1
# PUT /requests/1.json
*/
exports.update = function(req, res){
	var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {};

  // loop through input data

  var query = connection.query("UPDATE rides_requested SET passengers='" + data.passengers + "', bags='" + data.bags + "', start_address='" + data.start_address + "', destination_address='" + data.destination_address + "' WHERE user_id = " + id, function(err, rows) {
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
# DELETE /requests/1
# DELETE /requests/1.json
*/
exports.destroy = function(req,res){
  var id = req.params.id;
  connection.query("DELETE FROM rides_requested  WHERE user_id = " + id, function(err, rows) {
    if(err) {
      console.log("Error deleting : %s ",err );
      res.json({"status":"400 Back Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};