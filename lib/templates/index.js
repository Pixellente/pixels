var fs = require("fs");
var path = require("path");
var Handlebars = require('handlebars');

var compiled = {};
var toCompile = [];
var toCompileCount = 0;
var finishedCallback = null;

exports.compile = function(callback){

	console.log("Compiling templates...");

	toCompile = [];
	toCompileCount = 0;
	finishedCallback = callback;

	fs.readdirSync(__dirname).forEach(function(file) {
		if(path.extname(file) == ".hbs"){
			fs.exists(file, function(exists) {
				if (exists) {
					toCompile.push(file);
				}
			});
		}
	});

	_.each(toCompile, function(file){
		exports.compileTemplate(file);
	},this);

	if(toCompile.length == 0){
		finishedCallback();
	}



};

exports.compileTemplate = function(file){
	var filePath = path.resolve(__rootdirname+"/lib/templates/"+file);
	//console.log(filePath);
	fs.readFile(filePath, 'utf8', function (err, html) {

		var templateName = path.basename(file, ".hbs");
		var htmlString = html;
	    compiled[templateName] = Handlebars.compile(htmlString);
	    toCompileCount += 1;
	    if(toCompileCount >= toCompile.length){
	    	finishedCallback();
	    }

	});

};



exports.render = function(name, context){
	var template = null;
	if(compiled[name] == undefined){
		template = function(c){return '';};
	}

	if(context == undefined){
		context = {};
	}
	return template(context);
};