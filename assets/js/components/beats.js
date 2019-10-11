
module.exports = function() {
	
	return {
		
		settings: {

		},
		
		init: function() {
			
			/*
			* Drums
			*/
			var drums505 = new Tone.Sampler({
				D4: 'snare.[mp3|ogg]',
				C3: 'kick.[mp3|ogg]',
				G3: 'hh.[mp3|ogg]',
				A3: 'hho.[mp3|ogg]'
			}, {
				volume: 11,
				release: 1,
				baseUrl: './assets/audio/505/'
			}).toMaster();

			document.querySelector('#play-btn').addEventListener('click', function() {
				drums505.triggerAttackRelease('D4', '4n');
			});
		}
	}
};