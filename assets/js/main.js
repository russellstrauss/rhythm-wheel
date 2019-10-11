var Scene = require('./components/scene.js');
var Beats = require('./components/beats.js');
var Utilities = require('./utils.js');
var Graphics = require('./graphics.js');

(function () {
	
	document.addEventListener('DOMContentLoaded',function(){

		Scene().init();
		Beats().init();
	});
})();