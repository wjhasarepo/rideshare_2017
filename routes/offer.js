var db = require('../lib/db');


/*
Get all items from the record.
# GET /offer
# GET /offer.json
*/
exports.index = function(req, res){
  console.log("index");
  var query = connection.query('SELECT * FROM rides_offered', function(err, rows){
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
# GET /offer
# GET /offer.json
*/
exports.show = function(req, res){
  var id = req.params.id;
  var query = connection.query('SELECT * FROM rides_offered WHERE id=' + id, function(err, rows){
		if(err)
			console.log("Error Selecting : %s", err);

		console.log(rows[0]);
    res.json(rows[0]);
	});
};

/*
Create an items and save the record.
# POST /offer
# POST /offer.json
*/
exports.create = function(req, res){
  console.log(req.body);
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {
      available_passengers  : input.passengers,
      available_bags        : input.bags,
      offer_time            : input.offer_time,
      start_address         : input.start_address,
      start_lat             : input.start_lat,
      start_lng             : input.start_lng,
      destination_address   : input.destination_address,
      destination_lat       : input.destination_lat,
      destination_lng       : input.destination_lng,
      flexible_value        : input.flexible_value
  };
  console.log(data);

  var dummy = dateTime.create('1000-01-01 16:00:00').format('Y-m-d H:M:S');
  console.log(dummy);
  var datetime = dateTime.create().format('Y-m-d H:M:S');
  console.log(datetime);

  var query = connection.query("INSERT INTO rides_offered VALUES (null, '"+data.offer_time+"','"+data.start_address+"','"+data.start_lat+"','"+data.start_lng+"','"+data.destination_address+"','"+data.destination_lat+"','"+data.destination_lng+"','"+data.available_passengers+"','"+data.available_bags+"','"+data.flexible_value+"','"+dateTime+"','"+dateTime+");", function(err, rows){
    if(err) {
      console.log("INSERT INTO rides_offered VALUES (null, '"+data.offer_time+"','"+data.start_address+"','"+data.start_lat+"','"+data.start_lng+"','"+data.destination_address+"','"+data.destination_lat+"','"+data.destination_lng+"','"+data.available_passengers+"','"+data.available_bags+"','"+data.flexible_value+"','"+dateTime+"','"+dateTime+");");
      console.log("Error Inserting : %s", err);
      res.json({"status":"400 Back Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};

/*
Update an items with id = :id.
# PUT /offer/1
# PUT /offer/1.json
*/
exports.update = function(req, res){
	var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  var data = {};

  // loop through input data

  var query = connection.query("UPDATE rides_offered SET passengers='" + data.passengers + "', bags='" + data.bags + "', start_address='" + data.start_address + "', destination_address='" + data.destination_address + "' WHERE id = " + id, function(err, rows) {
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
# DELETE /offer/1
# DELETE /offer/1.json
*/
exports.destroy = function(req,res){
  var id = req.params.id;
  connection.query("DELETE FROM rides_offered  WHERE id = " + id, function(err, rows) {
    if(err) {
      console.log("Error deleting : %s ",err );
      res.json({"status":"400 Back Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};
