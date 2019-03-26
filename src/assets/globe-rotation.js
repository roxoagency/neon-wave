(function (cjs, an) {

	var p; // shortcut to reference prototypes
	var lib={};var ss={};var img={};
	lib.ssMetadata = [
		{name:"globe_rotation_atlas_", frames: [[0,0,936,937],[0,939,936,937],[938,0,936,937],[938,939,936,937]]},
		{name:"globe_rotation_atlas_2", frames: [[0,0,936,937],[0,939,936,937],[938,0,936,937]]}
	];


// symbols:



	(lib.globeanimationLayer1 = function() {
		this.initialize(ss["globe_rotation_atlas_"]);
		this.gotoAndStop(0);
	}).prototype = p = new cjs.Sprite();



	(lib.globeanimationLayer2 = function() {
		this.initialize(ss["globe_rotation_atlas_"]);
		this.gotoAndStop(1);
	}).prototype = p = new cjs.Sprite();



	(lib.globeanimationLayer3 = function() {
		this.initialize(ss["globe_rotation_atlas_"]);
		this.gotoAndStop(2);
	}).prototype = p = new cjs.Sprite();



	(lib.globeanimationLayer4 = function() {
		this.initialize(ss["globe_rotation_atlas_"]);
		this.gotoAndStop(3);
	}).prototype = p = new cjs.Sprite();



	(lib.globeanimationLayer5 = function() {
		this.initialize(ss["globe_rotation_atlas_2"]);
		this.gotoAndStop(0);
	}).prototype = p = new cjs.Sprite();



	(lib.globeanimationLayer6 = function() {
		this.initialize(ss["globe_rotation_atlas_2"]);
		this.gotoAndStop(1);
	}).prototype = p = new cjs.Sprite();



	(lib.globeanimationLayer7 = function() {
		this.initialize(ss["globe_rotation_atlas_2"]);
		this.gotoAndStop(2);
	}).prototype = p = new cjs.Sprite();



	(lib.Scene_1_Layer_7 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer_7
		this.instance = new lib.globeanimationLayer7();
		this.instance.parent = this;
		this.instance._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).wait(4));

	}).prototype = p = new cjs.MovieClip();


	(lib.Scene_1_Layer_6 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer_6
		this.instance = new lib.globeanimationLayer6();
		this.instance.parent = this;
		this.instance._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({_off:false},0).wait(4));

	}).prototype = p = new cjs.MovieClip();


	(lib.Scene_1_Layer_5 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer_5
		this.instance = new lib.globeanimationLayer5();
		this.instance.parent = this;
		this.instance._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(16).to({_off:false},0).wait(4));

	}).prototype = p = new cjs.MovieClip();


	(lib.Scene_1_Layer_4 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer_4
		this.instance = new lib.globeanimationLayer4();
		this.instance.parent = this;
		this.instance._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).wait(4));

	}).prototype = p = new cjs.MovieClip();


	(lib.Scene_1_Layer_3 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer_3
		this.instance = new lib.globeanimationLayer3();
		this.instance.parent = this;
		this.instance._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(8).to({_off:false},0).wait(4));

	}).prototype = p = new cjs.MovieClip();


	(lib.Scene_1_Layer_2 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer_2
		this.instance = new lib.globeanimationLayer2();
		this.instance.parent = this;
		this.instance._off = true;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({_off:false},0).wait(4));

	}).prototype = p = new cjs.MovieClip();


	(lib.Scene_1_Layer_1 = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{});

		// Layer_1
		this.instance = new lib.globeanimationLayer1();
		this.instance.parent = this;

		this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	}).prototype = p = new cjs.MovieClip();


