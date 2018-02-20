var express = require("express");
var mysql = require('mysql');
var app = express();

var pool = mysql.createPool({
  connectionLimit : 128, //important
  host     : 'localhost',
  user     : 'root',
  password : 'jzl000jzl',
  database : 'rideshare',
  debug    :  false
});

function handle_database(req,res) {

  pool.getConnection(function(err,connection){
    if (err) {
      connection.release();
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("SELECT * FROM rides_offered where offer_time = '2017-05-02 16:10:00'", function(err,rows){
      // console.log("executing query : SELECT * FROM rides_offered");
      connection.release();
      if(!err) {
        res.json(rows);
      }
    });

    connection.on('error', function(err) {
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    });
  });
}

app.get("/",function(req,res){-
  handle_database(req,res);
});

app.listen(3000);
