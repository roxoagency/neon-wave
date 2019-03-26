/**
 * Single post Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Single post section.
 *
 * @namespace single-post
 */

import {register} from '@shopify/theme-sections';


const selectors = {
	navToogle: '.js-single-post-nav-toogle',

	navOverlay: '.single-post__nav-overlay',
	sliderSelector:'.shg-category-grid .shg-category-row'

};

const slickConfig = {
	arrows: true,
	prevArrow: theme.strings.slickArrowLeftLong,
	nextArrow: theme.strings.slickArrowRightLong,
	slidesToShow: 3,
	variableWidth:true,
	slidesToScroll: 3,
	centerMode: false,
	infinite: false,
};
register('single-post', {
	onLoad() {
		var self = this;
		this.$container = $(this.container);
		var sectionId = this.$container.attr('data-section-id');
		this.namespace = `.${this.id}`;

		this.initNav();this.initSlider();
	},
	initSlider(){
// setTimeout(function () {
// 	$(selectors.sliderSelector, this.$container).slick(slickConfig);
// },2000);
	},
	initNav() {

		$(selectors.navToogle, this.$container).on('click', function (e) {
			e.preventDefault();
			$('body').toggleClass('post-nav-show-' + $(this).attr('data-action'));
		});
		$(selectors.navOverlay, this.$container).on('click', function (e) {
			e.preventDefault();
			$('body').removeClass('post-nav-show-next').removeClass('post-nav-show-prev');
		});
	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	},
});
