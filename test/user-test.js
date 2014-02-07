var cheerio = require('cheerio');
var http = require('http');
var path = require('path');
var fs = require('fs');



exports.render = function(request, response, context){

	if(context == undefined){
		context = {};
	}

	fs.readFile(path.resolve("test/"+path.basename(__filename, '.js')+".view.html"), function (err, html) {
	    if (err) {
	        throw err; 
	    }       
	    
	    $ = cheerio.load(html);

	    exports.ready(request, response, $, context);

	});

}


exports.ready = function(request, response, $){


	// if(request.flash != undefined){
	//console.log(request.flash);
	$("body").append( request.flash("user-error") );
	// }
	
	$("body").append( Templates.render("login") );

	response.send($.html());

}



