module.exports = function() {
	
	var renderer, scene, camera, controls, floor;
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: new THREE.Color('black'), opacity: 0.25, transparent: true });
	var distinctColors = [new THREE.Color('#2F72CA'), new THREE.Color('#A82F2F'), new THREE.Color('#18995B'), new THREE.Color('#F2B233'), new THREE.Color('#f58231'), new THREE.Color('#911eb4'), new THREE.Color('#46f0f0'), new THREE.Color('#f032e6'), new THREE.Color('#bcf60c'), new THREE.Color('#fabebe'), new THREE.Color('#008080'), new THREE.Color('#e6beff'), new THREE.Color('#9a6324'), new THREE.Color('#fffac8'), new THREE.Color('#800000'), new THREE.Color('#aaffd3'), new THREE.Color('#808000'), new THREE.Color('#ffd8b1'), new THREE.Color('#000075'), new THREE.Color('#808080'), new THREE.Color('#ffffff'), new THREE.Color('#000000')];
	
	var black = new THREE.Color('black');
	var timeCursor;
	var playing = false;
	var targetList = [];
	var rhythmWheelMesh;
	var tracks = [];
	var rhythmCount = 0;
	var scope;

	var preset = beats.bossaNova;
	var wheelLength = 16;
	if (preset.beat[0]) wheelLength = preset.beat[0].length;
	
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
					size: 0.5,
					height: 0,
					curveSegments: 1
				},
			},
			smallFont: {
				fontStyle: {
					font: null,
					size: 0.18,
					height: 0,
					curveSegments: 1
				},
			},
			messageDuration: 2000,
			zBufferOffset: 0.01,
			colors: {
				worldColor: new THREE.Color('white'),
				gridColor: black,
				arrowColor: black
			},
			floorSize: 100,
			rhythmWheel: {
				innerRadius: 1,
				outerRadius: 5,
				beats: wheelLength,
				tracks: preset.beat.length
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
			if (utils.mobile()) gfx.setCameraLocation(camera, new THREE.Vector3(self.settings.defaultCameraLocation.x, self.settings.defaultCameraLocation.y + 5, self.settings.defaultCameraLocation.z));
			camera.lookAt(new THREE.Vector3(0, 0, 0));
			self.addGeometries();
			self.addLabels();
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
			
			let bpm = 120;
			if (preset) {
				bpm = preset.bpm;
			}
			Tone.Transport.bpm.value = bpm;
			document.querySelector('#bpm').value = Tone.Transport.bpm.value.toString();
			Tone.Transport.timeSignature = [2, 4];
			
			for (let i = 0; i < self.settings.rhythmWheel.tracks; i++) { // init empty beats
				tracks.push([]);
				for (let j = 0; j < self.settings.rhythmWheel.beats; j++) {
					tracks[i].push(null);
				}
			}
			
			if (typeof preset.beat[0] !== 'undefined') tracks = preset.beat;
			
			//console.log(preset.beat[0]);
			
			for (let track = 0; track < tracks.length; track++) {
				
				for (let beat = 0; beat < tracks[track].length; beat++) {
					
					if (tracks[track][beat]) this.setFaceColorByNotePosition(beat, track);
				}
			}
	
			scope = self;
			Tone.Transport.scheduleRepeat(triggerBeats, '16n');
			
			function triggerBeats(time) {
				
				timeCursor.rotation.y += -2*Math.PI/scope.settings.rhythmWheel.beats;
				
				let beat = rhythmCount % scope.settings.rhythmWheel.beats;

				for (let i = 0; i < scope.settings.rhythmWheel.tracks; i++) {
					
					if (tracks[i][beat] !== null) {
						preset.instruments[i].start(time, 0);
					}
				}
				rhythmCount++;
			}
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
			
			var geometry = new THREE.BoxGeometry(0.1, 0.01, this.settings.rhythmWheel.outerRadius - this.settings.rhythmWheel.innerRadius);
			geometry.translate(0, 0.1/2, -(this.settings.rhythmWheel.outerRadius - this.settings.rhythmWheel.innerRadius)/2 - this.settings.rhythmWheel.innerRadius);
			var material = new THREE.MeshBasicMaterial({color: black, transparent: true, opacity: 0.75});
			timeCursor = new THREE.Mesh(geometry, material);
			scene.add(timeCursor);
		},
		
		setFaceColorByNotePosition: function(beatIndex, trackIndex) {
			
			let track = trackIndex + 1;
			beatIndex = beatIndex % this.settings.rhythmWheel.beats;
			let facesPerRow = this.settings.rhythmWheel.beats * 2;
			let faceIndex = (facesPerRow * track - 1) - (beatIndex * 2);

			this.setFaceColorByIndex(rhythmWheelMesh, faceIndex, distinctColors[trackIndex]);
			this.setFaceColorByIndex(rhythmWheelMesh, faceIndex - 1, distinctColors[trackIndex]);
			rhythmWheelMesh.geometry.faces[faceIndex].selected = true;
			rhythmWheelMesh.geometry.faces[faceIndex - 1].selected = true;
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
				self.setUpFaceClicks(faceIndex);
			}
		},
		
		setUpFaceClicks: function(faceIndex) {
			
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
				this.setFaceColorByIndex(rhythmWheelMesh, faceIndex, setColor);
				this.setFaceColorByIndex(rhythmWheelMesh, faceIndex + 1, setColor);
				rhythmWheelMesh.geometry.faces[faceIndex].selected = !rhythmWheelMesh.geometry.faces[faceIndex].selected;
				rhythmWheelMesh.geometry.faces[faceIndex + 1].selected = !rhythmWheelMesh.geometry.faces[faceIndex + 1].selected;
			}
			else {
				this.setFaceColorByIndex(rhythmWheelMesh, faceIndex, setColor);
				this.setFaceColorByIndex(rhythmWheelMesh, faceIndex - 1, setColor);
				rhythmWheelMesh.geometry.faces[faceIndex].selected = !rhythmWheelMesh.geometry.faces[faceIndex].selected;
				rhythmWheelMesh.geometry.faces[faceIndex - 1].selected = !rhythmWheelMesh.geometry.faces[faceIndex - 1].selected;
			}
			rhythmWheelMesh.geometry.colorsNeedUpdate = true;
			
			if (tracks[trackIndex][beatIndex] === null) tracks[trackIndex][beatIndex] = Object.keys(beats.allInstruments._players)[trackIndex]; // get an instrument for each track row
			else tracks[trackIndex][beatIndex] = null;
		},
		
		setFaceColorByIndex: function(mesh, faceIndex, color) {
			mesh.geometry.faces[faceIndex].color.setRGB(color.r, color.g, color.b);
			mesh.geometry.colorsNeedUpdate = true;
		},
		
		loadFont: function() {
			
			let self = this;
			let loader = new THREE.FontLoader();
			let fontPath = '';
			fontPath = 'assets/vendors/js/three.js/examples/fonts/helvetiker_regular.typeface.json';

			loader.load(fontPath, function(font) { // success event
				
				self.settings.font.fontStyle.font = font;
				self.settings.smallFont.fontStyle.font = font;
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
		},
		
		labelPoint: function(pt, label, scene, color, font) {
			
			font = font || this.settings.font;
			
			let self = this;
			
			let textCenterOffset = font.fontStyle.size / 2;
			if (this.settings.font.enable) {
				color = color || 0xff0000;
				let textGeometry = new THREE.TextGeometry(label, font.fontStyle);
				textGeometry.rotateX(-Math.PI / 2);
				textGeometry.translate(pt.x - textCenterOffset, pt.y, pt.z + textCenterOffset);
				let textMaterial = new THREE.MeshBasicMaterial({ color: color });
				let mesh = new THREE.Mesh(textGeometry, textMaterial);

				scene.add(mesh);
			}
		},
		
		addLabels: function() {
			
			let self = this;
			let transform = new THREE.Vector3(0, 0, -this.settings.rhythmWheel.outerRadius);
			
			for (let i = 0; i < self.settings.rhythmWheel.beats; i++) {
				
				let axis = new THREE.Vector3(0, 1, 0);
				let placementRotation = -(2 * Math.PI / self.settings.rhythmWheel.beats) * (i+ 1);
				let centerRotation = Math.PI / self.settings.rhythmWheel.beats;
				let totalRotation = placementRotation + centerRotation;
				let result = transform.clone().applyAxisAngle(axis, totalRotation);
				
				
				result.setLength(result.length() * (1 + self.settings.font.fontStyle.size / 8));
				var arrowHelper = new THREE.ArrowHelper(result.clone().normalize(), new THREE.Vector3(0, 2 * self.settings.zBufferOffset, 0), this.settings.rhythmWheel.outerRadius, black);
				
				let labelPoint = gfx.movePoint(new THREE.Vector3(0, 0, 0), result);
				if (i % 2 === 1) {
					self.labelPoint(labelPoint, Math.floor((i + 2)/2).toString(), scene, black);
				}
				else {
					self.labelPoint(labelPoint, '&', scene, black, self.settings.smallFont);
				}
			}
		}
	};
};