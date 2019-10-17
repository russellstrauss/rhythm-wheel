(function () {
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

	var nullRule = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			result.push(null);
		}
		return result;
	};

	var replicate = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: i % 3, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		return result;
	};

	var replicateLong = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: 0, octave:'4', duration: '4n.'});
			}
			else {
				result.push(null);
			}
		}
		return result;
	};

	var replicateMono = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: 0, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		return result;
	};

	var shift1 = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: i % 3, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		let temp = result.shift();
		result.push(temp);
		return result;
	};

	
	var shift2 = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: i % 3, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		for (var i = 0; i<2; i++) {
			let temp = result.shift();
			result.push(temp);
		}
		return result;
	};

	
	var shift3 = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: i % 3, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		for (var i = 0; i<3; i++) {
			let temp = result.shift();
			result.push(temp);
		}
		return result;
	};

	var shift1Mono = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: 0, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		let temp = result.shift();
		result.push(temp);
		return result;
	};

	
	var shift2Mono = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: 0, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		for (var i = 0; i<2; i++) {
			let temp = result.shift();
			result.push(temp);
		}
		return result;
	};

	
	var shift3Mono = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i]) {
				result.push({relativePitch: 0, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		for (var i = 0; i<3; i++) {
			let temp = result.shift();
			result.push(temp);
		}
		return result;
	};

	var interval = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i] && i%2 == 0) {
				result.push({relativePitch: i%3, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		
		return result;
	};

	var intervalShift = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i] && i%2 == 1) {
				result.push({relativePitch: i%3, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		return result;
	};

	var intervalMono = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i] && i%2 == 0) {
				result.push({relativePitch: 0, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		
		return result;
	};

	var intervalShiftMono = function(beats) {
		var result = [];
		for (var i = 0; i < beats.length; i++) {
			if (beats[i] && i%2 == 1) {
				result.push({relativePitch: 0, octave:'4', duration: '8n'});
			}
			else {
				result.push(null);
			}
		}
		return result;
	};


	window.melody = (function() {
		
		return {
			chords: {
				1: ['C', 'E', 'G'],
				2: ['D', 'F', 'A'],
				3: ['E', 'G', 'B'],
				4: ['C', 'F', 'A'],
				5: ['D', 'G', 'B'],
				6: ['C', 'E', 'A'],
				7: ['D', 'F', 'B'],
			},

			convertRules: {
				nullRule: nullRule,
				replicate: replicate,
				replicateLong: replicateLong,
				replicateMono: replicateMono,
				shift1: shift1,
				shift2: shift2,
				shift3: shift3,
				shift1Mono: shift1Mono,
				shift2Mono: shift2Mono,
				shift3Mono: shift3Mono,
				interval: interval,
				intervalShift: intervalShift,
				intervalMono: intervalMono,
				intervalShiftMono: intervalShiftMono
			},
			
			convertPatterns: {
				kick: "nullRule",
				cowbell: "nullRule",
				ride: "nullRule",
				snareRim: "nullRule",
				snare: "nullRule",
				hh: "nullRule",
				hho: "nullRule",
				bongoLow: "nullRule",
				bongoHigh: "nullRule",
				congaLow: "nullRule",
				congaHigh: "nullRule",
				congaMuteHigh: "nullRule",
				brush1: "nullRule",
				brush2: "nullRule",
				brush3: "nullRule",
				rim: "nullRule",
				tomLo: "nullRule",
				tomHi: "nullRule",
				bellHi: "nullRule",
				clave: "nullRule",
				rakeLo: "nullRule",
				rakeHi: "nullRule",
				clap: "nullRule",
				shakerLo: "nullRule",
				shakerHi:  "nullRule",
				timbale: "nullRule",
				streetDrumLo: "nullRule",
				streetDrumHi: "nullRule",
				clap: "nullRule"
			},

			convertInstruments: {
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
				brush3: synth1,
				rim: synth1,
				tomLo: synth1,
				tomHi: synth1,
				bellHi: synth1,
				clave: synth1,
				rakeLo: synth1,
				rakeHi: synth1,
				clap: synth1,
				shakerLo: synth1,
				shakerHi:  synth1,
				timbale: synth1,
				streetDrumLo: synth1,
				streetDrumHi: synth1,
				clap: synth1
			},
			
		};
	})();
	
	
	module.exports = window.melody;
})();