// stage content:
	(lib.globerotation = function(mode,startPosition,loop) {
		this.initialize(mode,startPosition,loop,{"globe-1":0,"globe-1":4,"globe-3":8,"globe-4":12,"globe-5":16,"globe-6":20,"globe-7":24});

		this.___GetDepth___ = function(obj) {
			var depth = obj.depth;
			var cameraObj = this.___camera___instance;
			if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
			{
				depth += depth + cameraObj.depth;
			}
			return depth;
		}
		this.___needSorting___ = function() {
			for (var i = 0; i < this.getNumChildren() - 1; i++)
			{
				var prevDepth = this.___GetDepth___(this.getChildAt(i));
				var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
				if (prevDepth < nextDepth)
					return true;
			}
			return false;
		}
		this.___sortFunction___ = function(obj1, obj2) {
			return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
		}
		this.on('tick', function (event){
			var curTimeline = event.currentTarget;
			if (curTimeline.___needSorting___()){
				this.sortChildren(curTimeline.___sortFunction___);
			}
		});

		// timeline functions:
		this.frame_27 = function() {
			this.___loopingOver___ = true;
		}

		// actions tween:
		this.timeline.addTween(cjs.Tween.get(this).wait(27).call(this.frame_27).wait(1));

		// Layer_1_obj_
		this.Layer_1 = new lib.Scene_1_Layer_1();
		this.Layer_1.name = "Layer_1";
		this.Layer_1.parent = this;
		this.Layer_1.setTransform(468,468.5,1,1,0,0,0,468,468.5);
		this.Layer_1.depth = 0;
		this.Layer_1.isAttachedToCamera = 0
		this.Layer_1.isAttachedToMask = 0
		this.Layer_1.layerDepth = 0
		this.Layer_1.layerIndex = 0
		this.Layer_1.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.Layer_1).to({_off:true},4).wait(24));

		// Layer_2_obj_
		this.Layer_2 = new lib.Scene_1_Layer_2();
		this.Layer_2.name = "Layer_2";
		this.Layer_2.parent = this;
		this.Layer_2.depth = 0;
		this.Layer_2.isAttachedToCamera = 0
		this.Layer_2.isAttachedToMask = 0
		this.Layer_2.layerDepth = 0
		this.Layer_2.layerIndex = 1
		this.Layer_2.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.Layer_2).wait(4).to({_off:true},4).wait(20));

		// Layer_3_obj_
		this.Layer_3 = new lib.Scene_1_Layer_3();
		this.Layer_3.name = "Layer_3";
		this.Layer_3.parent = this;
		this.Layer_3.depth = 0;
		this.Layer_3.isAttachedToCamera = 0
		this.Layer_3.isAttachedToMask = 0
		this.Layer_3.layerDepth = 0
		this.Layer_3.layerIndex = 2
		this.Layer_3.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.Layer_3).wait(8).to({_off:true},4).wait(16));

		// Layer_4_obj_
		this.Layer_4 = new lib.Scene_1_Layer_4();
		this.Layer_4.name = "Layer_4";
		this.Layer_4.parent = this;
		this.Layer_4.depth = 0;
		this.Layer_4.isAttachedToCamera = 0
		this.Layer_4.isAttachedToMask = 0
		this.Layer_4.layerDepth = 0
		this.Layer_4.layerIndex = 3
		this.Layer_4.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.Layer_4).wait(12).to({_off:true},4).wait(12));

		// Layer_5_obj_
		this.Layer_5 = new lib.Scene_1_Layer_5();
		this.Layer_5.name = "Layer_5";
		this.Layer_5.parent = this;
		this.Layer_5.depth = 0;
		this.Layer_5.isAttachedToCamera = 0
		this.Layer_5.isAttachedToMask = 0
		this.Layer_5.layerDepth = 0
		this.Layer_5.layerIndex = 4
		this.Layer_5.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.Layer_5).wait(16).to({_off:true},4).wait(8));

		// Layer_6_obj_
		this.Layer_6 = new lib.Scene_1_Layer_6();
		this.Layer_6.name = "Layer_6";
		this.Layer_6.parent = this;
		this.Layer_6.depth = 0;
		this.Layer_6.isAttachedToCamera = 0
		this.Layer_6.isAttachedToMask = 0
		this.Layer_6.layerDepth = 0
		this.Layer_6.layerIndex = 5
		this.Layer_6.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.Layer_6).wait(20).to({_off:true},4).wait(4));

		// Layer_7_obj_
		this.Layer_7 = new lib.Scene_1_Layer_7();
		this.Layer_7.name = "Layer_7";
		this.Layer_7.parent = this;
		this.Layer_7.depth = 0;
		this.Layer_7.isAttachedToCamera = 0
		this.Layer_7.isAttachedToMask = 0
		this.Layer_7.layerDepth = 0
		this.Layer_7.layerIndex = 6
		this.Layer_7.maskLayerName = 0

		this.timeline.addTween(cjs.Tween.get(this.Layer_7).wait(28));

	}).prototype = p = new cjs.MovieClip();
	p.nominalBounds = new cjs.Rectangle(468,468,468,469);
