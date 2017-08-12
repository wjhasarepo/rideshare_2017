var path    = require("path");

/*
 * home page.
 */
 exports.index = function(req,res){
   res.render("Hello, World!");
   //__dirname : It will resolve to your project folder.
 };

 exports.login = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/login.html'));
 };

 exports.profile = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/profile.html'));
 };
