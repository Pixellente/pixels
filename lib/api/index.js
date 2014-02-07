var modules = {};

require("fs").readdirSync(__dirname+"/modules").forEach(function(file) {
	modules[file.split(".")[0]] = require(__dirname+"/modules/" + file);
});

exports.init = function(server){

	_.each(modules, function(module){
		module.init(server);
	});

};