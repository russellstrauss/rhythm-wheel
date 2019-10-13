module.exports = function() {
	
	return {
		
		settings: {
		},
		
		init: function() {

			this.bindEvents();
			this.setKeys();
		},
		
		bindEvents: function() {
			
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
		},
		
		setKeys: function() {
			
			document.addEventListener('keyup', function(event) {
				
				let space = 32;
				
				//alert(event.keyCode);
				
				if (event.keyCode === space) {
					Tone.Transport.toggle();
				}
			});
		}
	}
}