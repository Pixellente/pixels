var express = require('express');
var mongoose = require('mongoose');



exports.init = function(config){
	console.log(config);

	mongoose.connect(config.database);

}