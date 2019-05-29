//
/**
 * Sustainability section fifth Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the  About Location section.
 *
 * @namespace sustainability-section--fifth
 */

import {register} from '@shopify/theme-sections';


const selectors = {
	sliderSelector: '.js-block-slider',
	sliderItem: '.js-block-slider__item',
	// map: '.js-about-section-map',
	// mapToggle: '.js-about-section-map-toggle',

};

let dataText = "";

// type one text in the typwriter
// keeps calling itself until the text is finished
function typeWriter(text, i, fnCallback) {
	// chekc if text isn't finished yet
	if (i < (text.length)) {
		if (document.querySelector(".block-slider__item--active .block-slider__item-title") != null) {
			document.querySelector(".block-slider__item--active .block-slider__item-title").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

			// wait for a while and call this function again for next character
			setTimeout(function () {
				typeWriter(text, i + 1, fnCallback)
			}, 50);
		}
	}
	// text finished, call callback if there is a callback function
	else if (typeof fnCallback == 'function') {

	}
}

register('sustainability-section--fifth', {
	onLoad() {
		var self = this;
		this.$container = $(this.container);
		var sectionId = this.$container.attr('data-section-id');
		this.namespace = `.${this.id}`;


		this.initSlider();
		// this.initMap();
	},
	initSlider() {

		$(selectors.sliderItem, this.$container).click(function (e) {
			e.preventDefault();
			if (!$(this).hasClass('block-slider__item--active')) {
				$('.block-slider__item--active').removeClass('block-slider__item--active');
				$(this).addClass('block-slider__item--active');
				$(selectors.sliderSelector, this.$container).addClass('block-slider--is-active');
				dataText = $(this).attr('data-text');
				// start the text animation
				if (0 < dataText.length) {
					// text exists! start typewriter animation
					typeWriter(dataText, 0, function () {
					});
				}
			}
			else {
				$(selectors.sliderSelector, this.$container).removeClass('block-slider--is-active');
				$(this).removeClass('block-slider__item--active');
			}
		});
	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	},
});
