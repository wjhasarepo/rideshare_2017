var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'keybridge!',
    database : 'rideshare'
});

connection.connect(function(err) {
  if(err)
    console.log("Error connecting database! :( ");
  else
    console.log("Database is connected! :) ");
});

module.exports = connection;
