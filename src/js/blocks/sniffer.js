
export class Sniffer {
	constructor() {

		const ua = navigator.userAgent.toLowerCase();
		const av = navigator.appVersion.toLowerCase();

		const isWindowsPhone = /windows phone|iemobile|wpdesktop/.test(ua);

		const isDroidPhone = !isWindowsPhone && /android.*mobile/.test(ua);
		const isDroidTablet = !isWindowsPhone && !isDroidPhone && (/android/i).test(ua);
		const isDroid = isDroidPhone || isDroidTablet;

		const isIos = !isWindowsPhone && (/ip(hone|od|ad)/i).test(ua) && !window.MSStream;
		const isIpad = !isWindowsPhone && (/ipad/i).test(ua) && isIos;

		const isTablet = isDroidTablet || isIpad;
		const isPhone = isDroidPhone || (isIos && !isIpad) || isWindowsPhone;
		const isDevice = isPhone || isTablet;

		const isFirefox = ua.indexOf('firefox') > -1;
		const isSafari = !!ua.match(/version\/[\d\.]+.*safari/);
		const isOpera = ua.indexOf('opr') > -1;
		const isIE11 = !(window.ActiveXObject) && "ActiveXObject" in window;
		const isIE = av.indexOf('msie') > -1 || isIE11 || av.indexOf('edge') > -1;
		const isEdge = ua.indexOf('edge') > -1;
		const isChrome = window.chrome !== null && window.chrome !== undefined && navigator.vendor.toLowerCase() == 'google inc.' && !isOpera && !isEdge;
		this.infos = {
			isDroid: isDroid,
			isDroidPhone: isDroidPhone,
			isDroidTablet: isDroidTablet,
			isWindowsPhone: isWindowsPhone,
			isIos: isIos,
			isIpad: isIpad,
			isDevice: isDevice,
			isEdge: isEdge,
			isIE: isIE,
			isIE11: isIE11,
			isPhone: isPhone,
			isTablet: isTablet,
			isFirefox: isFirefox,
			isSafari: isSafari,
			isOpera: isOpera,
			isChrome: isChrome,
			isDesktop: !isPhone && !isTablet
		};
		this.init();
	}
	dashify(str) {
		if (typeof str !== 'string') {
			throw new TypeError('expected a string');
		}
		str = str.replace(/([a-z])([A-Z])/g, '$1-$2');
		str = str.replace(/[ \t\W]/g, '-');
		str = str.replace(/^-+|-+$/g, '');
		return str.toLowerCase();
	};
	init() {
		this.addClasses(document.documentElement);
	}

	addClasses(el) {
		Object.keys(this.infos).forEach((info) => {
			if (this.infos[info]) {
				this.addClassEL(el, this.dashify(info));
			}
		}, this);
	}

	getInfos() {
		return this.cloneEl(this.infos);
	}

	addClassEL(el, className) {
		if (el.addClass) {
			el.addClass(className);
		}
		else {
			if (el.classList) {
				el.classList.add(className);
			}
			else {
				el.className += ' ' + className;
			}
		}
	}

	cloneEl(source) {
		return JSON.parse(JSON.stringify(source));
	}
}
