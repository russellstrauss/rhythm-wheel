(function () {
	
	var player = new Tone.Players(
		{
			cowbell: './assets/audio/jazz/cowbell.wav',
			clave: './assets/audio/jazz/clave.wav',
			snare: './assets/audio/505/snare.mp3',
			hh: './assets/audio/505/hh.mp3',
			hho: './assets/audio/505/hho.mp3',
			bongoLo: './assets/audio/jazz/MTBongoLow.wav',
			bongoHi: './assets/audio/jazz/MTBongoHigh.wav',
			congaLo: './assets/audio/jazz/MTCongaLow.wav',
			congaHi: './assets/audio/jazz/MTCongaHigh.wav',
			congaMuteHigh: './assets/audio/jazz/MTCongaMutHi.wav',
			brush1: './assets/audio/jazz/R8Brush01.wav',
			brush2: './assets/audio/jazz/R8Brush02.wav',
			brush3: './assets/audio/jazz/R8Brush04.wav',
			rim: './assets/audio/jazz/snare-rim.wav',
			bellHi: './assets/audio/jazz/hi-bell.wav'
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
	
	player.get('cowbell').displayName = 'Cowbell';
	player.get('clave').displayName = 'Clave';
	player.get('rim').displayName = 'Snare Rim';
	player.get('cowbell').displayName = 'Cowbell';
	player.get('bellHi').displayName = 'Bell';
	soft.get('tomLo').displayName = 'Tom Low';
	soft.get('tomHi').displayName = 'Tom High';
	player.get('snare').displayName = 'Snare';
	soft.get('kick').displayName = 'Kick';
	player.get('hh').displayName = 'Hi-hat Closed';
	player.get('hho').displayName = 'Hi-hat Off';
	player.get('bongoLo').displayName = 'Bongo Low';
	player.get('bongoHi').displayName = 'Bongo High';
	player.get('congaLo').displayName = 'Conga Low';
	player.get('congaHi').displayName = 'Conga High';
	player.get('congaMuteHigh').displayName = 'Conga Mute High';
	soft.get('ride').displayName = 'Ride Bell';
	
	var defaultInstruments = [
		player.get('cowbell'),
		player.get('snare'),
		soft.get('kick'),
		player.get('hh'),
		player.get('hho'),
		player.get('bongoLo'),
		player.get('bongoHi'),
		player.get('congaLo'),
		player.get('congaHi'),
		player.get('congaMuteHigh'),
		soft.get('ride')
	];
	
	var bongos = [
		player.get('bongoLo'),
		player.get('bongoHi'),
		player.get('congaLo'),
		player.get('congaHi'),
		player.get('congaMuteHigh')
	];

	//[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
	
	window.beats = (function() {
		
		return {
			
			allInstruments: player,
			
			instrumentSets: {
				bongos: {
					length: 16,
					bpm: 120,
					instruments: [
						player.get('bongoLo'),
						player.get('bongoHi'),
						player.get('congaLo'),
						player.get('congaHi'),
						player.get('congaMuteHigh')
					]
				},
				
				rockDrumSet: {
					length: 16,
					bpm: 115,
					instruments: [
						soft.get('kick'),
						player.get('snare'),
						player.get('hh'),
						player.get('hho')
					]
				}
				
				
			},
			
			empty: {
				beat: new Array(defaultInstruments.length),
				length: 16,
				bpm: 100,
				instruments: defaultInstruments
			},
			
			basic: {
				beat: [
					['kick', null, null, null, null, null, null, 'kick', 'kick', null, null, null, null, null, 'kick', null],
					[null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null],
					['hh', null, 'hh', null, 'hh', null, 'hh', 'hh', 'hh', null, null, null, 'hh', null, 'hh', null],
					[null, null, null, null, null, null, null, null, null, null, 'hho', null, null, null, null, null]
				],
				length: 16,
				bpm: 100,
				instruments: [
					soft.get('kick'),
					player.get('snare'),
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
				length: 16,
				bpm: 80,
				instruments: [
					soft.get('ride'),
					soft.get('kick'),
					player.get('clave')
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
				length: 16,
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
				length: 12,
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
				length: 16,
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
				length: 16,
				bpm: 130,
				instruments: [
					soft.get('ride'),
					player.get('hh'),
					soft.get('kick'),
					soft.get('tomLo'),
					soft.get('tomHi'),
					player.get('rim')
				]
			},
			
			billieJean: {
				beat: [
					['kick', null, null, null, null, null, null, null, 'kick', null, null, null, null, null, null, null],
					[null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null],
					['hh', null, 'hh', null, 'hh', null, 'hh', null, 'hh', null, 'hh', null, 'hh', null, 'hh', null]
				],
				length: 16,
				bpm: 115,
				instruments: [
					player.get('snare'),
					soft.get('kick'),
					player.get('hh')
				]
			},
			
			rumba: {
				beat: [
					['kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick'],
					['rim', null, null, 'rim', null, null, null, 'rim', null, null, 'rim', null, 'rim', null, null, null],
					['ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride']
				],
				length: 16,
				bpm: 90,
				instruments: [
					soft.get('kick'),
					player.get('rim'),
					soft.get('ride')
				]
			},
			
			gahu: {
				beat: [
					['kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null, 'kick', null, 'kick', null],
					[null, null, 'rim', 'rim', null, null, 'rim', 'rim', null, null, 'rim', 'rim', null, null, 'rim', 'rim'],
					['bellHi', null, null, null, 'bellHi', null, 'bellHi', null, null, null, 'bellHi', null, 'bellHi', null, null, null]
				],
				length: 16,
				bpm: 100,
				instruments: [
					soft.get('kick'),
					player.get('rim'),
					player.get('bellHi')
				]
			},
			
			souskous: {
				beat: [
					['kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null, 'kick', null, 'kick', null],
					['rim', null, null, 'rim', null, null, 'rim', null, 'rim', null, null, 'rim', null, null, 'rim', null],
					['bellHi', null, null, 'bellHi', null, null, 'bellHi', null, null, 'bellHi', 'bellHi', null, null, null, null, null]
				],
				length: 16,
				bpm: 120,
				instruments: [
					soft.get('kick'),
					player.get('rim'),
					player.get('bellHi')
				]
			},
			
			shiko: {
				beat: [
					['kick', null, null, null, 'kick', null, 'kick', null, 'kick', null, null, null, 'kick', null, 'kick', null],
					[null, null, 'rim', 'rim', null, null, 'rim', 'rim', null, null, 'rim', 'rim', null, null, 'rim', 'rim'],
					['bellHi', null, null, null, 'bellHi', null, 'bellHi', null, null, null, 'bellHi', null, 'bellHi', null, null, null]
				],
				length: 16,
				bpm: 120,
				instruments: [
					soft.get('kick'),
					player.get('rim'),
					player.get('bellHi')
				]
			}//,
			
			// apache: {
			// 	beat: [
			// 		// ['bongoHi', null, null, 'bongoHi', 'bongoHi', null, null, 'bongoHi', null, 'bongoHi', null, 'bongoHi', 'bongoHi', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
			// 		// [null, null, null, null, null, null, 'bongoLo', null, null, null, null, null, null, 'bongoLo', 'bongoLo', 'bongoLo', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
					
			// 		[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'bongoHi', null, null, 'bongoHi', 'bongoHi', null, null, 'bongoHi', null, 'bongoHi', null, 'bongoHi', 'bongoHi', null, null, null],
			// 		[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'bongoLo', null, null, null, null, null, null, 'bongoLo', 'bongoLo', 'bongoLo'],
			// 		['bellHi', null, null, null, null, null, null, null, 'bellHi', null, null, null, 'bellHi', null, null, null, 'bellHi', null, null, null, null, null, null, null, 'bellHi', null, null, null, 'bellHi', null, null, null, 'bellHi', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
			// 	],
			// 	bpm: 108,
			// 	instruments: [
			// 		player.get('bongoHi'),
			// 		player.get('bongoLo'),
			// 		player.get('bellHi')
			// 	]
			// }
		};
	})();
	
	//[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
	
	module.exports = window.beats;
})();