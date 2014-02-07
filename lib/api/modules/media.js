var URL = require('url');
var fs = require("fs");
var path = require("path");


exports.init = function(server){

	server.get('/api/media/ls', function(request, response){
		var responseObject = {
			files:[]
		}
		var parameters = URL.parse(request.url, true).query;
		var dir = path.resolve( __rootdirname + "media/" +parameters.dir);
		exports.ls(dir, function(error, files){
			responseObject.files = files;
			response.send(responseObject);
		});
	});



};


exports.ls = function(localPath, callback){

	fs.readdir(localPath, callback);

}

exports.move = function(currentPath, newPath, callback){

	//fs.readdir(localPath, callback);

}

exports.rename = function(targetFile, newName, callback){

	//fs.readdir(localPath, callback);

}

exports.upload = function(targetDirectory, callback){

	//fs.readdir(localPath, callback);

}