var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");

var customers = require('./routes/customer');
var index = require('./routes/index');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'jzl000jzl',
    database : 'mysql',
    debug    : false
});

function handle_database(req,res) {
   
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       
        connection.query("select * from user",function(err,rows){
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
*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', index.index);
app.get('/customers', customers.show);
app.get('/customers/add', customers.create);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.update);
app.post('/customers/edit/:id',customers.save_edit);

app.listen(3000);
