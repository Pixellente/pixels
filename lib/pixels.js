var express = require('express');
var mongoose = require('mongoose');
var server = express();

pixels = {};

exports.init = function(config){
	console.log(config);

	pixels.db = mongoose.createConnection(config.database,function (err, res) {
		if (err) {
			console.log ('ERROR connecting to: ' + config.database + '. ' + err);
		} else {
			console.log ('Succeeded connected to: ' + config.database);

			server.use(express.bodyParser());

			//all routes
			server.get('/*', function (req, res) {

				console.log("Request:"+req.url);
				res.send(req.url);
				   // db.findPage({ slug: req.url}, function (err, pageData) {
				   //     res.render('page-template', {
				   //         pageContent: pageData.content,
				   //         pageTitle: pageData.title
				   //     });
				   // });
			});

			if(process.env.PORT == undefined){
				process.env.PORT = 3000;
			}
			
			server.listen(process.env.PORT);
			console.log("Server running on "+process.env.PORT);

			// pixels.db.collection("users", function (err, collection) {
		 //    	collection.find({}).toArray(function(err, results){
		 //    		console.log(results);
		 //    	});
		 //    });

			

		}
	}).db;

}