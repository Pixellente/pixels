var URL = require('url');
var fs = require("fs");
var path = require("path");


exports.init = function(server){

	server.get('/api/user/login', function(request, response){
		var responseObject = {};

		var parameters = URL.parse(request.url, true).query;
		var dir = path.resolve( __rootdirname + "media/" +parameters.dir);
		if(parameters.redirect == undefined){
			parameters.redirect = "/";
		}
		exports.login(parameters.username, parameters.password, function(){
				
			request.flash("user-error", "Incorrect username/password.");
			response.redirect(parameters.redirect);

		});
	});



};


exports.login = function(username, password, callback){

	callback();

}
