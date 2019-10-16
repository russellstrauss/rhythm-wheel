(function () {
	
	var player = new Tone.Players(
		{
			kick: './assets/audio/505/kick.mp3',
			cowbell: './assets/audio/jazz/cowbell.wav',
			ride: './assets/audio/jazz/ride5.wav',
			snareRim: './assets/audio/jazz/glockenspiel.wav',
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
			brush3: './assets/audio/jazz/R8Brush04.wav'
		},
		{
			volume: 5
		}
	).toMaster();
	
	var defaultInstruments = [
		player.get('cowbell'),
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

	var synth1 = new Tone.FMSynth({
		"harmonicity": 3.01,
		"modulationIndex": 14,
		"oscillator": {
			"type": "triangle"
		},
		"envelope": {
			"attack": 0.1,
			"decay": 0.2,
			"sustain": 0.5,
			"release": 0.3
		},
		"modulation" : {
			"type": "square"
		},
		"modulationEnvelope" : {
			"attack": 0.1,
			"decay": 0.2,
			"sustain": 0.2,
			"release": 0.5
		}
	});
	var chorus1 = new Tone.Chorus({
		"frequency": 4,
		"delayTime": 20,
		"type": "triangle",
		"depth": 1,
		"feedback": 0.2,
		"spread": 80,
		"wet": 0.8
	});
	synth1.chain(chorus1, Tone.Master);

	var convertIntruments = {
		kick: synth1,
		cowbell: synth1,
		ride: synth1,
		snareRim: synth1,
		snare: synth1,
		hh: synth1,
		hho: synth1,
		bongoLow: synth1,
		bongoHigh: synth1,
		congaLow: synth1,
		congaHigh: synth1,
		congaMuteHigh: synth1,
		brush1: synth1,
		brush2: synth1,
		brush3: synth1
	};

	var rule1 = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: 0, duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		return result;
	};

	var convertPatterns = {
		kick: rule1,
		cowbell: rule1,
		ride: rule1,
		snareRim: rule1,
		snare: rule1,
		hh: rule1,
		hho: rule1,
		bongoLow: rule1,
		bongoHigh: rule1,
		congaLow: rule1,
		congaHigh: rule1,
		congaMuteHigh: rule1,
		brush1: rule1,
		brush2: rule1,
		brush3: rule1
	};
	
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
					[null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null],
					['hh', null, 'hh', null, 'hh', null, null, null, 'hh', null, 'hh', null, 'hh', null, null, null, 'hh', null, 'hh', null, 'hh', null, null, null, 'hh', null, 'hh', null, 'hh', null, null, null],
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
					[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
				],
				bpm: 140,
				instruments: [
					player.get('cowbell'),
					player.get('kick'),
					player.get('snare'),
					player.get('hh'),
					player.get('brush1'),
					player.get('brush2')
				]
			},
			
			yyz: {
				beat: [
					['cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null, null, null, 'cowbell', null, null, null, 'cowbell', null, 'cowbell', null]
				],
				bpm: 215,
				instruments: [
					player.get('cowbell')
				]
			}
		};
	})();
	
	module.exports = window.beats;
})();