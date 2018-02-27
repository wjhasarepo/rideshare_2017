var db = require('../lib/db');
var googleMapsClient = require('@google/maps').createClient({
   key: 'AIzaSyBpZitbXaqqqM18mOkgxJKi-jXHze0mj1k'
});

/*
Get all items from the record.
# GET /requests
# GET /requests.json
*/
exports.index = function(req, res){
  console.log("index");
  console.log("---------------------------------------------------------------");
  console.log("user session: " + req.session);
  for(key in req.session){
    if (user.hasOwnProperty(key)) {
      console.log("Key is " + key + ", value is " + req.session[key]);
    }
  }

  var query = db.query('SELECT * FROM rides_requested', function(err, rows){
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
# GET /requests/id
# GET /requests.json
*/
exports.show = function(req, res){
  console.log("---------------------------------------------------------------");
  console.log("user session: " + req.session);
  for(key in req.session){
    if (req.session.hasOwnProperty(key)) {
      console.log("* Key is " + key + ", value is " + req.session[key]);
      // for(k in req.session[key]){
      //   if (req.session[key].hasOwnProperty(k)) {
      //     console.log("* Key is " + k + ", value is " + req.session[key][k]);
      //   }
      // }
    }
  }

  var id = req.params.id;

  console.log('SELECT * FROM rides_requested WHERE user_id=' + id);
  var query = db.query('SELECT * FROM rides_requested WHERE user_id=' + id, function(err, rows){
		if(err)
			console.log("Error Selecting : %s", err);
    else {

    }
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

  var query = db.query("INSERT INTO rides_requested VALUES (null, '"+data.passengers+"','"+data.bags+"','"+data.request_time+"','"+data.start_address+"','"+data.start_lat+"','"+data.start_lng+"','"+data.destination_address+"','"+data.destination_lat+"','"+data.destination_lng+"','"+dateTime+"','"+dateTime+");", function(err, rows){
    if(err) {
      console.log("INSERT INTO rides_requested VALUES ('"+data.passengers+"','"+data.bags+"','"+data.start_address+"','"+data.start_lat+"');");
      console.log("Error Inserting : %s", err);
      res.json({"status":"400 Back Request!"});
    } else {
      res.json({"status":"200 OK!", "url":"profilePage"});
    }
  });
};

/*
Update an items with id = :id.
# PUT /requests/1
# PUT /requests/1.json
*/
exports.update = function(req, res){
  console.log(req.body);
	var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  googleMapsClient.geocode({
    address: input.destination_address
  }, function(err, response) {
    if (!err) {
      console.log("================= results with geocoding =================");
      console.log(response.json.results[0].geometry);
      var data = {
          passengers            : input.passengers,
          bags                  : input.bags,
          request_time          : input.request_time,
          start_address         : input.start_address,
          destination_address   : input.destination_address,
          destination_lat       : response.json.results[0].geometry.location.lat,
          destination_lng       : response.json.results[0].geometry.location.lng
      };
      console.log(data);

      var query = db.query("UPDATE rides_requested SET passengers='" + data.passengers + "', bags='" + data.bags + "', start_address='" + data.start_address + "', destination_address='" + data.destination_address + "', destination_lat='" + data.destination_lat + "', destination_lng='" + data.destination_lng + "' WHERE user_id = " + id, function(err, rows) {
        if(err) {
          console.log("Error Selecting : %s ", err );
          res.json({"status":"400 Back Request!"});
        } else {
          res.json({"status":"200 OK!", "url":"profilePage"});
        }
      });
    }
  });

  // var data = {
  //     passengers            : input.passengers,
  //     bags                  : input.bags,
  //     request_time          : input.request_time,
  //     start_address         : input.start_address,
  //     destination_address   : input.destination_address,
  // };
  //
  // console.log(data);
  //
  // var query = db.query("UPDATE rides_requested SET passengers='" + data.passengers + "', bags='" + data.bags + "', start_address='" + data.start_address + "', destination_address='" + data.destination_address + "' WHERE user_id = " + id, function(err, rows) {
  //   if(err) {
  //     console.log("Error Selecting : %s ", err );
  //     res.json({"status":"400 Back Request!"});
  //   } else {
  //     res.json({"status":"200 OK!", "url":"profilePage"});
  //   }
  // });
};

/*
Delete an item with id = :id
# DELETE /requests/1
# DELETE /requests/1.json
*/
exports.destroy = function(req,res){
  var id = req.params.id;
  var query = db.query("DELETE FROM rides_requested  WHERE user_id = " + id, function(err, rows) {
    if(err) {
      console.log("Error deleting : %s ",err );
      res.json({"status":"400 Back Request!"});
    } else {
      res.json({"status":"200 OK!"});
    }
  });
};
