var path    = require("path");

/*
 * home page.
 */
 exports.index = function(req,res){
   res.render("Hello, World!");
   //__dirname : It will resolve to your project folder.
 };

 exports.login = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/loginPage.html'));
 };

 exports.role = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/rolePage.html'));
 };

 exports.profile = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/profilePage.html'));
 };

 exports.ride = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/ridePage.html'));
 };

 exports.request = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/requestPage.html'));
 };

 exports.response = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/responsePage.html'));
 };

 exports.offer = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/offerPage.html'));
 };

 exports.match = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/matchPage.html'));
 };

 exports.transaction = function(req,res){
   res.sendFile(path.join(__dirname+'/../views/transactionPage.html'));
 };
