module.exports = function() {
	
	var renderer, scene, camera, controls, floor;
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: new THREE.Color('black'), opacity: .25, transparent: true });
	var distinctColors = [new THREE.Color('#18995B'), new THREE.Color('#2F72CA'), new THREE.Color('#A82F2F'), new THREE.Color('#F2B233'), new THREE.Color('#f58231'), new THREE.Color('#911eb4'), new THREE.Color('#46f0f0'), new THREE.Color('#f032e6'), new THREE.Color('#bcf60c'), new THREE.Color('#fabebe'), new THREE.Color('#008080'), new THREE.Color('#e6beff'), new THREE.Color('#9a6324'), new THREE.Color('#fffac8'), new THREE.Color('#800000'), new THREE.Color('#aaffc3'), new THREE.Color('#808000'), new THREE.Color('#ffd8b1'), new THREE.Color('#000075'), new THREE.Color('#808080'), new THREE.Color('#ffffff'), new THREE.Color('#000000')];
	var black = new THREE.Color('black');
	var timeCursor, timeCursorEndpoint;
	var playing = false;
	var targetList = [];
	var rhythmWheelMesh;
	var tracks = [];
	var rhythmCount = 0;
	var scope;
	
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
	
	var keys = new Tone.Players({
		"D4" : "./assets/audio/casio/A1.[mp3|ogg]",
		"C#" : "./assets/audio/casio/Cs2.[mp3|ogg]",
		"E" : "./assets/audio/casio/E2.[mp3|ogg]",
		"F#" : "./assets/audio/casio/Fs2.[mp3|ogg]",
	}, {
		volume: 5,
		fadeOut: "64n"
	}).toMaster();
	
	return {
		
		settings: {
			defaultCameraLocation: {
				x: 0,
				y: 10,
				z: 0
			},
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
			floorSize: 100,
			rhythmWheel: {
				innerRadius: 1,
				outerRadius: 5,
				beats: 8,
				tracks: 4
			}
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
			//controls = gfx.enableControls(controls, renderer, camera);
			gfx.resizeRendererOnWindowResize(renderer, camera);
			self.setUpButtons();
			gfx.setUpLights(scene);
			gfx.setCameraLocation(camera, self.settings.defaultCameraLocation);
			camera.lookAt(new THREE.Vector3(0, 0, 0));
			self.addGeometries();
			self.setUpRhythm();
			
			var animate = function() {

				requestAnimationFrame(animate);
				renderer.render(scene, camera);
				if (controls) controls.update();
				
				rhythmWheelMesh.geometry.colorsNeedUpdate = true;
			};
			
			animate();
		},
		
		setUpRhythm: function() {
			
			let self = this;
			
			for (let i = 0; i < self.settings.rhythmWheel.tracks; i++) { // init empty beats
				tracks.push([]);
				for (let j = 0; j < self.settings.rhythmWheel.beats; j++) {
					tracks[i].push(null);
				}
			}
			
			scope = self;
			Tone.Transport.scheduleRepeat(triggerBeats, this.settings.rhythmWheel.beats.toString() + 'n');
			
			function triggerBeats(time) {

				scene.remove(timeCursor);
				gfx.rotateGeometryAboutLine(timeCursor.geometry, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), -2*Math.PI/scope.settings.rhythmWheel.beats);
				timeCursor = gfx.drawLine(timeCursor.geometry.vertices[0], timeCursor.geometry.vertices[1], scene, 0xff0000);
				
				let beat = rhythmCount % scope.settings.rhythmWheel.beats;

				for (let i = 0; i < scope.settings.rhythmWheel.tracks; i++) {

					if (tracks[i][beat] !== null) drums505.triggerAttackRelease(tracks[i][beat], scope.settings.rhythmWheel.beats.toString() + 'n', time);
				}
				rhythmCount++;
			}
			
			//set the bpm and time signature first
			//Tone.Transport.timeSignature = [6, 4];
			Tone.Transport.bpm.value = 120;
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
			// var synthL = new Tone.Synth(synthSettings).connect(merge.left);
			// var synthR = new Tone.Synth(synthSettings).connect(merge.right);

			// //the two Tone.Sequences
			// var partL = new Tone.Sequence(function(time, note){
			// 	synthL.triggerAttackRelease(note, "8n", time);
			// }, ["E4", "F#4", "B4", "C#5", "D5", "F#4", "E4", "C#5", "B4", "F#4", "D5", "C#5"], "8n").start();

			// var partR = new Tone.Sequence(function(time, note){
			// 	synthR.triggerAttackRelease(note, "8n", time);
			// }, ["E4", "F#4", "B4", "C#5", "D5", "F#4", "E4", "C#5", "B4", "F#4", "D5", "C#5"], "8n").start("2m");
			
			
			// var snareTrack = new Tone.Sequence(function(time, note){
			// 	drums505.triggerAttackRelease(note, self.settings.rhythmWheel.beats.toString() + 'n', time);
			// }, ['D4', null, null, null, 'D4', null, null, null], self.settings.rhythmWheel.beats.toString() + 'n').start();
			
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
			
			let rhythmWheel = new THREE.RingGeometry(this.settings.rhythmWheel.innerRadius, this.settings.rhythmWheel.outerRadius, this.settings.rhythmWheel.beats, this.settings.rhythmWheel.tracks);
			rhythmWheel.rotateX(-Math.PI/2);
			rhythmWheel.rotateY(Math.PI/2);
			rhythmWheel.translate(0, this.settings.zBufferOffset, 0);
			
			let faceColorMaterial = new THREE.MeshBasicMaterial({
				color: new THREE.Color('white'),
				vertexColors: THREE.FaceColors
			});
			rhythmWheelMesh = new THREE.Mesh(rhythmWheel, faceColorMaterial);
			
			let wireframeMesh = new THREE.Mesh(rhythmWheel, wireframeMaterial);
			wireframeMesh.position.y += this.settings.zBufferOffset * 2;
			targetList.push(rhythmWheelMesh);
			scene.add(rhythmWheelMesh);
			scene.add(wireframeMesh);
			
			let timeCursorGeometry = gfx.createLine(new THREE.Vector3(0, this.settings.zBufferOffset * 2, -this.settings.rhythmWheel.innerRadius), new THREE.Vector3(0, this.settings.zBufferOffset * 2, -this.settings.rhythmWheel.outerRadius));
			let lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
			timeCursor = new THREE.Line(timeCursorGeometry, lineMaterial);
			scene.add(timeCursor);
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
			
			let self = this;
			raycaster.setFromCamera(mouse, camera);
			var intersects = raycaster.intersectObjects(targetList);
			
			if (intersects.length > 0) {
				
				let faceIndex = intersects[0].faceIndex;
				self.setFaceColor(faceIndex);
			}
		},
		
		setFaceColor: function(faceIndex) {
			
			let beatIndex = (this.settings.rhythmWheel.beats - 1) - Math.floor(faceIndex / 2) % this.settings.rhythmWheel.beats;
			let trackIndex = Math.floor(faceIndex / (this.settings.rhythmWheel.beats * 2));
			
			let setColor;
			if (rhythmWheelMesh.geometry.faces[faceIndex].selected === true) {
				setColor = new THREE.Color('white');
			}
			else {
				setColor = distinctColors[trackIndex];
			}
			
			let evenFace = (faceIndex % 2 === 0);
			if (evenFace) {
				rhythmWheelMesh.geometry.faces[faceIndex].color.setRGB(setColor.r, setColor.g, setColor.b);
				rhythmWheelMesh.geometry.faces[faceIndex + 1].color.setRGB(setColor.r, setColor.g, setColor.b);
				rhythmWheelMesh.geometry.faces[faceIndex].selected = !rhythmWheelMesh.geometry.faces[faceIndex].selected;
				rhythmWheelMesh.geometry.faces[faceIndex + 1].selected = !rhythmWheelMesh.geometry.faces[faceIndex + 1].selected;
			}
			else {
				rhythmWheelMesh.geometry.faces[faceIndex].color.setRGB(setColor.r, setColor.g, setColor.b);
				rhythmWheelMesh.geometry.faces[faceIndex - 1].color.setRGB(setColor.r, setColor.g, setColor.b);
				rhythmWheelMesh.geometry.faces[faceIndex].selected = !rhythmWheelMesh.geometry.faces[faceIndex].selected;
				rhythmWheelMesh.geometry.faces[faceIndex - 1].selected = !rhythmWheelMesh.geometry.faces[faceIndex - 1].selected;
			}
			rhythmWheelMesh.geometry.colorsNeedUpdate = true;
			
			if (tracks[trackIndex][beatIndex] === null) tracks[trackIndex][beatIndex] = 'D4';
			else tracks[trackIndex][beatIndex] = null;
			
			console.log(tracks);
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