module.exports = function() {
	
	var renderer, scene, camera, controls, floor;
	var stats = new Stats();
	var wireframeMaterial = new THREE.MeshBasicMaterial({ wireframe: true, color: new THREE.Color('black'), opacity: .5, transparent: true });
	var shadeMaterial = new THREE.MeshPhongMaterial({
		color: 0xFFFFFF,
		side: THREE.DoubleSide,
		opacity: .25,
		transparent: true
	});
	var distinctColors = [new THREE.Color('#e6194b'), new THREE.Color('#3cb44b'), new THREE.Color('#ffe119'), new THREE.Color('#4363d8'), new THREE.Color('#f58231'), new THREE.Color('#911eb4'), new THREE.Color('#46f0f0'), new THREE.Color('#f032e6'), new THREE.Color('#bcf60c'), new THREE.Color('#fabebe'), new THREE.Color('#008080'), new THREE.Color('#e6beff'), new THREE.Color('#9a6324'), new THREE.Color('#fffac8'), new THREE.Color('#800000'), new THREE.Color('#aaffc3'), new THREE.Color('#808000'), new THREE.Color('#ffd8b1'), new THREE.Color('#000075'), new THREE.Color('#808080'), new THREE.Color('#ffffff'), new THREE.Color('#000000')];
	var black = new THREE.Color('black');
	var timeCursor, timeCursorEndpoint;
	
	return {
		
		settings: {
			defaultCameraLocation: {
				x: 0,
				y: 30,
				z: 0
			},
			activateLightHelpers: false,
			axesHelper: {
				activateAxesHelper: false,
				axisLength: 10
			},
			activateColorPickers: false,
			activateStatsFPS: false,
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
			self.setUpButtons();
		},
		
		begin: function() {
			
			let self = this;
			
			scene = gfx.setUpScene(scene);
			renderer = gfx.setUpRenderer(renderer);
			camera = gfx.setUpCamera(camera);
			floor = gfx.addFloor(this.settings.floorSize, scene, this.settings.colors.worldColor, this.settings.colors.gridColor);
			gfx.enableStats(stats);
			controls = gfx.enableControls(controls, renderer, camera);
			gfx.resizeRendererOnWindowResize(renderer, camera);
			gfx.setUpLights(scene);
			gfx.setCameraLocation(camera, self.settings.defaultCameraLocation);
			self.addGeometries();
			
			if (self.settings.activateStatsFPS) {
				self.enableStats();
			}
			
			var animate = function() {

				requestAnimationFrame(animate);
				renderer.render(scene, camera);
				controls.update();
				stats.update();
				
				scene.remove(timeCursor);
				gfx.rotateGeometryAboutLine(timeCursor.geometry, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0), -.02);
				timeCursor = gfx.drawLine(timeCursor.geometry.vertices[0], timeCursor.geometry.vertices[1], scene, 0xff0000);
			};
			
			animate();
		},
		
		addGeometries: function() {
			
			let self = this;
			
			let instrumentTracks = 4;
			let circleRadius = 4;
			let maxRadius = 0;
			for (let i = 1; i <= instrumentTracks; i++) {
				
				let ring = new THREE.CircleGeometry(circleRadius * i, 8);
				let mesh = new THREE.Mesh(ring, wireframeMaterial);
				ring.rotateX(Math.PI/2);
				scene.add(mesh);
				mesh.position.y += this.settings.zBufferOffset * i;
				
				ring = self.reorderCircleVertices(ring);
				maxRadius = circleRadius * i;
			}
			
			let buffer = (instrumentTracks + 1) * this.settings.zBufferOffset;
			let timeCursorGeometry = gfx.createLine(new THREE.Vector3(0, buffer, 0), new THREE.Vector3(0, buffer, -maxRadius));
			let material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
			timeCursor = new THREE.Line( timeCursorGeometry, material );
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

		enableStats: function() {
			document.body.appendChild(stats.dom);
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