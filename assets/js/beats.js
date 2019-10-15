(function () {
	
	var player = new Tone.Players(
		{
			cowbell: './assets/audio/jazz/cowbell.wav',
			clave: './assets/audio/jazz/clave.wav',
			snare: './assets/audio/505/snare.mp3',
			hh: './assets/audio/505/hh.mp3',
			hho: './assets/audio/505/hho.mp3',
			bongoLow: './assets/audio/jazz/MTBongoLow.wav',
			bongoHigh: './assets/audio/jazz/MTBongoHigh.wav',
			congaLow: './assets/audio/jazz/MTCongaLow.wav',
			congaHigh: './assets/audio/jazz/MTCongaHigh.wav',
			congaMuteHigh: './assets/audio/jazz/MTCongaMutHi.wav',
			brush1: './assets/audio/jazz/R8Brush01.wav',
			brush2: './assets/audio/jazz/R8Brush02.wav',
			brush3: './assets/audio/jazz/R8Brush04.wav',
			rim: './assets/audio/jazz/snare-rim.wav'
		},
		{
			volume: 5
		}
	).toMaster();
	
	var soft = new Tone.Players(
		{
			ride: './assets/audio/jazz/ride-bell.wav',
			tomLo: './assets/audio/jazz/DR220Tom_Lo.wav',
			tomHi: './assets/audio/jazz/DR220Tom_Hi.wav',
			kick: './assets/audio/505/kick.mp3'
		},
		{
			volume: -5
		}
	).toMaster();
	
	var defaultInstruments = [
		player.get('cowbell'),
		player.get('snare'),
		soft.get('kick'),
		player.get('hh'),
		player.get('hho'),
		player.get('bongoLow'),
		player.get('bongoHigh'),
		player.get('congaLow'),
		player.get('congaHigh'),
		player.get('congaMuteHigh'),
		soft.get('ride')
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
					soft.get('kick'),
					player.get('hh'),
					player.get('hho')
				]
			},
			
			bossaNova: {
				beat: [
					['ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride'],
					['kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick'],
					['clave', null, null, 'clave', null, null, 'clave', null, null, null, 'clave', null, null, 'clave', null, null]
				],
				bpm: 80,
				instruments: [
					soft.get('ride'),
					soft.get('kick'),
					player.get('clave'),
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
					soft.get('kick'),
					player.get('snare'),
					player.get('hh'),
					player.get('hho'),
					player.get('cowbell')
				]
			},
			
			// lowrider: {
			// 	beat: [
			// 		['cowbell', null, null, null, 'cowbell', null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null],
			// 		['kick', null, null, null, null, null, null, null, 'kick', null, null, null, null, null, null, null, 'kick', null, null, null, null, null, null, null, 'kick', null, null, null, null, null, null, null],
			// 		[null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null],
			// 		['hh', null, 'hh', null, 'hh', null, null, null, 'hh', null, 'hh', null, 'hh', null, null, null, 'hh', null, 'hh', null, 'hh', null, null, null, 'hh', null, 'hh', null, 'hh', null, null, null],
			// 		[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
			// 		[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
			// 	],
			// 	bpm: 140,
			// 	instruments: [
			// 		player.get('cowbell'),
			// 		player.get('kick'),
			// 		player.get('snare'),
			// 		player.get('hh'),
			// 		player.get('brush1'),
			// 		player.get('brush2')
			// 	]
			// },
			
			// yyz: {
			// 	beat: [
			// 		['cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null]
			// 	],
			// 	bpm: 215,
			// 	instruments: [
			// 		player.get('cowbell')
			// 	]
			// }
			
			bembe: {
				beat: [
					['ride', null, 'ride', null, 'ride', 'ride', null, 'ride', null, 'ride', null, 'ride'],
					['hh', null, null, 'hh', null, null, 'hh', null, null, 'hh', null, null],
					['kick', null, null, null, null, null, null, null, null, null, null, 'kick'],
					[null, null, 'rim', null, null, null, null, 'rim', null, null, null, null],
					[null, null, null, null, null, null, null, null, null, null, 'tomLo', 'tomLo'],
					[null, null, null, null, null, 'tomHi', null, null, null, null, null, null]
				],
				bpm: 90,
				instruments: [
					soft.get('ride'),
					player.get('hh'),
					soft.get('tomLo'),
					soft.get('tomHi'),
					soft.get('kick'),
					player.get('rim')
				]
			},
			
			sikyi: {
				beat: [
					['ride', null, 'ride', 'ride', null, null, 'ride', null, 'ride', null, 'ride', 'ride', null, null, 'ride', null],
					[null, null, null, null, null, null, 'hh', null, null, null, 'hh', null, null, null, 'hh', null],
					['kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null],
					[null, 'tomLo', null, 'tomLo', null, null, null, null, null, null, 'tomLo', 'tomLo', null, null, null, null],
					[null, null, null, null, null, null, 'tomHi', 'tomHi', null, null, null, null, null, null, 'tomHi', 'tomHi']
				],
				bpm: 130,
				instruments: [
					soft.get('ride'),
					player.get('hh'),
					soft.get('kick'),
					soft.get('tomLo'),
					soft.get('tomHi')
				]
			},
			
			sikyi2: {
				beat: [
					['ride', null, 'ride', 'ride', null, null, 'ride', null, 'ride', null, 'ride', 'ride', null, null, 'ride', null],
					[null, null, null, null, null, null, 'hh', null, null, null, 'hh', null, null, null, 'hh', null],
					['kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null],
					[null, 'tomLo', null, 'tomLo', null, null, null, null, null, null, null, null, null, null, 'tomLo', 'tomLo'],
					[null, null, null, null, null, null, 'tomHi', null, null, null, null, null, null, null, null, null],
					[null, null, null, null, null, null, null, null, null, null, null, 'rim', null, null, null, null]
				],
				bpm: 130,
				instruments: [
					soft.get('ride'),
					player.get('hh'),
					soft.get('kick'),
					soft.get('tomLo'),
					soft.get('tomHi'),
					player.get('rim')
				]
			}
		};
	})();
	
	module.exports = window.beats;
})();