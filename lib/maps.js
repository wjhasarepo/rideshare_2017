var googleMapsClient = require('@google/maps').createClient({
   key: 'AIzaSyBpZitbXaqqqM18mOkgxJKi-jXHze0mj1k'
});

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'jzl000jzl',
  database : 'rideshare',
  // dateStrings : true
});

connection.connect(function(err) {
  if(err)
    console.log("Error connecting database! :( ");
  else
    console.log("Database is connected for passport! :) ");
});

connection.query('SELECT * FROM rides_requested where ride_request_id = 1', function(err, rows){
  if(err)
    console.log("Error Selecting : %s", err);

  console.log("===================== passenger information ===================");
  console.log(rows[0]);

  var passengerStartAddress = rows[0].start_address;
  var passengerDestinationAddress = rows[0].destination_address;
  var requestTime = rows[0].request_time;

  console.log(new Date(requestTime.getTime()+(10*60*1000)));

  connection.query("SELECT * FROM rides_offered where start_address = '"+passengerStartAddress +"'", function(err, rows){
    if(err)
      console.log("Error Selecting : %s", err);

    var found_rides = [];

    for(row of rows) {
      // error calculation without this statement, need further test
      if(row.offer_time.getTime() - requestTime.getTime() > 10*60*1000)
        break;

      var driverStartAddress = row.start_address;
      var driverDestinationAddress = row.destination_address;
      var offerTime = row.offer_time;

      console.log(driverStartAddress);
      console.log(driverDestinationAddress);
      console.log(offerTime);

      var t1 = 0, t2 = 0;

      googleMapsClient.directions({
          origin: driverStartAddress,
          destination: driverDestinationAddress
      }, function(err, res) {
          var t1 = 0, t2 = 0;
          if (!err) {
      	    // console.log(res.json.routes[0].legs);
            t1 = res.json.routes[0].legs[0].duration.value;

      	    googleMapsClient.directions({
              origin: driverStartAddress,
              destination: driverDestinationAddress,
              waypoints: passengerDestinationAddress
            }, function(err, res) {
              if (!err) {
                // console.log(res.json.routes[0].legs);
        		    for (var i = 0; i < res.json.routes[0].legs.length; i++)
        		      t2 += res.json.routes[0].legs[i].duration.value;
        	    }

        	    console.log((t2 - t1)/60 + "min");
              console.log("\n");

            });
          }
      });
    }

  })
});

/*
googleMapsClient.directions({
    origin: '7100 Terminal Dr, Oklahoma City, OK',
    destination: '660 Parrington Oval, Norman, OK'
}, function(err, res) {
    var t1 = 0, t2 = 0;
    if (!err) {
	console.log(res.json.routes[0].legs);
        t1 = res.json.routes[0].legs[0].duration.value;
	googleMapsClient.directions({
   	    origin: '7100 Terminal Dr, Oklahoma City, OK',
    	    destination: '660 Parrington Oval, Norman, OK',
            waypoints: '4415 Highline Blvd, Oklahoma City, OK'
        }, function(err, res) {
            if (!err) {
                console.log(res.json.routes[0].legs);
		for (var i = 0; i < res.json.routes[0].legs.length; i++)
		    t2 += res.json.routes[0].legs[i].duration.value;
	    }
	    console.log(t2 - t1);
        });
    }
});
*/