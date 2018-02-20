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

 exports.role = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/role.html'));
 };

 exports.profile = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/profile.html'));
 };

 exports.ride = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/ride.html'));
 };

 exports.request = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/request.html'));
 };

 exports.response = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/response.html'));
 };

 exports.offer = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/offer.html'));
 };
