var googleMapsClient = require('@google/maps').createClient({
   key: 'AIzaSyBpZitbXaqqqM18mOkgxJKi-jXHze0mj1k'
});

let f1 = new Promise((resolve, reject) => {
  googleMapsClient.directions({
    origin: '7100 Terminal Dr, Oklahoma City, OK',
    destination: '660 Parrington Oval, Norman, OK'
  }, function(err, res) {
    let t
    if (!err) {
      t = res.json.routes[0].legs[0].duration.value;
      console.log(t);
      resolve(t);
    } else {
      reject(err);
    }
  })
})

function f2(t) {
  console.log("function f2 with parameter " + t);
  return new Promise((resolve, reject) => {
    googleMapsClient.directions({
      origin: '7100 Terminal Dr, Oklahoma City, OK',
      destination: '660 Parrington Oval, Norman, OK',
      waypoints: '4415 Highline Blvd, Oklahoma City, OK'
    }, function(err, res) {
      if (!err) {
        let T
        console.log(res.json.routes[0].legs[i]);
        T = res.json.routes[0].legs[i].duration.value;
        console.log(T);
        var time = T - t;
        console.log(time);
        resolve(time)
      } else {
        reject(err);
      }
    })
  })
}

function go() {
  console.log("start...")

  f1
    .then(f2)
    .then(response => console.log(response))

}

go();


/*
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


// promise test
var first = new Promise(function(resolve, reject) {
  connection.query('SELECT * FROM rides_requested where ride_request_id = 1', function(err, rows){
    if(err) {
      var error = new Error("Error Selecting : %s", err);
      reject(error)
    } else {
      console.log("===================== passenger information ===================");
      console.log(rows[0]);

      var passengerStartAddress = rows[0].start_address;
      var passengerDestinationAddress = rows[0].destination_address;
      var requestTime = rows[0].request_time;

      console.log(new Date(requestTime.getTime()+(10*60*1000)));

      resolve([passengerStartAddress, passengerDestinationAddress, requestTime]);
    }
  }
})

function f2([passengerStartAddress, passengerDestinationAddress, requestTime]) {
  return new Promise(function(resolve, reject) {
  connection.query("SELECT * FROM rides_offered where start_address = '"+passengerStartAddress +"'", function(err, rows){
    if(err) {
      var error = new Error("Error Selecting : %s", err);
      reject(error)
    } else {
      console.log("===================== driver information ===================");
      console.log(rows);

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
      }
    }
  }
})

function f3([driverStartAddress, driverDestinationAddress]) {
  return Promise(function(resolve, reject) {
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
        } else {
          console.log("Error Selecting : %s", err);
        }
    });
  })
}

// ends here

exports.match = function(req, res) {

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
            } else {
              console.log("Error Selecting : %s", err);
            }
        });
      }

      res.json(rows)

    })
  });
}
*/


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
