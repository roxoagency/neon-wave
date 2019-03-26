/**
 * Blog Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the  Blog section.
 *
 * @namespace blog
 */

import {register} from '@shopify/theme-sections';


let durationValueCache, offsetValueCache, durationValueCache2, offsetValueCache2;

function getDuration() {
	return durationValueCache;
}

function getOffset() {
	return offsetValueCache;
}

function getDuration2() {
	return durationValueCache2;
}

function getOffset2() {
	return offsetValueCache2;
}

function updateScreen(e) {
	durationValueCache = $(".blog-list__item--0").next().height() - $(".post-card--0").height() - 60;
	offsetValueCache = $(".post-card--0 .post-card").height();
	if(durationValueCache<0){
		durationValueCache=1;
	}
	durationValueCache2 = $(".blog-list__item--7").next().height() - $(".post-card--7").height() - 60;
	offsetValueCache2 = $(".post-card--7 .post-card").height();
	if(durationValueCache2<0){
		durationValueCache2=1;
	}


}

register('blog', {
	onLoad() {
		let self = this;
		this.$container = $(this.container);
		let sectionId = this.$container.attr('data-section-id');
		this.namespace = `.${this.id}`;

		updateScreen('');

		$(window).on("resize", updateScreen); // update the duration when the window size changes
		this.initScrollMagic();
		// this.initMap();
	},

	initScrollMagic() {
		$(window).load(function () {
			let controller = new ScrollMagic.Controller();
			const nextEl=$(".blog-list__item--0").next();
			const nextEl2=$(".blog-list__item--7").next();

			if(nextEl.length>0) {
				let height = getDuration();
				let offset = getOffset();
				let screen = new ScrollMagic.Scene({
					offset: offset,
					triggerHook: 1,
					triggerElement: ".blog-list__item--0",
					duration: height
				})
					.setPin(".post-card--0")
					// .addIndicators({name: "sticky"})
					.addTo(controller);
				screen.duration(getDuration);
			}
			if(nextEl2.length>0) {
				let height2 = getDuration2();
				let offset2 = getOffset2();
				let screen2 = new ScrollMagic.Scene({
					offset: offset2,
					triggerHook: 1,
					triggerElement: ".blog-list__item--7",
					duration: height2
				})
					.setPin(".post-card--7")
					// .addIndicators({name: "sticky"})
					.addTo(controller);
				screen2.duration(getDuration2);
			}
		});


		$(window).triggerHandler("resize"); // set to initial value
		$(window).resize(function () {
			if(nextEl.length>0) {
			offset = getOffset();
			screen.offset(offset);}

			if(nextEl2.length>0) {
			offset2 = getOffset2();
			screen2.offset(offset);}
		});

	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	}
	,
});
