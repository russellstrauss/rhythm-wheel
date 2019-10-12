var Scene = require('./components/scene.js');
var UI = require('./components/ui.js');
var Utilities = require('./utils.js');
var Graphics = require('./graphics.js');

(function () {
	
	document.addEventListener('DOMContentLoaded',function(){

		Scene().init();
		UI().init();
	});
})();