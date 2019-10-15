module.exports = function() {
	
	return {
		
		settings: {
		},
		
		init: function() {

			this.bindEvents();
			this.setKeys();
		},
		
		bindEvents: function() {
			
			let enter = 13;
			
			let inputSteppers = document.querySelectorAll('.input-stepper');
			inputSteppers.forEach(function(inputStepper) {
				
				let input = inputStepper.querySelector('input');
				
				let increase = inputStepper.querySelector('.increase');
				if (increase) increase.addEventListener('click', function() {
					let max = parseInt(input.getAttribute('max'));
					if (input.value < max) input.value = parseInt(input.value) + 1;
					Tone.Transport.bpm.value += 1;
				});
				
				let decrease = inputStepper.querySelector('.decrease');
				if (decrease) decrease.addEventListener('click', function() {
					let min = parseInt(input.getAttribute('min'));
					if (input.value > min) input.value = parseInt(input.value) - 1;
					Tone.Transport.bpm.value -= 1;
				});
			});
			
			let playToggle = document.querySelector('.play-toggle');
			playToggle.addEventListener('click', function() {
				
				playToggle.classList.toggle('active');
				Tone.Transport.toggle();
			});
			
			let bpmInput = document.querySelector('#bpm');
			let timeout; // give half second of user input before rapidly changing tempo
			bpmInput.addEventListener('keyup', function(event) {
				
				if (parseInt(bpmInput.value) > 39) {
					
					if (event.keyCode === enter) {
						clearTimeout(timeout);
						Tone.Transport.bpm.value = parseInt(bpmInput.value);
					}
					else {
						
						timeout = setTimeout(function() {
							Tone.Transport.bpm.value = parseInt(bpmInput.value);
						}, 500);
					}
				}
			});
			
			bpmInput.addEventListener('keydown', function() {
				clearTimeout(timeout);
			});
		},
		
		setKeys: function() {
			
			document.addEventListener('keyup', function(event) {
				
				let space = 32;
				
				if (event.keyCode === space) {
					Tone.Transport.toggle();
				}
			});
		}
	};
};