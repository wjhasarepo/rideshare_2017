var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");

var customer = require('./routes/customer');
var index = require('./routes/index');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', index.index);
app.get('/customer', customer.index);
app.get('/customer/:id', customer.show);
// app.get('/customer', customer.show);
app.post('/customer', customer.create);
// app.get('/customers/add', customers.create);
// app.post('/customers/add', customers.save);
app.delete('/customer/delete/:id', customer.destroy)
// app.get('/customers/delete/:id', customers.delete_customer);
//app.get('/customers/edit/:id', customers.edit);
app.put('/customer/update/:id',customer.update);

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


app.listen(8080, ()=>{
    console.log('App listening on port 8080');
});
