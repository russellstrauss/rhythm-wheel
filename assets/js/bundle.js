(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {
  var _ref;

  var player = new Tone.Players((_ref = {
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
    ride: './assets/audio/jazz/ride-bell.wav',
    tomLo: './assets/audio/jazz/DR220Tom_Lo.wav',
    tomHi: './assets/audio/jazz/DR220Tom_Hi.wav',
    kick: './assets/audio/505/kick.mp3',
    cowbell: './assets/audio/jazz/cowbell.wav',
    bellHi: './assets/audio/jazz/hi-bell.wav',
    clave: './assets/audio/jazz/clave.wav',
    rakeLo: './assets/audio/jazz/rakeHigh.wav',
    rakeHi: './assets/audio/jazz/rakeLow.wav',
    clap: './assets/audio/jazz/RX21Clap.wav',
    shakerLo: './assets/audio/jazz/shakerLow.wav',
    shakerHi: './assets/audio/jazz/shakerHigh.wav',
    timbale: './assets/audio/jazz/timbale.wav',
    streetDrumLo: './assets/audio/jazz/streetDrumLo.wav',
    streetDrumHi: './assets/audio/jazz/streetDrumHi.wav'
  }, _defineProperty(_ref, "clap", './assets/audio/jazz/RX21Clap.wav'), _defineProperty(_ref, "whistle", './assets/audio/jazz/whistle.wav'), _ref), {
    volume: 5
  }).toMaster(); // Set display names for UI

  player.get('cowbell').displayName = 'Cowbell';
  player.get('clave').displayName = 'Clave';
  player.get('rim').displayName = 'Snare Rim';
  player.get('cowbell').displayName = 'Cowbell';
  player.get('bellHi').displayName = 'Bell';
  player.get('tomLo').displayName = 'Tom Low';
  player.get('tomHi').displayName = 'Tom High';
  player.get('snare').displayName = 'Snare';
  player.get('kick').displayName = 'Kick';
  player.get('hh').displayName = 'Hi-hat Closed';
  player.get('hho').displayName = 'Hi-hat Off';
  player.get('bongoLo').displayName = 'Bongo Low';
  player.get('bongoHi').displayName = 'Bongo High';
  player.get('congaLo').displayName = 'Conga Low';
  player.get('congaHi').displayName = 'Conga High';
  player.get('congaMuteHigh').displayName = 'Conga Mute High';
  player.get('ride').displayName = 'Ride Bell';
  player.get('rakeLo').displayName = 'Gü&uuml;iro Low';
  player.get('rakeHi').displayName = 'Gü&uuml;iro High';
  player.get('clap').displayName = 'Clap';
  player.get('shakerLo').displayName = 'Shaker Low';
  player.get('shakerHi').displayName = 'Shaker High';
  player.get('timbale').displayName = 'Timabale';
  player.get('streetDrumLo').displayName = 'Street Drum Low';
  player.get('streetDrumHi').displayName = 'Street Drum High';
  player.get('whistle').displayName = 'Whistle'; // Set volume to equalize instrument volumes

  player.get('cowbell').volume.value = -5;
  player.get('ride').volume.value = -3;
  player.get('tomLo').volume.value = -12;
  player.get('tomHi').volume.value = -12;
  player.get('kick').volume.value = -8;
  player.get('streetDrumHi').volume.value = -5;
  player.get('whistle').volume.value = -10;
  var defaultInstruments = [player.get('kick'), player.get('snare'), player.get('hh'), player.get('hho'), player.get('tomLo'), player.get('tomHi'), player.get('cowbell'), player.get('ride')]; //[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],

  window.beats = function () {
    return {
      allInstruments: player,
      instrumentSets: {
        bongos: {
          length: 16,
          bpm: 120,
          instruments: [player.get('bongoLo'), player.get('bongoHi'), player.get('congaLo'), player.get('congaHi'), player.get('congaMuteHigh')]
        },
        rockDrumSet: {
          length: 16,
          bpm: 115,
          instruments: [player.get('kick'), player.get('snare'), player.get('hh'), player.get('hho'), player.get('tomLo'), player.get('tomHi'), player.get('cowbell'), player.get('ride')]
        },
        parade: {
          length: 16,
          bpm: 115,
          instruments: [player.get('cowbell'), player.get('bellHi'), player.get('clave'), player.get('rakeLo'), player.get('rakeHi'), player.get('clap'), player.get('shakerLo'), player.get('shakerHi'), player.get('timbale'), player.get('streetDrumLo'), player.get('whistle')]
        }
      },
      empty: {
        beat: new Array(defaultInstruments.length),
        length: 16,
        bpm: 100,
        instruments: defaultInstruments
      },
      basic: {
        beat: [['kick', null, null, null, null, null, null, 'kick', 'kick', null, null, null, null, null, 'kick', null], [null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null], ['hh', null, 'hh', null, 'hh', null, 'hh', 'hh', 'hh', null, null, null, 'hh', null, 'hh', null], [null, null, null, null, null, null, null, null, null, null, 'hho', null, null, null, null, null]],
        length: 16,
        bpm: 100,
        instruments: [player.get('kick'), player.get('snare'), player.get('hh'), player.get('hho')]
      },
      bossaNova: {
        beat: [['ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride'], ['kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick'], ['clave', null, null, 'clave', null, null, 'clave', null, null, null, 'clave', null, null, 'clave', null, null]],
        length: 16,
        bpm: 80,
        instruments: [player.get('ride'), player.get('kick'), player.get('clave')]
      },
      funkyCowbell: {
        beat: [['kick', null, 'kick', null, null, null, null, null, null, null, 'kick', null, null, 'kick', null, null], [null, null, null, null, 'snare', null, null, 'snare', null, 'snare', null, 'snare', 'snare', null, null, 'snare'], ['hh', 'hh', 'hh', 'hh', 'hh', 'hh', 'hh', null, 'hh', 'hh', 'hh', 'hh', 'hh', null, 'hh', 'hh'], [null, null, null, null, null, null, null, 'hho', null, null, null, null, null, 'hho', null, null], ['cowbell', null, 'cowbell', null, null, 'cowbell', null, 'cowbell', null, 'cowbell', null, 'cowbell', null, null, 'cowbell', null]],
        length: 16,
        bpm: 80,
        instruments: [player.get('kick'), player.get('snare'), player.get('hh'), player.get('hho'), player.get('cowbell')]
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
        beat: [['ride', null, 'ride', null, 'ride', 'ride', null, 'ride', null, 'ride', null, 'ride'], ['hh', null, null, 'hh', null, null, 'hh', null, null, 'hh', null, null], ['kick', null, null, null, null, null, null, null, null, null, null, 'kick'], [null, null, 'rim', null, null, null, null, 'rim', null, null, null, null], [null, null, null, null, null, null, null, null, null, null, 'tomLo', 'tomLo'], [null, null, null, null, null, 'tomHi', null, null, null, null, null, null]],
        length: 12,
        bpm: 90,
        instruments: [player.get('ride'), player.get('hh'), player.get('tomLo'), player.get('tomHi'), player.get('kick'), player.get('rim')]
      },
      sikyi: {
        beat: [['ride', null, 'ride', 'ride', null, null, 'ride', null, 'ride', null, 'ride', 'ride', null, null, 'ride', null], [null, null, null, null, null, null, 'hh', null, null, null, 'hh', null, null, null, 'hh', null], ['kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null], [null, 'tomLo', null, 'tomLo', null, null, null, null, null, null, 'tomLo', 'tomLo', null, null, null, null], [null, null, null, null, null, null, 'tomHi', 'tomHi', null, null, null, null, null, null, 'tomHi', 'tomHi']],
        length: 16,
        bpm: 130,
        instruments: [player.get('ride'), player.get('hh'), player.get('kick'), player.get('tomLo'), player.get('tomHi')]
      },
      sikyi2: {
        beat: [['ride', null, 'ride', 'ride', null, null, 'ride', null, 'ride', null, 'ride', 'ride', null, null, 'ride', null], [null, null, null, null, null, null, 'hh', null, null, null, 'hh', null, null, null, 'hh', null], ['kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null], [null, 'tomLo', null, 'tomLo', null, null, null, null, null, null, null, null, null, null, 'tomLo', 'tomLo'], [null, null, null, null, null, null, 'tomHi', null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null, null, null, 'rim', null, null, null, null]],
        length: 16,
        bpm: 130,
        instruments: [player.get('ride'), player.get('hh'), player.get('kick'), player.get('tomLo'), player.get('tomHi'), player.get('rim')]
      },
      billieJean: {
        beat: [['kick', null, null, null, null, null, null, null, 'kick', null, null, null, null, null, null, null], [null, null, null, null, 'snare', null, null, null, null, null, null, null, 'snare', null, null, null], ['hh', null, 'hh', null, 'hh', null, 'hh', null, 'hh', null, 'hh', null, 'hh', null, 'hh', null]],
        length: 16,
        bpm: 115,
        instruments: [player.get('snare'), player.get('kick'), player.get('hh')]
      },
      rumba: {
        beat: [['kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick', 'kick', null, null, 'kick'], ['rim', null, null, 'rim', null, null, null, 'rim', null, null, 'rim', null, 'rim', null, null, null], ['ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride', 'ride']],
        length: 16,
        bpm: 90,
        instruments: [player.get('kick'), player.get('rim'), player.get('ride')]
      },
      gahu: {
        beat: [['kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null, 'kick', null, 'kick', null], [null, null, 'rim', 'rim', null, null, 'rim', 'rim', null, null, 'rim', 'rim', null, null, 'rim', 'rim'], ['bellHi', null, null, null, 'bellHi', null, 'bellHi', null, null, null, 'bellHi', null, 'bellHi', null, null, null]],
        length: 16,
        bpm: 100,
        instruments: [player.get('kick'), player.get('rim'), player.get('bellHi')]
      },
      souskous: {
        beat: [['kick', null, null, null, 'kick', null, null, null, 'kick', null, null, null, 'kick', null, 'kick', null], ['rim', null, null, 'rim', null, null, 'rim', null, 'rim', null, null, 'rim', null, null, 'rim', null], ['bellHi', null, null, 'bellHi', null, null, 'bellHi', null, null, 'bellHi', 'bellHi', null, null, null, null, null]],
        length: 16,
        bpm: 120,
        instruments: [player.get('kick'), player.get('rim'), player.get('bellHi')]
      },
      shiko: {
        beat: [['kick', null, null, null, 'kick', null, 'kick', null, 'kick', null, null, null, 'kick', null, 'kick', null], [null, null, 'rim', 'rim', null, null, 'rim', 'rim', null, null, 'rim', 'rim', null, null, 'rim', 'rim'], ['bellHi', null, null, null, 'bellHi', null, 'bellHi', null, null, null, 'bellHi', null, 'bellHi', null, null, null]],
        length: 16,
        bpm: 120,
        instruments: [player.get('kick'), player.get('rim'), player.get('bellHi')] //,
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

      }
    };
  }(); //[null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],


  module.exports = window.beats;
})();

},{}],2:[function(require,module,exports){
"use strict";

module.exports = function () {
  var renderer, scene, camera, controls, floor;
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();
  var wireframeMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: new THREE.Color('black'),
    opacity: 0.25,
    transparent: true
  });
  var distinctColors = [new THREE.Color('#2F72CA'), new THREE.Color('#A82F2F'), new THREE.Color('#18995B'), new THREE.Color('#F2B233'), new THREE.Color('#f58231'), new THREE.Color('#543459'), new THREE.Color('#6EC2ED'), new THREE.Color('#E84A5F'), new THREE.Color('#bcf60c'), new THREE.Color('#fabebe'), new THREE.Color('#008080'), new THREE.Color('#e6beff'), new THREE.Color('#9a6324'), new THREE.Color('#fffac8'), new THREE.Color('#800000'), new THREE.Color('#aaffd3'), new THREE.Color('#808000'), new THREE.Color('#ffd8b1'), new THREE.Color('#000075'), new THREE.Color('#808080'), new THREE.Color('#ffffff'), new THREE.Color('#000000')];
  var textColors = ['white', 'white', 'white', 'black', 'black', 'white', 'black', 'white', 'black', 'black', 'white'];
  var black = new THREE.Color('black'),
      white = new THREE.Color('white');
  var timeCursor;
  var playing = false;
  var targetList = [];
  var rhythmWheelMesh, wireframeMesh;
  var tracks = [];
  var rhythmCount = 0;
  var scope;
  var loop;
  var preset = beats.empty;
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
        }
      },
      smallFont: {
        fontStyle: {
          font: null,
          size: 0.18,
          height: 0,
          curveSegments: 1
        }
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
        innerRadius: utils.mobile() ? .5 : 1,
        outerRadius: 5,
        beats: preset.length,
        tracks: preset.instruments.length
      }
    },
    init: function init() {
      var self = this;
      self.loadFont();
    },
    begin: function begin() {
      var self = this;
      scene = gfx.setUpScene(scene);
      renderer = gfx.setUpRenderer(renderer);
      camera = gfx.setUpCamera(camera); //controls = gfx.enableControls(controls, renderer, camera);

      gfx.resizeRendererOnWindowResize(renderer, camera);
      self.bindUIEvents();
      gfx.setUpLights(scene);
      gfx.setCameraLocation(camera, self.settings.defaultCameraLocation);
      if (utils.mobile()) gfx.setCameraLocation(camera, new THREE.Vector3(self.settings.defaultCameraLocation.x, self.settings.defaultCameraLocation.y + 5, self.settings.defaultCameraLocation.z));
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      self.addGeometries();
      self.addLabels();
      self.setUpRhythm();

      var animate = function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        if (controls) controls.update();
        rhythmWheelMesh.geometry.colorsNeedUpdate = true;
      };

      animate();
    },
    initEmptyTracks: function initEmptyTracks() {
      for (var i = 0; i < this.settings.rhythmWheel.tracks; i++) {
        // init empty beats
        tracks.push([]);

        for (var j = 0; j < this.settings.rhythmWheel.beats; j++) {
          tracks[i].push(null);
        }
      }
    },
    setUpRhythm: function setUpRhythm() {
      var self = this;
      var bpm = 120;

      if (preset) {
        bpm = preset.bpm;
      }

      Tone.Transport.bpm.value = bpm;
      document.querySelector('#bpm').value = preset.bpm.toString();
      document.querySelector('#wheelLength').value = self.settings.rhythmWheel.beats.toString();
      Tone.Transport.timeSignature = [2, 4];
      self.initEmptyTracks();
      if (typeof preset.beat[0] !== 'undefined') tracks = preset.beat;

      for (var track = 0; track < tracks.length; track++) {
        for (var beat = 0; beat < tracks[track].length; beat++) {
          if (tracks[track][beat]) this.setNoteOn(beat, track);
        }
      }

      loop = new Tone.Loop(function (time) {
        triggerBeats(time);
      }, '16n');
      loop.start(0);
      scope = self;

      function triggerBeats(time) {
        timeCursor.rotation.y += -2 * Math.PI / scope.settings.rhythmWheel.beats;
        var beat = rhythmCount % scope.settings.rhythmWheel.beats;

        for (var i = 0; i < scope.settings.rhythmWheel.tracks; i++) {
          if (tracks[i]) {
            // an instrument added but no notes for that instrument in preset.beat[]
            if (tracks[i][beat] !== null) {
              preset.instruments[i].start(time, 0);
            }
          }
        }

        rhythmCount++;
      }
    },
    addGeometries: function addGeometries() {
      var self = this;
      floor = gfx.addFloor(this.settings.floorSize, scene, this.settings.colors.worldColor, this.settings.colors.gridColor);
      var rhythmWheel = new THREE.RingGeometry(self.settings.rhythmWheel.innerRadius, self.settings.rhythmWheel.outerRadius, self.settings.rhythmWheel.beats, self.settings.rhythmWheel.tracks);
      rhythmWheel.rotateX(-Math.PI / 2);
      rhythmWheel.rotateY(Math.PI / 2);
      rhythmWheel.translate(0, this.settings.zBufferOffset, 0);
      var solidFaceMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color('white'),
        vertexColors: THREE.FaceColors,
        transparent: false
      });
      var translucentFaceMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color('white'),
        vertexColors: THREE.FaceColors,
        transparent: true,
        opacity: 0.14
      });
      var materials = [translucentFaceMaterial, solidFaceMaterial];
      rhythmWheelMesh = new THREE.Mesh(rhythmWheel, materials);
      rhythmWheel.faces.forEach(function (face, i) {
        // set default color tracks
        var trackIndex = Math.floor(i / (self.settings.rhythmWheel.beats * 2));
        face.materialIndex = 0;
        face.color = distinctColors[trackIndex];
      });
      wireframeMesh = new THREE.Mesh(rhythmWheel, wireframeMaterial);
      wireframeMesh.position.y += this.settings.zBufferOffset * 2;
      targetList.push(rhythmWheelMesh);
      scene.add(rhythmWheelMesh);
      scene.add(wireframeMesh);
      var geometry = new THREE.BoxGeometry(0.1, 0.01, this.settings.rhythmWheel.outerRadius - this.settings.rhythmWheel.innerRadius);
      geometry.translate(0, 0.1 / 2, -(this.settings.rhythmWheel.outerRadius - this.settings.rhythmWheel.innerRadius) / 2 - this.settings.rhythmWheel.innerRadius);
      var material = new THREE.MeshBasicMaterial({
        color: black,
        transparent: true,
        opacity: 0.75
      });
      timeCursor = new THREE.Mesh(geometry, material);
      scene.add(timeCursor);
    },
    setNoteOn: function setNoteOn(beatIndex, trackIndex) {
      var track = trackIndex + 1;
      beatIndex = beatIndex % this.settings.rhythmWheel.beats;
      var facesPerRow = this.settings.rhythmWheel.beats * 2;
      var faceIndex = facesPerRow * track - 1 - beatIndex * 2;
      this.setFaceColorByIndex(rhythmWheelMesh, faceIndex, distinctColors[trackIndex], 1);
      this.setFaceColorByIndex(rhythmWheelMesh, faceIndex - 1, distinctColors[trackIndex], 1);
      rhythmWheelMesh.geometry.faces[faceIndex].selected = true;
      rhythmWheelMesh.geometry.faces[faceIndex - 1].selected = true;
    },
    setNoteOff: function setNoteOff(beatIndex, trackIndex) {
      var track = trackIndex + 1;
      beatIndex = beatIndex % this.settings.rhythmWheel.beats;
      var facesPerRow = this.settings.rhythmWheel.beats * 2;
      var faceIndex = facesPerRow * track - 1 - beatIndex * 2;
      this.setFaceColorByIndex(rhythmWheelMesh, faceIndex, white, 1);
      this.setFaceColorByIndex(rhythmWheelMesh, faceIndex - 1, white, 1);
      rhythmWheelMesh.geometry.faces[faceIndex].selected = false;
      rhythmWheelMesh.geometry.faces[faceIndex - 1].selected = false;
    },
    enableControls: function enableControls() {
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
    bindUIEvents: function bindUIEvents() {
      var self = this;
      var message = document.getElementById('message');

      var onMouseMove = function onMouseMove(event) {
        mouse.x = (event.clientX - renderer.domElement.offsetLeft) / renderer.domElement.width * 2 - 1;
        mouse.y = -((event.clientY - renderer.domElement.offsetTop) / renderer.domElement.height) * 2 + 1;
      };

      window.addEventListener('mousemove', onMouseMove, false);
      document.querySelector('canvas').addEventListener('click', function (event) {
        self.intersects(event);
      });
      var wheelLengthInput = document.querySelector('#wheelLength');
      var instrumentSelector = document.querySelector('.instrument-selection');
      var presetSelector = document.querySelector('.presets');
      if (presetSelector) presetSelector.addEventListener('change', function () {
        instrumentSelector.selectedIndex = 0;
        wheelLengthInput.parentElement.parentElement.style.display = 'none';
        preset = beats[presetSelector.value];
        tracks = [];
        self.settings.rhythmWheel.tracks = preset.instruments.length;
        self.settings.rhythmWheel.beats = preset.length;
        self.reset();
      });
      if (instrumentSelector) instrumentSelector.addEventListener('change', function () {
        presetSelector.selectedIndex = 0;
        wheelLengthInput.parentElement.parentElement.style.display = 'block';
        self.clearAllNotes();
        preset = beats['empty'];
        preset.bpm = beats.instrumentSets[instrumentSelector.value].bpm;
        preset.instruments = beats.instrumentSets[instrumentSelector.value].instruments;
        self.settings.rhythmWheel.tracks = beats.instrumentSets[instrumentSelector.value].instruments.length;
        self.settings.rhythmWheel.beats = beats.instrumentSets[instrumentSelector.value].length;
        self.reset();
      });
      var clearButton = document.querySelector('.clear-notes');
      if (clearButton) clearButton.addEventListener('click', function () {
        self.clearAllNotes();
      });
      var inputSteppers = document.querySelectorAll('.input-stepper');
      inputSteppers.forEach(function (inputStepper) {
        var input = inputStepper.querySelector('input');

        if (input.getAttribute('id') === 'wheelLength') {
          var increase = inputStepper.querySelector('.increase');
          if (increase) increase.addEventListener('click', function () {
            var max = parseInt(input.getAttribute('max'));

            if (input.value < max) {
              input.value = parseInt(input.value) + 1;
              self.increaseWheel();
            }
          });
          var decrease = inputStepper.querySelector('.decrease');
          if (decrease) decrease.addEventListener('click', function () {
            var min = parseInt(input.getAttribute('min'));

            if (input.value > min) {
              input.value = parseInt(input.value) - 1;
              self.decreaseWheel();
            }
          });
        }
      });
    },
    clearAllNotes: function clearAllNotes() {
      var self = this;
      self.reset();
      preset.beats = [];
      tracks = [];
      self.initEmptyTracks();

      for (var i = 0; i < self.settings.rhythmWheel.beats; i++) {
        preset.beats.push([]);

        for (var j = 0; j < self.settings.rhythmWheel.tracks; j++) {
          preset.beats[i].push(null);
          self.setNoteOff(i, j);
        }
      }
    },
    reset: function reset() {
      var self = this;
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
      rhythmCount = 0;
      targetList = [];

      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }

      self.addGeometries();
      self.addLabels();
      self.setUpRhythm();
      var playToggle = document.querySelector('.play-toggle');
      playToggle.classList.remove('active');
    },
    increaseWheel: function increaseWheel() {
      var self = this;
      self.settings.rhythmWheel.beats += 1;
      preset.beat.forEach(function (track) {
        track.push(null);
      });
      self.reset();
      self.clearAllNotes();
    },
    decreaseWheel: function decreaseWheel() {
      var self = this;
      self.settings.rhythmWheel.beats -= 1;
      self.clearAllNotes();
      preset.beat.forEach(function (track) {
        track.pop(null);
      });
      self.reset();
      self.clearAllNotes();
    },
    intersects: function intersects(event) {
      var self = this;
      raycaster.setFromCamera(mouse, camera);
      var intersects = raycaster.intersectObjects(targetList);

      if (intersects.length > 0) {
        var faceIndex = intersects[0].faceIndex;
        self.setUpFaceClicks(faceIndex);
      }
    },
    setUpFaceClicks: function setUpFaceClicks(faceIndex) {
      var beatIndex = this.settings.rhythmWheel.beats - 1 - Math.floor(faceIndex / 2) % this.settings.rhythmWheel.beats;
      var trackIndex = Math.floor(faceIndex / (this.settings.rhythmWheel.beats * 2));
      var setMaterial = 1;

      if (rhythmWheelMesh.geometry.faces[faceIndex].selected === true) {
        setMaterial = 0;
      } else {
        setMaterial = 1;
      }

      var evenFace = faceIndex % 2 === 0;

      if (evenFace) {
        this.setFaceColorByIndex(rhythmWheelMesh, faceIndex, distinctColors[trackIndex], setMaterial);
        this.setFaceColorByIndex(rhythmWheelMesh, faceIndex + 1, distinctColors[trackIndex], setMaterial);
        rhythmWheelMesh.geometry.faces[faceIndex].selected = !rhythmWheelMesh.geometry.faces[faceIndex].selected;
        rhythmWheelMesh.geometry.faces[faceIndex + 1].selected = !rhythmWheelMesh.geometry.faces[faceIndex + 1].selected;
      } else {
        this.setFaceColorByIndex(rhythmWheelMesh, faceIndex, distinctColors[trackIndex], setMaterial);
        this.setFaceColorByIndex(rhythmWheelMesh, faceIndex - 1, distinctColors[trackIndex], setMaterial);
        rhythmWheelMesh.geometry.faces[faceIndex].selected = !rhythmWheelMesh.geometry.faces[faceIndex].selected;
        rhythmWheelMesh.geometry.faces[faceIndex - 1].selected = !rhythmWheelMesh.geometry.faces[faceIndex - 1].selected;
      }

      if (tracks[trackIndex][beatIndex] === null) tracks[trackIndex][beatIndex] = Object.keys(beats.allInstruments._players)[trackIndex]; // get an instrument for each track row
      else tracks[trackIndex][beatIndex] = null;
    },
    setFaceColorByIndex: function setFaceColorByIndex(mesh, faceIndex, color, materialIndex) {
      mesh.geometry.faces[faceIndex].materialIndex = materialIndex;
      mesh.geometry.faces[faceIndex].color.setRGB(color.r, color.g, color.b);
      rhythmWheelMesh.geometry.colorsNeedUpdate = true;
      rhythmWheelMesh.geometry.groupsNeedUpdate = true;
    },
    loadFont: function loadFont() {
      var self = this;
      var loader = new THREE.FontLoader();
      var fontPath = '';
      fontPath = 'assets/vendors/js/three.js/examples/fonts/helvetiker_regular.typeface.json';
      loader.load(fontPath, function (font) {
        // success event
        self.settings.font.fontStyle.font = font;
        self.settings.smallFont.fontStyle.font = font;
        self.begin();
        if (self.settings.axesHelper.activateAxesHelper) self.labelAxes();
      }, function (event) {// in progress event.
      }, function (event) {
        // error event
        self.settings.font.enable = false;
        self.begin();
      });
    },
    resizeRendererOnWindowResize: function resizeRendererOnWindowResize() {
      window.addEventListener('resize', utils.debounce(function () {
        if (renderer) {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        }
      }, 250));
    },
    labelPoint: function labelPoint(pt, label, scene, color, font) {
      font = font || this.settings.font;
      var self = this;
      var textCenterOffset = font.fontStyle.size / 2;

      if (this.settings.font.enable) {
        color = color || 0xff0000;
        var textGeometry = new THREE.TextGeometry(label, font.fontStyle);
        textGeometry.rotateX(-Math.PI / 2);
        textGeometry.translate(pt.x - textCenterOffset, pt.y, pt.z + textCenterOffset);
        var textMaterial = new THREE.MeshBasicMaterial({
          color: color
        });
        var mesh = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(mesh);
      }
    },
    addLabels: function addLabels() {
      var self = this;
      var transform = new THREE.Vector3(0, 0, -this.settings.rhythmWheel.outerRadius);
      var instrumentNames = document.querySelector('.instrument-names');
      instrumentNames.innerHTML = '';
      preset.instruments.forEach(function (instrument, i) {
        var instrumentElement = document.createElement('li');
        instrumentElement.innerHTML = instrument.displayName;
        instrumentElement.style.backgroundColor = '#' + distinctColors[i].getHexString();
        instrumentElement.style.color = textColors[i];
        instrumentNames.appendChild(instrumentElement);
      });

      for (var i = 0; i < self.settings.rhythmWheel.beats; i++) {
        var axis = new THREE.Vector3(0, 1, 0);
        var placementRotation = -(2 * Math.PI / self.settings.rhythmWheel.beats) * (i + 1);
        var centerRotation = Math.PI / self.settings.rhythmWheel.beats;
        var totalRotation = placementRotation + centerRotation;
        var result = transform.clone().applyAxisAngle(axis, totalRotation);
        var labelPoint = void 0;

        if (i % 2 === 1) {
          result.setLength(result.length() * (1 + self.settings.font.fontStyle.size / 4));
          labelPoint = gfx.movePoint(new THREE.Vector3(0, 0, 0), result);

          if (self.settings.rhythmWheel.beats < 32) {
            self.labelPoint(labelPoint, Math.floor((i + 2) / 2).toString(), scene, black);
          } else {
            self.labelPoint(labelPoint, Math.floor((i + 2) / 2).toString(), scene, black, self.settings.smallFont);
          }
        } else if (self.settings.rhythmWheel.beats <= 31) {
          result.setLength(result.length() * (1 + self.settings.font.fontStyle.size / 8));
          labelPoint = gfx.movePoint(new THREE.Vector3(0, 0, 0), result);
          self.labelPoint(labelPoint, '&', scene, black, self.settings.smallFont);
        }
      }
    }
  };
};

},{}],3:[function(require,module,exports){
"use strict";

module.exports = function () {
  return {
    settings: {},
    init: function init() {
      this.bindEvents();
      this.setKeys();
    },
    bindEvents: function bindEvents() {
      var enter = 13;
      var inputSteppers = document.querySelectorAll('.input-stepper');
      inputSteppers.forEach(function (inputStepper) {
        var input = inputStepper.querySelector('input');

        if (input.getAttribute('id') === 'bpm') {
          var increase = inputStepper.querySelector('.increase');
          if (increase) increase.addEventListener('click', function () {
            var max = parseInt(input.getAttribute('max'));

            if (input.value < max) {
              input.value = parseInt(input.value) + 1;
              Tone.Transport.bpm.value += 1;
            }
          });
          var decrease = inputStepper.querySelector('.decrease');
          if (decrease) decrease.addEventListener('click', function () {
            var min = parseInt(input.getAttribute('min'));

            if (input.value > min) {
              input.value = parseInt(input.value) - 1;
              Tone.Transport.bpm.value -= 1;
            }
          });
        }
      });
      var playToggle = document.querySelector('.play-toggle');
      playToggle.addEventListener('click', function () {
        playToggle.classList.toggle('active');
        Tone.Transport.toggle();
      });
      var bpmInput = document.querySelector('#bpm');
      var timeout; // give half second of user input before rapidly changing tempo

      bpmInput.addEventListener('keyup', function (event) {
        if (parseInt(bpmInput.value) > 39) {
          if (event.keyCode === enter) {
            clearTimeout(timeout);
            Tone.Transport.bpm.value = parseInt(bpmInput.value);
          } else {
            timeout = setTimeout(function () {
              Tone.Transport.bpm.value = parseInt(bpmInput.value);
            }, 500);
          }
        }
      });
      bpmInput.addEventListener('keydown', function () {
        clearTimeout(timeout);
      });
    },
    setKeys: function setKeys() {
      document.addEventListener('keyup', function (event) {
        var space = 32;

        if (event.keyCode === space) {
          Tone.Transport.toggle();
        }
      });
    }
  };
};

},{}],4:[function(require,module,exports){
"use strict";

(function () {
  var appSettings;

  window.gfx = function () {
    return {
      appSettings: {
        activateLightHelpers: false,
        axesHelper: {
          activateAxesHelper: false,
          axisLength: 10
        },
        errorLogging: false
      },
      activateAxesHelper: function activateAxesHelper(scene) {
        var self = this;
        var axesHelper = new THREE.AxesHelper(gfx.appSettings.axesHelper.axisLength);
        scene.add(axesHelper);
      },
      activateLightHelpers: function activateLightHelpers(scene, lights) {
        for (var i = 0; i < lights.length; i++) {
          var helper = new THREE.DirectionalLightHelper(lights[i], 5, 0x00000);
          scene.add(helper);
        }
      },
      addFloor: function addFloor(size, scene, worldColor, gridColor) {
        var planeGeometry = new THREE.PlaneBufferGeometry(size, size);
        planeGeometry.rotateX(-Math.PI / 2);
        var planeMaterial = new THREE.ShadowMaterial();
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.y = -1;
        plane.receiveShadow = true;
        scene.add(plane);
        var helper = new THREE.GridHelper(size, 20, gridColor, gridColor);
        helper.material.opacity = 0.1;
        helper.material.transparent = true;
        scene.add(helper);
        scene.background = worldColor;
        return plane;
      },
      createVector: function createVector(pt1, pt2) {
        return new THREE.Vector3(pt2.x - pt1.x, pt2.y - pt1.y, pt2.z - pt1.z);
      },
      addVectors: function addVectors(vector1, vector2) {
        return new THREE.Vector3(vector1.x + vector2.x, vector1.y + vector2.y, vector1.z + vector2.z);
      },
      getSharedVertices: function getSharedVertices(geometry1, geometry2) {
        var result = new THREE.Geometry();
        geometry1.vertices.forEach(function (geometry1Vertex) {
          geometry2.vertices.forEach(function (geometry2Vertex) {
            if (utils.roundHundreths(geometry1Vertex.x) === utils.roundHundreths(geometry2Vertex.x) && utils.roundHundreths(geometry1Vertex.y) === utils.roundHundreths(geometry2Vertex.y) && utils.roundHundreths(geometry1Vertex.z) === utils.roundHundreths(geometry2Vertex.z)) {
              result.vertices.push(geometry2Vertex);
            }
          });
        });
        return result;
      },
      getHighestVertex: function getHighestVertex(geometry) {
        var self = this;
        var highest = new THREE.Vector3();
        geometry.vertices.forEach(function (vertex) {
          if (vertex.y > highest.y) {
            highest = vertex;
          }
        });
        return new THREE.Vector3(highest.x, highest.y, highest.z);
      },
      getMagnitude: function getMagnitude(vector) {
        var magnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2));
        return magnitude;
      },
      getMidpoint: function getMidpoint(pt1, pt2) {
        var midpoint = new THREE.Vector3();
        midpoint.x = (pt1.x + pt2.x) / 2;
        midpoint.y = (pt1.y + pt2.y) / 2;
        midpoint.z = (pt1.z + pt2.z) / 2;
        return midpoint;
      },
      getBottomFace: function getBottomFace(tetrahedronGeometry) {
        var self = this;
        var bottomFace = new THREE.Geometry();
        tetrahedronGeometry.vertices.forEach(function (vertex) {
          if (utils.roundHundreths(vertex.y) === 0) {
            bottomFace.vertices.push(vertex);
          }
        });
        return bottomFace;
      },
      getCentroidOfBottomFace: function getCentroidOfBottomFace(tetrahedronGeometry) {
        var centroidOfBottomFace = {};
        centroidOfBottomFace.x = (tetrahedronGeometry.vertices[0].x + tetrahedronGeometry.vertices[1].x + tetrahedronGeometry.vertices[3].x) / 3;
        centroidOfBottomFace.y = (tetrahedronGeometry.vertices[0].y + tetrahedronGeometry.vertices[1].y + tetrahedronGeometry.vertices[3].y) / 3;
        centroidOfBottomFace.z = (tetrahedronGeometry.vertices[0].z + tetrahedronGeometry.vertices[1].z + tetrahedronGeometry.vertices[3].z) / 3;
        return centroidOfBottomFace;
      },
      isRightTurn: function isRightTurn(startingPoint, turningPoint, endingPoint) {
        // This might only work if vectors are flat on the ground since I am using y-component to determine sign
        var segment1 = gfx.createVector(startingPoint, turningPoint);
        var segment2 = gfx.createVector(turningPoint, endingPoint);
        var result = new THREE.Vector3();
        result.crossVectors(segment1, segment2);
        return result.y > 0;
      },
      rotatePointAboutLine: function rotatePointAboutLine(pt, axisPt1, axisPt2, angle) {
        var self = this; // uncomment to visualize endpoints of rotation axis
        // self.showPoint(axisPt1, new THREE.Color('red'));
        // self.showPoint(axisPt2, new THREE.Color('red'));

        var u = new THREE.Vector3(0, 0, 0),
            rotation1 = new THREE.Vector3(0, 0, 0),
            rotation2 = new THREE.Vector3(0, 0, 0);
        var d = 0.0; // Move rotation axis to origin

        rotation1.x = pt.x - axisPt1.x;
        rotation1.y = pt.y - axisPt1.y;
        rotation1.z = pt.z - axisPt1.z; // Get unit vector equivalent to rotation axis

        u.x = axisPt2.x - axisPt1.x;
        u.y = axisPt2.y - axisPt1.y;
        u.z = axisPt2.z - axisPt1.z;
        u.normalize();
        d = Math.sqrt(u.y * u.y + u.z * u.z); // Rotation onto first plane

        if (d != 0) {
          rotation2.x = rotation1.x;
          rotation2.y = rotation1.y * u.z / d - rotation1.z * u.y / d;
          rotation2.z = rotation1.y * u.y / d + rotation1.z * u.z / d;
        } else {
          rotation2 = rotation1;
        } // Rotation rotation onto second plane


        rotation1.x = rotation2.x * d - rotation2.z * u.x;
        rotation1.y = rotation2.y;
        rotation1.z = rotation2.x * u.x + rotation2.z * d; // Oriented to axis, now perform original rotation

        rotation2.x = rotation1.x * Math.cos(angle) - rotation1.y * Math.sin(angle);
        rotation2.y = rotation1.x * Math.sin(angle) + rotation1.y * Math.cos(angle);
        rotation2.z = rotation1.z; // Undo rotation 1

        rotation1.x = rotation2.x * d + rotation2.z * u.x;
        rotation1.y = rotation2.y;
        rotation1.z = -rotation2.x * u.x + rotation2.z * d; // Undo rotation 2

        if (d != 0) {
          rotation2.x = rotation1.x;
          rotation2.y = rotation1.y * u.z / d + rotation1.z * u.y / d;
          rotation2.z = -rotation1.y * u.y / d + rotation1.z * u.z / d;
        } else {
          rotation2 = rotation1;
        } // Move back into place


        rotation1.x = rotation2.x + axisPt1.x;
        rotation1.y = rotation2.y + axisPt1.y;
        rotation1.z = rotation2.z + axisPt1.z;
        return rotation1;
      },
      rotateGeometryAboutLine: function rotateGeometryAboutLine(geometry, axisPt1, axisPt2, angle) {
        var self = this;

        for (var i = 0; i < geometry.vertices.length; i++) {
          geometry.vertices[i].set(gfx.rotatePointAboutLine(geometry.vertices[i], axisPt1, axisPt2, angle).x, gfx.rotatePointAboutLine(geometry.vertices[i], axisPt1, axisPt2, angle).y, gfx.rotatePointAboutLine(geometry.vertices[i], axisPt1, axisPt2, angle).z);
        }

        return geometry;
      },
      setUpScene: function setUpScene(scene, renderer) {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        if (gfx.appSettings.axesHelper.activateAxesHelper) {
          gfx.activateAxesHelper(scene);
        }

        return scene;
      },
      setUpRenderer: function setUpRenderer(renderer) {
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        return renderer;
      },
      setUpCamera: function setUpCamera(camera) {
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        return camera;
      },
      showPoints: function showPoints(geometry, scene, color, opacity) {
        var self = this;

        for (var i = 0; i < geometry.vertices.length; i++) {
          gfx.showPoint(geometry.vertices[i], scene, color, opacity);
        }
      },
      showPoint: function showPoint(pt, scene, color, opacity) {
        color = color || 0xff0000;
        opacity = opacity || 1;
        var dotGeometry = new THREE.Geometry();
        dotGeometry.vertices.push(new THREE.Vector3(pt.x, pt.y, pt.z));
        var dotMaterial = new THREE.PointsMaterial({
          size: 10,
          sizeAttenuation: false,
          color: color,
          opacity: opacity,
          transparent: true
        });
        var dot = new THREE.Points(dotGeometry, dotMaterial);
        scene.add(dot);
        return dot;
      },
      showVector: function showVector(vector, origin, scene, color) {
        color = color || 0xff0000;
        var arrowHelper = new THREE.ArrowHelper(vector, origin, vector.length(), color);
        scene.add(arrowHelper);
      },
      drawLine: function drawLine(pt1, pt2, scene, color) {
        color = color || 0x0000ff;
        var material = new THREE.LineBasicMaterial({
          color: color
        });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(pt1.x, pt1.y, pt1.z));
        geometry.vertices.push(new THREE.Vector3(pt2.x, pt2.y, pt2.z));
        var line = new THREE.Line(geometry, material);
        scene.add(line);
        return line;
      },
      createLine: function createLine(pt1, pt2) {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(pt1);
        geometry.vertices.push(pt2);
        return geometry;
      },
      getDistance: function getDistance(pt1, pt2) {
        // create point class?
        var squirt = Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2) + Math.pow(pt2.z - pt1.z, 2);
        return Math.sqrt(squirt);
      },
      labelAxes: function labelAxes(scene) {
        var self = this;

        if (gfx.appSettings.font.enable) {
          var textGeometry = new THREE.TextGeometry('Y', gfx.appSettings.font.fontStyle);
          var textMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00
          });
          var mesh = new THREE.Mesh(textGeometry, textMaterial);
          textGeometry.translate(0, gfx.appSettings.axesHelper.axisLength, 0);
          scene.add(mesh);
          textGeometry = new THREE.TextGeometry('X', gfx.appSettings.font.fontStyle);
          textMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000
          });
          mesh = new THREE.Mesh(textGeometry, textMaterial);
          textGeometry.translate(gfx.appSettings.axesHelper.axisLength, 0, 0);
          scene.add(mesh);
          textGeometry = new THREE.TextGeometry('Z', gfx.appSettings.font.fontStyle);
          textMaterial = new THREE.MeshBasicMaterial({
            color: 0x0000ff
          });
          mesh = new THREE.Mesh(textGeometry, textMaterial);
          textGeometry.translate(0, 0, gfx.appSettings.axesHelper.axisLength);
          scene.add(mesh);
        }
      },
      setCameraLocation: function setCameraLocation(camera, pt) {
        camera.position.x = pt.x;
        camera.position.y = pt.y;
        camera.position.z = pt.z;
      },
      resizeRendererOnWindowResize: function resizeRendererOnWindowResize(renderer, camera) {
        window.addEventListener('resize', utils.debounce(function () {
          if (renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          }
        }, 250));
      },
      resetScene: function resetScene(scope, scene) {
        scope.settings.stepCount = 0;

        for (var i = scene.children.length - 1; i >= 0; i--) {
          var obj = scene.children[i];
          scene.remove(obj);
        }

        gfx.addFloor(scene);
        scope.addTetrahedron();
        gfx.setUpLights(scene);
        gfx.setCameraLocation(camera, self.settings.defaultCameraLocation);
      },
      enableControls: function enableControls(controls, renderer, camera) {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled

        controls.dampingFactor = 0.05;
        controls.zoomSpeed = 2;
        controls.enablePan = !utils.mobile();
        controls.minDistance = 10;
        controls.maxDistance = 800;
        controls.maxPolarAngle = Math.PI / 2;
        return controls;
      },
      enableStats: function enableStats(stats) {
        document.body.appendChild(stats.dom);
      },
      setUpLights: function setUpLights(scene) {
        var self = this;
        var lights = [];
        var color = 0xFFFFFF;
        var intensity = 1;
        var light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
        lights.push(light);
        var light2 = new THREE.DirectionalLight(color, intensity);
        light2.position.set(0, 2, -8);
        scene.add(light2);
        lights.push(light2);

        if (gfx.appSettings.activateLightHelpers) {
          gfx.activateLightHelpers(lights);
        }
      },
      movePoint: function movePoint(pt, vec) {
        return new THREE.Vector3(pt.x + vec.x, pt.y + vec.y, pt.z + vec.z);
      },
      createTriangle: function createTriangle(pt1, pt2, pt3) {
        // return geometry
        var triangleGeometry = new THREE.Geometry();
        triangleGeometry.vertices.push(new THREE.Vector3(pt1.x, pt1.y, pt1.z));
        triangleGeometry.vertices.push(new THREE.Vector3(pt2.x, pt2.y, pt2.z));
        triangleGeometry.vertices.push(new THREE.Vector3(pt3.x, pt3.y, pt3.z));
        triangleGeometry.faces.push(new THREE.Face3(0, 1, 2));
        triangleGeometry.computeFaceNormals();
        return triangleGeometry;
      },
      getCentroid3D: function getCentroid3D(geometry) {
        // Calculating centroid of a tetrahedron: https://www.youtube.com/watch?v=Infxzuqd_F4
        var result = new THREE.Vector3();
        var x = 0,
            y = 0,
            z = 0;

        for (var i = 0; i < geometry.vertices.length; i++) {
          x += geometry.vertices[i].x;
          y += geometry.vertices[i].y;
          z += geometry.vertices[i].z;
        }

        result.x = x / 4;
        result.y = y / 4;
        result.z = z / 4;
        return result;
      },
      getCentroid2D: function getCentroid2D(geometry, scene) {
        // Calculating centroid of a tetrahedron: https://www.youtube.com/watch?v=Infxzuqd_F4
        var result = new THREE.Vector3();
        var x = 0,
            y = 0,
            z = 0;

        for (var i = 0; i < geometry.vertices.length; i++) {
          x += geometry.vertices[i].x;
          y += geometry.vertices[i].y;
          z += geometry.vertices[i].z;
        }

        result.x = x / 3;
        result.y = y / 3;
        result.z = z / 3;
        return result;
      },
      getAngleBetweenVectors: function getAngleBetweenVectors(vector1, vector2) {
        var dot = vector1.dot(vector2);
        var length1 = vector1.length();
        var length2 = vector2.length();
        var angle = Math.acos(dot / (length1 * length2));
        return angle;
      },
      calculateAngle: function calculateAngle(endpoint1, endpoint2, vertex) {
        var vector1 = new THREE.Vector3(endpoint1.x - vertex.x, endpoint1.y - vertex.y, endpoint1.z - vertex.z);
        var vector2 = new THREE.Vector3(endpoint2.x - vertex.x, endpoint2.y - vertex.y, endpoint2.z - vertex.z);
        var angle = vector1.angleTo(vector2);
        return angle;
      }
    };
  }();

  module.exports = window.gfx;
})();

},{}],5:[function(require,module,exports){
"use strict";

var Scene = require('./components/scene.js');

var UI = require('./components/ui.js');

var Utilities = require('./utils.js');

var Beats = require('./beats.js');

var Graphics = require('./graphics.js');

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    Scene().init();
    UI().init();
  });
})();

},{"./beats.js":1,"./components/scene.js":2,"./components/ui.js":3,"./graphics.js":4,"./utils.js":6}],6:[function(require,module,exports){
"use strict";

(function () {
  var appSettings;

  window.utils = function () {
    return {
      appSettings: {
        breakpoints: {
          mobileMax: 767,
          tabletMin: 768,
          tabletMax: 991,
          desktopMin: 992,
          desktopLargeMin: 1200
        }
      },
      mobile: function mobile() {
        return window.innerWidth < this.appSettings.breakpoints.tabletMin;
      },
      tablet: function tablet() {
        return window.innerWidth > this.appSettings.breakpoints.mobileMax && window.innerWidth < this.appSettings.breakpoints.desktopMin;
      },
      desktop: function desktop() {
        return window.innerWidth > this.appSettings.breakpoints.desktopMin;
      },
      getBreakpoint: function getBreakpoint() {
        if (window.innerWidth < this.appSettings.breakpoints.tabletMin) return 'mobile';else if (window.innerWidth < this.appSettings.breakpoints.desktopMin) return 'tablet';else return 'desktop';
      },
      debounce: function debounce(func, wait, immediate) {
        var timeout;
        return function () {
          var context = this,
              args = arguments;

          var later = function later() {
            timeout = null;
            if (!immediate) func.apply(context, args);
          };

          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
        };
      },

      /* Purpose: Detect if any of the element is currently within the viewport */
      anyOnScreen: function anyOnScreen(element) {
        var win = $(window);
        var viewport = {
          top: win.scrollTop(),
          left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
        var bounds = element.offset();
        bounds.right = bounds.left + element.outerWidth();
        bounds.bottom = bounds.top + element.outerHeight();
        return !(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom);
      },

      /* Purpose: Detect if an element is vertically on screen; if the top and bottom of the element are both within the viewport. */
      allOnScreen: function allOnScreen(element) {
        var win = $(window);
        var viewport = {
          top: win.scrollTop(),
          left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();
        var bounds = element.offset();
        bounds.right = bounds.left + element.outerWidth();
        bounds.bottom = bounds.top + element.outerHeight();
        return !(viewport.bottom < bounds.top && viewport.top > bounds.bottom);
      },
      secondsToMilliseconds: function secondsToMilliseconds(seconds) {
        return seconds * 1000;
      },

      /*
      * Purpose: This method allows you to temporarily disable an an element's transition so you can modify its proprties without having it animate those changing properties.
      * Params:
      * 	-element: The element you would like to modify.
      * 	-cssTransformation: The css transformation you would like to make, i.e. {'width': 0, 'height': 0} or 'border', '1px solid black'
      */
      getTransitionDuration: function getTransitionDuration(element) {
        var $element = $(element);
        return utils.secondsToMilliseconds(parseFloat(getComputedStyle($element[0]).transitionDuration));
      },
      isInteger: function isInteger(number) {
        return number % 1 === 0;
      },
      rotate: function rotate(array) {
        array.push(array.shift());
        return array;
      }
    };
  }();

  module.exports = window.utils;
})();

},{}]},{},[5]);
