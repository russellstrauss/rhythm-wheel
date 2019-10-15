(function () {
	
	var player = new Tone.Players(
		{
			kick: './assets/audio/505/kick.mp3',
			cowbell: './assets/audio/jazz/cowbell.wav',
			ride: './assets/audio/jazz/ride5.wav',
			snareRim: './assets/audio/jazz/snare-rim.wav',
			snare: './assets/audio/505/snare.mp3',
			hh: './assets/audio/505/hh.mp3',
			hho: './assets/audio/505/hho.mp3',
			bongoLow: './assets/audio/jazz/MTBongoLow.wav',
			bongoHigh: './assets/audio/jazz/MTBongoHigh.wav',
			congaLow: './assets/audio/jazz/MTCongaLow.wav',
			congaHigh: './assets/audio/jazz/MTCongaHigh.wav',
			congaMuteHigh: './assets/audio/jazz/MTCongaMutHi.wav'
		},
		{
			volume: 5
		}
	).toMaster();
	
	var defaultInstruments = [
		player.get('snare'),
		player.get('kick'),
		player.get('hh'),
		player.get('hho'),
		player.get('bongoLow'),
		player.get('bongoHigh'),
		player.get('congaLow'),
		player.get('congaHigh'),
		player.get('congaMuteHigh')
	];
	
	//[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
	
	window.beats = (function() {
		
		return {
			
			allInstruments: player,
			
			empty: {
				beat: new Array(defaultInstruments.length),
				bpm: 100,
				instruments: defaultInstruments
			},
			
			basic: {
				beat: [
					[null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null],
					['kick', null, null, null, null, null, null, 'kick', 'kick', null, null, null, null, null, 'kick', null],
					['hh', null, 'hh', null, 'hh', null, 'hh', 'hh', 'hh', null, null, null, 'hh', null, 'hh', null],
					[null, null, null, null, null, null, null, null, null, null, 'hho', null, null, null, null, null]
				],
				bpm: 100,
				instruments: [
					player.get('snare'),
					player.get('kick'),
					player.get('hh'),
					player.get('hho')
				]
			},
			
			bossaNova: {
				beat: [
					['ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride'],
					['kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick'],
					['snareRim', null, null, 'snareRim', null, null, 'snareRim', null, null, null, 'snareRim', null, null, 'snareRim', null, null]
				],
				bpm: 80,
				instruments: [
					player.get('ride'),
					player.get('kick'),
					player.get('snareRim'),
					player.get('cowbell'),
					player.get('hh')
				]
			},
			
			funkyCowbell: {
				beat: [
					['kick', null, 'kick', null, null, null, null, null, null, null, 'kick', null, null, 'kick', null, null],
					[null, null, null, null, 'snare', null, null, 'snare', null, 'snare', null, 'snare', 'snare', null, null, 'snare'],
					['hh', 'hh', 'hh', 'hh', 'hh', 'hh', 'hh', null, 'hh', 'hh', 'hh', 'hh', 'hh', null, 'hh', 'hh'],
					[null, null, null, null, null, null, null, 'hho', null, null, null, null, null, 'hho', null, null],
					['cowbell', null, 'cowbell', null, null, 'cowbell', null, 'cowbell', null, 'cowbell', null, 'cowbell', null, null, 'cowbell', null]
				],
				bpm: 80,
				instruments: [
					player.get('kick'),
					player.get('snare'),
					player.get('hh'),
					player.get('hho'),
					player.get('cowbell')
				]
			},
			
			lowrider: {
				beat: [
					['cowbell', null, null, null, 'cowbell', null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null],
					['kick', null, null, null, null, null, null, null, 'kick', null, null, null, null, null, null, null, 'kick', null, null, null, null, null, null, null, 'kick', null, null, null, null, null, null, null],
					[null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null]
				],
				bpm: 140,
				instruments: [
					player.get('cowbell'),
					player.get('kick'),
					player.get('snare')
				]
			}
		};
	})();
	
	module.exports = window.beats;
})();