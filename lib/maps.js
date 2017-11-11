var db = require('db');
var googleMapsClient = require('@google/maps').createClient({
   key: 'AIzaSyBpZitbXaqqqM18mOkgxJKi-jXHze0mj1k'
});


// simple promise test
/*
let f1 = new Promise((resolve, reject) => {
  googleMapsClient.directions({
    origin: '7100 Terminal Dr, Oklahoma City, OK',
    destination: '660 Parrington Oval, Norman, OK'
  }, function(err, res) {
    let t
    if (!err) {
      // console.log(res.json.routes[0].legs[0]);
      let t = res.json.routes[0].legs[0].duration.value;
      console.log(t);

      resolve(t);
    } else {
      reject(err);
    }
  })
})

function f2(t) {
  console.log("function f2 with parameter " + t);
  let addresses = ["100 W Reno Ave, Oklahoma City, OK 73102", "4415 Highline Blvd, Oklahoma City, OK"]
  let time = []
  let promises = []

  for(let addr of addresses) {
    promises.push(f3(addr, t))
  }

  return Promise.all(promises)
}

function f3(addr, t) {
  console.log("function f3 with parameter " + addr + " and " + t);

  return new Promise((resolve, reject) => {
    googleMapsClient.directions({
      origin: '7100 Terminal Dr, Oklahoma City, OK',
      destination: '660 Parrington Oval, Norman, OK',
      waypoints: addr
    }, function(err, res) {
      if (!err) {
        let T = 0
        for (var i = 0; i < res.json.routes[0].legs.length; i++) {
          T += res.json.routes[0].legs[i].duration.value;
        }
        console.log(T)
        let time = T - t
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
    .catch(error => console.log(error))

}

go();
*/




// complex promise test

let f1 = new Promise(function(resolve, reject) {
  db.query('SELECT * FROM rides_requested where ride_request_id = 1', function(err, rows){
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

exports.match = function(req, res) {
  console.log(req.session);

  f1
    .then(f2)
    .then(f3)
    .then(success => res.json(success))
    .catch(fail => res.json(fail));
}
// ends here
