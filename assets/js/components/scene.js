module.exports = function() {
	
	var renderer, scene, camera, controls, floor;
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: new THREE.Color('black'), opacity: .5, transparent: true });
	var distinctColors = [new THREE.Color('#18995B'), new THREE.Color('#2F72CA'), new THREE.Color('#A82F2F'), new THREE.Color('#F2B233'), new THREE.Color('#f58231'), new THREE.Color('#911eb4'), new THREE.Color('#46f0f0'), new THREE.Color('#f032e6'), new THREE.Color('#bcf60c'), new THREE.Color('#fabebe'), new THREE.Color('#008080'), new THREE.Color('#e6beff'), new THREE.Color('#9a6324'), new THREE.Color('#fffac8'), new THREE.Color('#800000'), new THREE.Color('#aaffc3'), new THREE.Color('#808000'), new THREE.Color('#ffd8b1'), new THREE.Color('#000075'), new THREE.Color('#808080'), new THREE.Color('#ffffff'), new THREE.Color('#000000')];
	var black = new THREE.Color('black');
	var timeCursor, timeCursorEndpoint;
	var playing = false;
	var targetList = [];
	
	return {
		
		settings: {
			defaultCameraLocation: {
				x: 0,
				y: 30,
				z: 0
			},
			beatsPerWheel: 8,
			axesHelper: {
				activateAxesHelper: false,
				axisLength: 10
			},
			font: {
				enable: true,
				fontStyle: {
					font: null,
					size: 1,
					height: 0,
					curveSegments: 1
				}
			},
			messageDuration: 2000,
			zBufferOffset: .01,
			colors: {
				worldColor: new THREE.Color('white'),
				gridColor: black,
				arrowColor: black
			},
			floorSize: 100
		},
		
		init: function() {

			let self = this;
			self.loadFont();
		},
		
		begin: function() {
			
			let self = this;
			
			scene = gfx.setUpScene(scene);
			renderer = gfx.setUpRenderer(renderer);
			camera = gfx.setUpCamera(camera);
			floor = gfx.addFloor(this.settings.floorSize, scene, this.settings.colors.worldColor, this.settings.colors.gridColor);
			controls = gfx.enableControls(controls, renderer, camera);
			gfx.resizeRendererOnWindowResize(renderer, camera);
			self.setUpButtons();
			gfx.setUpLights(scene);
			gfx.setCameraLocation(camera, self.settings.defaultCameraLocation);
			self.addGeometries();
			self.setUpRhythm();
			
			var animate = function() {

				requestAnimationFrame(animate);
				renderer.render(scene, camera);
				controls.update();
			};
			
			animate();
		},
		
		setUpRhythm: function() {
			
			let self = this;
			var loop = new Tone.Loop(function(time){
				//triggered every eighth note. 
				//console.log(time);
				
				scene.remove(timeCursor);
				gfx.rotateGeometryAboutLine(timeCursor.geometry, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), -2*Math.PI/self.settings.beatsPerWheel);
				timeCursor = gfx.drawLine(timeCursor.geometry.vertices[0], timeCursor.geometry.vertices[1], scene, 0xff0000);
				
			}, this.settings.beatsPerWheel.toString() + "n").start(0);
			// Tone.Transport.start();
			
			
			//set the bpm and time signature first
			Tone.Transport.timeSignature = [6, 4];
			Tone.Transport.bpm.value = 180;
			var merge = new Tone.Merge(); // L/R channel merging
			var reverb = new Tone.Freeverb({
				"roomSize" : 0.2,
				"wet" : 0.3
			});

			merge.chain(reverb, Tone.Master);

			//the synth settings
			var synthSettings = {
				"oscillator" : {
					"detune" : 0,
					"type" : "custom",
					"partials" : [2, 1, 2, 2],
					"phase" : 0,
					"volume" : 0
				},
				"envelope" : {
					"attack" : 0.005,
					"decay" : 0.3,
					"sustain" : 0.2,
					"release" : 1,
				},
				"portamento" : 0.01,
				"volume" : -20
			};

			//left and right synthesizers
			var synthL = new Tone.Synth(synthSettings).connect(merge.left);
			var synthR = new Tone.Synth(synthSettings).connect(merge.right);

			//the two Tone.Sequences
			var partL = new Tone.Sequence(function(time, note){
				synthL.triggerAttackRelease(note, "8n", time);
			}, ["E4", "F#4", "B4", "C#5", "D5", "F#4", "E4", "C#5", "B4", "F#4", "D5", "C#5"], "8n").start();

			var partR = new Tone.Sequence(function(time, note){
				synthR.triggerAttackRelease(note, "8n", time);
			}, ["E4", "F#4", "B4", "C#5", "D5", "F#4", "E4", "C#5", "B4", "F#4", "D5", "C#5"], "8n").start("2m");
			
			//set the playback rate of the right part to be slightly slower
			//partR.playbackRate = 0.985;

			document.querySelector('tone-play-toggle').bind(Tone.Transport);
			document.querySelector('tone-play-toggle').addEventListener('click', function() {
				let playButton = this.shadowRoot.querySelector('button');
				
				if (playButton.hasAttribute('playing')) playing = true;
				else playing = false;
			});
			// document.querySelector("#left").bind(partL);
			// document.querySelector("#right").bind(partR);
		},
		
		addGeometries: function() {
			
			let self = this;
			
			let instrumentTracks = 4;
			let circleRadius = 4;
			let maxRadius = 0;
			let colors = [new THREE.Color('red'), new THREE.Color('green'), new THREE.Color('blue'), new THREE.Color('purple'), new THREE.Color('orange')];
			
			for (let i = 1; i <= instrumentTracks; i++) {
				
				let ring = new THREE.CircleGeometry(circleRadius * i, this.settings.beatsPerWheel);
				console.log(ring);
				ring.rotateX(-Math.PI/2);
				let faceColorMaterial = new THREE.MeshBasicMaterial({
					color: new THREE.Color('purple'),
					vertexColors: THREE.FaceColors//,
					// transparent: true,
					// opacity: .5
				});
				for (let j = 0; j < ring.faces.length; j++) {
					ring.faces[j].color.setRGB( 0, 0, 0.8 * Math.random() + 0.2 );		
				}
				let mesh = new THREE.Mesh(ring.clone(), faceColorMaterial);
				console.log(mesh);
				mesh.name = 'Mesh-' + i.toString();
				let wireframe = new THREE.Mesh(ring, wireframeMaterial);
				
				mesh.position.y += this.settings.zBufferOffset * (i * 2);
				scene.add(mesh);
				scene.add(wireframe);
				wireframe.position.y += this.settings.zBufferOffset * (i * 2 + 1);
				targetList.push(mesh);
				
				
				//ring = self.reorderCircleVertices(ring);
				maxRadius = circleRadius * i;
			}
			
			let buffer = (instrumentTracks * 2 + 5) * this.settings.zBufferOffset;
			let timeCursorGeometry = gfx.createLine(new THREE.Vector3(0, buffer, 0), new THREE.Vector3(0, buffer, -maxRadius));
			let material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
			timeCursor = new THREE.Line(timeCursorGeometry, material );
			scene.add(timeCursor);
		},
		
		reorderCircleVertices: function(geometry) { // Re-order vertex counting to match the clock
			
			let result = geometry.clone();
			for (let i = 1; i < geometry.vertices.length; i++) {
				
				result.vertices[i] = geometry.vertices[geometry.vertices.length - i];
			}
			
			return result;
		},
		
		renderScaleTitle: function(geometry, label) {
			let self = this;
			self.labelPoint({x: geometry.vertices[0].x - 5, y: geometry.vertices[0].y + 10, z: geometry.vertices[0].z}, label, black);
		},
		
		labelInterval: function(geometry) {
			
			let self = this;
			for (let i = 1; i < geometry.vertices.length; i++) {
				self.labelPoint(geometry.vertices[i], i.toString(), black);
			}
		},
		
		labelScaleNotes: function(scaleGeometry, notes) {
			
			let self = this;
			
			for (let i = 0; i < notes.length; i++) {
				self.showPoint(scaleGeometry.vertices[notes[i]]);
			}
		},

		enableControls: function() {
			controls = new THREE.OrbitControls(camera, renderer.domElement);
			controls.target.set(0, 0, 0);
			controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
			controls.dampingFactor = 0.05;
			controls.zoomSpeed = 6;
			controls.enablePan = !utils.mobile();
			controls.minDistance = 0;
			controls.maxDistance = 200;
			controls.maxPolarAngle = Math.PI / 2;
		},
		
		loadFont: function() {
			
			let self = this;
			let loader = new THREE.FontLoader();
			let fontPath = '';
			fontPath = 'assets/vendors/js/three.js/examples/fonts/helvetiker_regular.typeface.json';

			loader.load(fontPath, function(font) { // success event
				
				self.settings.font.fontStyle.font = font;
				self.begin();
				if (self.settings.axesHelper.activateAxesHelper) self.labelAxes();
			},
			function(event) { // in progress event.
			},
			function(event) { // error event
				self.settings.font.enable = false;
				self.begin();
			});
		},
		
		setUpButtons: function() {
			
			let self = this;
			let message = document.getElementById('message');
			
			document.addEventListener('keyup', function(event) {
				
				let L = 76;
				
				if (event.keyCode === L) {
					
					// do stuff when pressing key
				}
			});
			
			let onMouseMove = function(event) {
				mouse.x = ( (event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width ) * 2 - 1;
				mouse.y = -( (event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height ) * 2 + 1;
			};
			
			window.addEventListener('mousemove', onMouseMove, false);
			
			document.querySelector('canvas').addEventListener('click', function(event) {
				
				self.intersects(event);
			});
		},
		
		intersects: function(event) {
			
			raycaster.setFromCamera(mouse, camera);
			var intersects = raycaster.intersectObjects( targetList );
			
			if (intersects.length > 0) {
				
				console.log(intersects[ 0 ]);
				//console.log(intersects[ 0 ].object.geometry.uuid);
				intersects[ 0 ].face.color.setRGB( 0.8 * Math.random() + 0.2, 0, 0 ); 
				intersects[ 0 ].object.geometry.colorsNeedUpdate = true;
			}
		},
		
		resizeRendererOnWindowResize: function() {

			window.addEventListener('resize', utils.debounce(function() {
				
				if (renderer) {
	
					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();
					renderer.setSize(window.innerWidth, window.innerHeight);
				}
			}, 250));
		}
	}
}