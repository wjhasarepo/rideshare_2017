var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'jzl000jzl',
  database : 'test'
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

exports.create = function(req, res){
		res.render('add_customer',{page_title:"Add Customers - Node.js"});
};

exports.save = function(req, res) {
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    //req.getConnection(function (err, connection) {
        
    var data = {
        
        name    : input.name,
        address : input.address,
        email   : input.email,
        phone   : input.phone 
    
    };
    
    var query = connection.query("INSERT INTO customer set ? ",data, function(err, rows)
    {

      if (err)
          console.log("Error inserting : %s ",err );
     
      res.redirect('/customers');
      
    });
        
       // console.log(query.sql); get raw query
    //});
};

exports.show = function(req, res){

    //req.getConnection(function(err, connection){
    var query = connection.query('SELECT * FROM customer', function(err, rows){
  	
				if(err)
						console.log("Error Selecting : %s", err);

  			res.render('customer', {page_title:"Customers - Node.js", data:rows});

		});
    //});
};

exports.update = function(req, res){
		
		var id = req.params.id;
    
    //req.getConnection(function(err,connection){
       
    var query = connection.query('SELECT * FROM customer WHERE id = ?',[id],function(err,rows)
    {
        
        if(err)
            console.log("Error Selecting : %s ",err );
 
        res.render('edit_customer', {page_title:"Edit Customers - Node.js",data:rows});

    });

    //});
};

exports.save_edit = function(req, res) {

    console.log(req.body);

    var id = req.params.id;
    
    //req.getConnection(function (err, connection) {
        
    var data = {       
        name    : req.body.name,
        address : req.body.address,
        email   : req.body.email,
        phone   : req.body.phone      
    };
    
    connection.query("UPDATE customer set " + data + " WHERE id = " + id, function(err, rows) {

      if (err)
          console.log("Error Updating : %s ",err );
     
      res.redirect('/customers');
      
    });
    
    //});
};


exports.delete_customer = function(req,res){
          
    var id = req.params.id;
    
    //req.getConnection(function (err, connection) {
        
    connection.query("DELETE FROM customer  WHERE id = ? ",[id], function(err, rows)
    {
        
         if(err)
             console.log("Error deleting : %s ",err );
        
         res.redirect('/customers');
         
    });
        
    //});
};
