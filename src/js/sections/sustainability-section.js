//
/**
 * Sustainability section  Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the  Sustainability section.
 *
 * @namespace sustainability-section
 */

import {register} from '@shopify/theme-sections';


const selectors = {
	navItem: '.sustainability-nav__link',
	sectionItem: '.sustainability-section',

};


register('sustainability-section', {
	onLoad() {
		var self = this;
		this.$container = $(this.container);
		var sectionId = this.$container.attr('data-section-id');
		this.namespace = `.${this.id}`;


		this.initNav();
		this.initSections();
	},
	initNav() {
		$(selectors.navItem, this.$container).click(function (e) {
			e.preventDefault();
			var $el = $($(this).attr('href'));
			if ($el.length > 0) {
				var scrollTop = ($el.offset().top - 81);
				// var scrollTop = ($el.offset().top - $('.header__inner').outerHeight() + 1);
				if ($(this).attr('href') == '#sustainability-section--first') {
					scrollTop = 0;
				}

				$("html, body").animate({
					scrollTop: scrollTop
				}, 500);
			}
		});
	},
	isElementInView: function (element, fullyInView) {
		var pageTop = $(window).scrollTop();
		var pageBottom = pageTop + $(window).height()/2;
		var elementTop = $(element).offset().top;
		var elementBottom = elementTop + $(element).height();
// console.log(pageTop,pageBottom,elementTop,elementBottom);
		// if (fullyInView === true) {
		// 	return ((pageTop < elementTop) && (pageBottom > elementBottom));
		// } else {
			return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
		// }
	},
	stateSextions(fullyInView){
		let self = this;
		$(selectors.sectionItem).each(function (e) {
			if (self.isElementInView($(this),fullyInView)) {
				if ($(this).attr('id') == 'sustainability-section--fifth' || $(this).attr('id') == 'sustainability-section--sixth') {
					$('.sustainability-nav__item').addClass('sustainability-nav__item--dark');
				}else{
					$('.sustainability-nav__item').removeClass('sustainability-nav__item--dark');
				}
				$('.sustainability-nav__link').removeClass('sustainability-nav__link--active');
				$('.sustainability-nav__link[href="#' + $(this).attr('id') + '"]').addClass('sustainability-nav__link--active');
			}
		});
	},
	initSections() {
		let self = this;
		self.stateSextions(true);
		$(window).scroll(function () {
			self.stateSextions(false);
		});
	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	},
});
