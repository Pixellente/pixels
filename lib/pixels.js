var express = require('express');
var flash = require('connect-flash');
var fs = require('fs');
var path = require('path');
var page = require('./page');
var api = require('./api');
var defaults = require('./defaults');
var mongoose = require('mongoose');
var server = express();


__rootdirname = global.__rootdirname = process.cwd() + '/';
Templates = require('./templates');
_ = require("underscore/underscore-min.js");

pixels = {};


exports.init = function(config){
	pixels.config = config;

	Templates.compile(function(){
		exports.connect();
	});

}

exports.connect = function(){
	console.log("Connecting to database...");
	pixels.db = mongoose.createConnection(pixels.config.database,function (err, res) {
		if (err) {
			console.log ('ERROR connecting to: ' + pixels.config.database + '. ' + err);
		} else {
			//console.log ('Succeeded connected to: ' + pixels.config.database);

			exports.route();
			exports.startServer();

		}
	}).db;

};


exports.route = function(){
	if(process.argv.indexOf("--dbreset") != -1){
		defaults.reset();
	}
  	server.use(express.cookieParser('keyboard cat'));
  	server.use(express.session({ cookie: { maxAge: 60000 }}));
	server.use(express.bodyParser());
	server.use(flash());

	//test
	server.get('/test/*', function (req, res) {

		var uri = req.url;
		var dir = path.dirname(uri);
		var base = path.basename(uri);
		var filePath = ".."+dir+"/"+base+".js";
		//var path = ".."+req.url;

		try{
			var rendered = require(filePath).render(req, res);

			delete require.cache[require.resolve(filePath)];
		}catch(e){

		}


		
	});

	//images, documtents
	server.get('/media/*', function (req, res) {

		var filePath = require('path').resolve( __rootdirname + req.url);

		fs.exists(filePath, function(exists) {
			if (exists) {
				// serve file
				res.sendfile(filePath);
			} else {
				// mongodb
				res.send("404 - File does not exhist.");
			}
		});

		
	});

	//css, scripts, etc
	server.get('/template/*', function (req, res) {
		var filePath = require('path').resolve( __rootdirname + req.url);

		fs.exists(filePath, function(exists) {
			if (exists) {
				// serve file
				res.sendfile(filePath);
			} else {
				// mongodb
				res.send("404 - File does not exhist.");
			}
		});
	});

	//apis init
	api.init(server);

	//all other routes are assumed to be pages
	server.get('*', function (req, res) {
		page.render(req, res);
	});

};


exports.startServer = function(){

	if(process.env.PORT == undefined){
		process.env.PORT = 8080;
	}
	server.listen(process.env.PORT);
	console.log("Server running on "+process.env.PORT);

};