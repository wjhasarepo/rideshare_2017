var db = require('../lib/db');
var dateTime = require('node-datetime');
var googleMapsClient = require('@google/maps').createClient({
   key: 'AIzaSyBpZitbXaqqqM18mOkgxJKi-jXHze0mj1k'
});

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


function f1(request_id) {
  console.log("function f1 with parameter " + request_id);

  return new Promise(function(resolve, reject) {
    db.query('SELECT * FROM rides_requested where ride_request_id = ' + request_id, function(err, rows){
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

        let passenger = rows[0]
        // obj.passengerStartAddress = passengerStartAddress
        // obj.passengerDestinationAddress = passengerDestinationAddress
        // obj.requestTime = requestTime

        resolve(passenger);
      }
    })
  })
}


function f2(passenger) {
  console.log("function f2 with parameter " + passenger);

  return new Promise(function(resolve, reject) {
    let possibleDrivers = []

    db.query("SELECT * FROM rides_offered where start_address = '" + passenger.start_address +"'", function(err, rows){
      if(err) {
        let error = new Error("Error Selecting : %s", err);
        reject(error)
      } else {
        console.log("===================== driver information ===================");
        console.log(rows);

        for(let row of rows) {

          // console.log(row.offer_time.getTime() - passenger.request_time.getTime());

          // error calculation without this statement, need further test
          if(row.offer_time.getTime() - passenger.request_time.getTime() > 10*60*1000)
            break;

          // let obj.driverStartAddress = row.start_address;
          // let obj.driverDestinationAddress = row.destination_address;
          // let obj.passen = row.offer_time;

          possibleDrivers.push(row);
        }

        let obj = {};
        obj.passenger = passenger;
        obj.possibleDrivers = possibleDrivers

        resolve(obj);
      }
    })
  })
}

function f3(params) {
  console.log("function 3 called ");

  let promises = []

  for(let driver of params.possibleDrivers) {
    promises.push(f4(params.passenger, driver))
  }

  // Promise.all(promises).then(function(results){return results;});
  return Promise.all(promises);
}

function f4(passenger, driver) {
  console.log(driver);

  return new Promise(function(resolve, reject) {
    googleMapsClient.directions({
      origin: driver.start_address,
      destination: driver.destination_address
    }, function(err, res) {
        let t1 = 0, t2 = 0;
        if (!err) {
          // console.log(res.json.routes[0].legs);
          t1 = res.json.routes[0].legs[0].duration.value;

          googleMapsClient.directions({
            origin: driver.start_address,
            destination: driver.destination_address,
            waypoints: passenger.destination_address
          }, function(err, res) {
            if (!err) {
              for (var i = 0; i < res.json.routes[0].legs.length; i++)
                t2 += res.json.routes[0].legs[i].duration.value;
              }

              console.log((t2 - t1)/60 + "min");
              resolve(driver);

          });

        } else {
          console.log("Error Selecting : %s", err);
        }
    });
  })
}

exports.index = function(req, res) {
  console.log(req.session);

  f1(req.session.passport.user)
    .then(f2)
    .then(f3)
    .then(success => res.json(success))
    .catch(fail => res.json(fail));
}

exports.create = function(req, res) {
  console.log(req.body);

  var data = {
    offer_id    :req.body.offer_id,
    request_id  :req.body.request_id
  };
  console.log(data);

  var datetime = dateTime.create().format('Y-m-d H:M:S');
  // console.log("INSERT INTO users_role VALUES (null, '"+data.id+"','"+data.role+"','"+datetime+"','"+datetime+"');");
  var query = db.query("INSERT INTO rides_matched VALUES (null, '"+data.offer_id+"','"+data.request_id+"','"+datetime+"','"+datetime+"');", function(err, rows){
    if(err) {
      console.log("Error Inserting : %s", err);
      res.json({"status":"400 Bad Request!"});
    } else {
      res.json({"status":"200 OK!", "url": "response"});
    }
  });
}

/*
exports.match = function(req, res) {

  db.query('SELECT * FROM rides_requested where ride_request_id = 1', function(err, rows){
    if(err)
      console.log("Error Selecting : %s", err);

    console.log("===================== passenger information ===================");
    console.log(rows[0]);

    var passengerStartAddress = rows[0].start_address;
    var passengerDestinationAddress = rows[0].destination_address;
    var requestTime = rows[0].request_time;

    console.log(new Date(requestTime.getTime()+(10*60*1000)));

    db.query("SELECT * FROM rides_offered where start_address = '"+passengerStartAddress +"'", function(err, rows){
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
