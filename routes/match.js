var db = require('../lib/db');
var dateTime = require('node-datetime');
var io = require('socket.io')();
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


function f1(user_id) {
  console.log("fetch user request with parameter " + user_id);

  return new Promise(function(resolve, reject) {
    // 'SELECT * FROM rides_requested where ride_request_id = ' + request_id
    db.query('SELECT * FROM rides_requested where user_id = ' + user_id, function(err, rows){
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
  console.log("function f2 called with parameter " + passenger);

  return new Promise(function(resolve, reject) {
    let possibleDrivers = []
    console.log(passenger.start_address);
    var query = db.query("SELECT * FROM rides_offered where start_address = '" + passenger.start_address +"';", function(err, rows){
      if(err) {
        console.log("Error Selecting : %s", err);
        console.log(query);
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
  console.log("function f3 called ");

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
};

exports.show = function(req, res) {
  console.log(req.session);

  var datetime = dateTime.create().format('Y-m-d H:M:S');

  var query = "SELECT c.ride_match_id,"
                  + " a.ride_request_id, a.start_address as req_s_addr, a.start_lat as req_s_lat, a.start_lng as req_s_lng,"
                  + " a.destination_address as req_d_addr, a.destination_lat as req_d_lat, a.destination_lng as req_d_lng,"
                  + " b.ride_offer_id, b.start_address as res_s_addr, b.start_lat as res_s_lat, b.start_lng as res_s_lng,"
                  + " b.destination_address as res_d_addr, b.destination_lat as res_d_lat, b.destination_lng as res_d_lng"
                  + " FROM rides_requested a, rides_offered b, rides_matched c, device_users d"
                  + " WHERE d.user_id = " + req.session.passport.user
                  + " and a.ride_request_id = c.ride_request_id"
                  + " and c.ride_offer_id = d.user_id"
                  + " and b.ride_offer_id = c.ride_offer_id;";

  db.query(query, function(err, rows) {
    console.log(query);
    if(err) {
      console.log("Error Inserting : %s", err);
      console.log(query);
      res.json({"status":"400 Bad Request!"});
    } else {
      console.log(rows);
      if (rows != '') {
        res.json({"status":"200 OK!", "url": "responsePage", "result":rows});
      }
      else {
        res.json(rows);
      }
    }
  });
};

exports.create = function(req, res) {
  console.log(req.body);

  var data = {
    offer_id    :req.body.offer_id,
    request_id  :req.body.request_id
  };

  var datetime = dateTime.create().format('Y-m-d H:M:S');
  // console.log("INSERT INTO users_role VALUES (null, '"+data.id+"','"+data.role+"','"+datetime+"','"+datetime+"');");
  var query = db.query("INSERT INTO rides_matched VALUES (null, '"+data.request_id+"','"+data.offer_id+"','"+datetime+"','"+datetime+"');", function(err, rows){
    if(err) {
      console.log("Error Inserting : %s", err);
      console.log(query.sql)
      res.json({"status":"400 Bad Request!"});
    } else {
      console.log(rows.insertId);
      // res.json({"status":"200 OK!", "url": "responsePage", "id": rows.insertId});
      res.json({"status":"200 OK!", "url": "transactionPage", "id": rows.insertId});
    }
  });
};

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
