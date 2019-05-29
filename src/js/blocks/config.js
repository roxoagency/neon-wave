var config = function () {

	var object = {

		// fontsProjectId: '2b815ee2-c23b-48e1-bf22-2eb264255579',
		//
		// $html: (0, _domSelect2.default)('html'),
		// $body: (0, _domSelect2.default)('body'),
		// $view: (0, _domSelect2.default)('#js-page-view'),
		// $header: (0, _domSelect2.default)('header'),
		// $logo: (0, _domSelect2.default)('header .logo'),
		//
		width: document.body.clientWidth || document.documentElement.offsetWidth || window.innerWidth,
		height: document.body.clientHeight || document.documentElement.offsetHeight || window.innerHeight,
		scrollHeight: document.body.scrollHeight,
		//
		// cartNeedsRefresh: false,
		//
		// isRetina: false,
		//
		// scrollRestore: [],
		// scrollRestoreFragment: [],
		//
		// prefix: {
		// 	transform: {
		// 		all: (0, _prefix2.default)('transform'),
		// 		origin: (0, _prefix2.default)('transform-origin')
		// 	},
		// 	transition: {
		// 		all: (0, _prefix2.default)('transition'),
		// 		duration: (0, _prefix2.default)('transition-duration'),
		// 		delay: (0, _prefix2.default)('transition-delay')
		// 	}
		// },
		//
		breakpoints: {
			small: 768,
			medium: 1024,
			large: 1200,
			xlarge: 1400,
			xxlarge: 1600
		},

		is: {
			mobile: function mobile() {
				return $('html').hasClass('is-phone');
			},
			tablet: function tablet() {
				return $('html').hasClass('is-tablet');
			},
			// ios: function ios() {
			// 	return $('html').hasClass( 'is-iOS');
			// },
			// safari: function safari() {
			// 	return $('html').hasClass('is-safari');
			// },
			// android: function android() {
			// 	return $('html').hasClass( 'is-android');
			// },
			// touch: function touch() {
			// 	return $('html').hasClass( 'touchevents');
			// },
			// ie: function ie() {
			// 	return _utils2.default.hardware.detectIE();
			// },
			// retina: function retina() {
			// 	return _utils2.default.hardware.hasRetina();
			// }
		},

		// has: {
		// 	transform3d: function transform3d() {
		// 		return _domClasses2.default.has(object.$html, 'csstransforms3d');
		// 	},
		// 	blendModes: function blendModes() {
		// 		return 'backgroundBlendMode' in document.body.style;
		// 	},
		// 	fx: function fx() {
		// 		return !object.is.ie() && !object.is.mobile() && object.has.transform3d();
		// 	}
		// },
		//
		// device: function device() {
		//
		// 	return this.width < 1000 ? this.width * .9 : this.width < 1324 ? 960 : this.width > 1500 ? 1350 : 1200;
		// },
		//
		// getStyle: function getStyle(el, styleProp) {
		//
		// 	if (document.defaultView.getComputedStyle) {
		// 		var y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
		// 	} else if (x.currentStyle) {
		// 		var y = el.currentStyle[styleProp];
		// 	}
		//
		// 	return y;
		// }
	};

	return object;
}();

exports.default = config;