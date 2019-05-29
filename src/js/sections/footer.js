/**
 * Footer Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the  Footer section.
 *
 * @namespace footer
 */

import {register} from '@shopify/theme-sections';


const selectors = {
	newsletterToogle: '[href="#newsletter"]'

};

register('footer', {
	onLoad() {
		var self = this;
		this.$container = $(this.container);
		var sectionId = this.$container.attr('data-section-id');
		this.namespace = `.${this.id}`;


		this.init();
	},
	init() {
		$(selectors.newsletterToogle, this.$container).on('click', function (e) {
			e.preventDefault();
			$('[data-target="#newsletter"]').trigger('click');
		});
	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	},
});
