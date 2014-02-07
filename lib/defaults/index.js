var content_pages = require("./content_pages");
var user_roles = require("./user_roles");

exports.reset = function(){

	pixels.db.collection('content_pages').drop(function(){
		pixels.db.collection('content_pages', function(error, collection) {
	        collection.insert(content_pages, {safe:true}, function(error, result) {});
	    });
	});

	pixels.db.collection('user_roles').drop(function(){
		pixels.db.collection('user_roles', function(error, collection) {
	        collection.insert(user_roles, {safe:true}, function(error, result) {});
	    });
	});

};