// library properties:
	lib.properties = {
		id: '8B02CA0FAF66466495E4E841DA4ADBC3',
		width: 936,
		height: 936,
		fps: 24,
		color: "#FFFFFF",
		opacity: 0.00,
		manifest: window.theme.manifest,
		preloads: []
	};


// bootstrap callback support:

	(lib.Stage = function(canvas) {
		createjs.Stage.call(this, canvas);
	}).prototype = p = new createjs.Stage();

	p.setAutoPlay = function(autoPlay) {
		this.tickEnabled = autoPlay;
	}
	p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
	p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
	p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
	p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

	p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

	an.bootcompsLoaded = an.bootcompsLoaded || [];
	if(!an.bootstrapListeners) {
		an.bootstrapListeners=[];
	}

	an.bootstrapCallback=function(fnCallback) {
		an.bootstrapListeners.push(fnCallback);
		if(an.bootcompsLoaded.length > 0) {
			for(var i=0; i<an.bootcompsLoaded.length; ++i) {
				fnCallback(an.bootcompsLoaded[i]);
			}
		}
	};

	an.compositions = an.compositions || {};
	an.compositions['8B02CA0FAF66466495E4E841DA4ADBC3'] = {
		getStage: function() { return exportRoot.getStage(); },
		getLibrary: function() { return lib; },
		getSpriteSheet: function() { return ss; },
		getImages: function() { return img; }
	};

	an.compositionLoaded = function(id) {
		an.bootcompsLoaded.push(id);
		for(var j=0; j<an.bootstrapListeners.length; j++) {
			an.bootstrapListeners[j](id);
		}
	}

	an.getComposition = function(id) {
		return an.compositions[id];
	}


// Layer depth API :

	AdobeAn.Layer = new function() {
		this.getLayerZDepth = function(timeline, layerName)
		{
			if(layerName === "Camera")
				layerName = "___camera___instance";
			var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
			return eval(script);
		}
		this.setLayerZDepth = function(timeline, layerName, zDepth)
		{
			const MAX_zDepth = 10000;
			const MIN_zDepth = -5000;
			if(zDepth > MAX_zDepth)
				zDepth = MAX_zDepth;
			else if(zDepth < MIN_zDepth)
				zDepth = MIN_zDepth;
			if(layerName === "Camera")
				layerName = "___camera___instance";
			var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
			eval(script);
		}
		this.removeLayer = function(timeline, layerName)
		{
			if(layerName === "Camera")
				layerName = "___camera___instance";
			var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
			eval(script);
		}
		this.addNewLayer = function(timeline, layerName, zDepth)
		{
			if(layerName === "Camera")
				layerName = "___camera___instance";
			zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
			var layer = new createjs.MovieClip();
			layer.name = layerName;
			layer.depth = zDepth;
			layer.layerIndex = 0;
			timeline.addChild(layer);
		}
	}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;