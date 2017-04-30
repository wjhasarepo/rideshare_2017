var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var passport = require('passport');

var customer = require('./routes/customer');
var index = require('./routes/index');
var device_user = require('./routes/device_user');

require('./lib/passport')(passport); // pass passport for configuration

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', index.index);
app.get('/customer', customer.index);
app.get('/customer/:id', customer.show);
app.post('/customer', customer.create);
app.delete('/customer/delete/:id', customer.destroy)
app.put('/customer/update/:id',customer.update);



app.post('/register', device_user.register);
app.get('/authenticate', device_user.authenticate);
app.post('/dashboard', device_user.dashboard);

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
