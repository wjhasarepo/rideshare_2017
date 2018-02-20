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

// var pool = mysql.createPool({
//    connectionLimit : 100, //important
//    host     : 'localhost',
//    user     : 'root',
//    password : '',
//    database : 'address_book',
//    debug    :  false
// });
//
// var dbConnection = (function () {
//     function conn(query, params, callback) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 connection.release();
//                 callback(null, err);
//                 throw err;
//             }
//
//             connection.query(query, params, function (err, rows) {
//                 connection.release();
//                 if (!err) {
//                     callback(rows);
//                 }
//                 else {
//                     callback(null, err);
//                 }
//
//             });
//
//             connection.on('error', function (err) {
//                 connection.release();
//                 callback(null, err);
//                 throw err;
//             });
//         });
//     };
//
//     return {
//         query: conn
//     };
// })();


module.exports = connection;
