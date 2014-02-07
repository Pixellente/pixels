var types = {};

require("fs").readdirSync(__dirname+"/types").forEach(function(file) {
	types[file.split(".")[0]] = require(__dirname+"/types/" + file);
});

exports.render = function(type, componentData, language){

	return types[type].render(componentData, language);

};
