/**
 * About Location Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the  About Location section.
 *
 * @namespace about-location
 */

import {register} from '@shopify/theme-sections';


const selectors = {
	sliderSelector: '.js-about-location-slider',
	map: '.js-about-section-map',
	mapToggle: '.js-about-section-map-toggle',

};

const slickConfig = {
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: true,
	responsive: [
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				dots: false,
				autoplay:true,
			}
		}
	]
};


register('about-location', {
	onLoad() {
		var self = this;
		this.$container = $(this.container);
		var sectionId = this.$container.attr('data-section-id');
		this.namespace = `.${this.id}`;


		this.initSlider();
		this.initMap();
	},
	initSlider() {
		$(selectors.sliderSelector, this.$container).slick(slickConfig);
	},
	initMap() {

		$(selectors.mapToggle, this.$container).on('click', (e) => {
			e.preventDefault();
			$(this.$container).toggleClass('is-map-show');
		});
	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	},
});
