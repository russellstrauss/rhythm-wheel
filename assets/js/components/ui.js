module.exports = function() {
	
	return {
		
		settings: {
		},
		
		init: function() {

			this.bindEvents();
		},
		
		bindEvents: function() {
			
			let inputSteppers = document.querySelectorAll('.input-stepper');
			inputSteppers.forEach(function(inputStepper) {
				
				let input = inputStepper.querySelector('input');
				
				let increase = inputStepper.querySelector('.increase');
				if (increase) increase.addEventListener('click', function() {
					let max = parseInt(input.getAttribute('max'));
					if (input.value < max) input.value = parseInt(input.value) + 10;
					Tone.Transport.bpm.value += 10;
				});
				
				let decrease = inputStepper.querySelector('.decrease');
				if (decrease) decrease.addEventListener('click', function() {
					let min = parseInt(input.getAttribute('min'));
					if (input.value > min) input.value = parseInt(input.value) - 10;
					Tone.Transport.bpm.value -= 10;
				});
			});
			
			let playToggle = document.querySelector('.play-toggle');
			playToggle.addEventListener('click', function() {
				playToggle.classList.toggle('active');
				Tone.Transport.toggle();
			});
		}
	}
}