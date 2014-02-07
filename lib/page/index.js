var cheerio = require('cheerio');
var component = require("./component");
var http = require('http');
var fs = require('fs');


exports.render = function(request, response){

	var uri = stripTrailingSlash(request.url);

	pixels.db.collection("content_pages").findOne({ uri:uri}, function (error, pageData) {
    	if(pageData != null){
    		
    		fs.readFile('./templates/inside.html', function (err, html) {
			    if (err) {
			        throw err; 
			    }       
			    
			    var $ = cheerio.load(html);

			    _.each(pageData.components, function(region, regionName){
			    	renderRegion(region, $('[data-pixels-id="'+regionName+'"]'));
			    });

			    response.send($.html());

			});

    	}else{
    		response.send("404");
    	}
	});

};


function renderRegion(region, $container){

	_.each(region, function(componentObject){
		
		$container.append( component.render(componentObject.type, componentObject, "en") );

	});

};
	
function stripTrailingSlash(str) {
    if(str.substr(-1) == '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
};