var express = require('express');
var mongoose = require('mongoose');



exports.init = function(config){
	console.log(config);

	mongoose.connect(config.database,function (err, res) {
		if (err) {
			console.log ('ERROR connecting to: ' + config.database + '. ' + err);
		} else {
			console.log ('Succeeded connected to: ' + config.database);
		}
	});

}