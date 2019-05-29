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

	durationValueCache = $(".blog-list__item--0").next().height() - $(".post-card--0 .post-card").outerHeight() - ($(".post-card--0 ").outerHeight() - $(".post-card--0 .post-card").outerHeight());

	offsetValueCache = -81;
	if ($(".post-card--0 ").height() > $(window).height()) {
		offsetValueCache = ($(".post-card--0").height() - $(window).height()) - 81;

	}
	if (durationValueCache < 0) {
		durationValueCache = 1;
	}
	durationValueCache2 = $(".blog-list__item--7").next().height() - $(".post-card--7 .post-card").outerHeight() - ($(".post-card--7 ").outerHeight() - $(".post-card--7 .post-card").outerHeight());
	offsetValueCache2 = -81;
	if ($(".post-card--7 ").height() > $(window).height()) {
		offsetValueCache2 = ($(".post-card--7").height() - $(window).height()) - 81;

	}
	if (durationValueCache2 < 0) {
		durationValueCache2 = 1;
	}

	if ($(window).width() < 768) {
		durationValueCache = 1;
		durationValueCache2 = 1;
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
		// this.initScrollMagic();
		this.initFilter();
	},
	initFilter() {
		$('body').on('click', '.defaut-filter__toggle', function (e) {
			e.preventDefault();
			$('body').toggleClass('is-filter-show');
			if ($('body').hasClass('is-filter-show')) {
				$('body').addClass('is-filter-open')
			}

		});
		$('body').on('click', '.filter__close', function (e) {
			e.preventDefault();
			$('body').toggleClass('is-filter-show');
			setTimeout(function () {
				if (!$('body').hasClass('is-filter-show')) {
					$('body').removeClass('is-filter-open')
				}
			},200);
		});
		$('body').on('click', '.defaut-filter__wrapper', function (e) {
			if ($(e.target).hasClass('defaut-filter__wrapper')) {
				$('body').toggleClass('is-filter-show');
				setTimeout(function () {
					if (!$('body').hasClass('is-filter-show')) {
						$('body').removeClass('is-filter-open')
					}
				},200);

			}
		});
	},
	initScrollMagic() {
		let controller = new ScrollMagic.Controller();
		const nextEl = $(".blog-list__item--0").next();
		const nextEl2 = $(".blog-list__item--7").next();

		if (nextEl.length > 0) {

			let offset = getOffset();
			let height = getDuration();
			let screen = new ScrollMagic.Scene({
				offset: offset,
				triggerHook: 0,
				triggerElement: ".blog-list__item--0",
				duration: height
			})
				.setPin(".post-card--0")
				// .addIndicators({name: "sticky"})
				.addTo(controller);
			screen.duration(getDuration);
			$(window).resize(function () {
				offset = getOffset();
				screen.offset(offset);


			});
		}
		if (nextEl2.length > 0) {
			let height2 = getDuration2();

			let offset2 = getOffset2();
			let screen2 = new ScrollMagic.Scene({
				offset: offset2,
				triggerHook: 0,
				triggerElement: ".blog-list__item--7",
				duration: height2
			})
				.setPin(".post-card--7")
				// .addIndicators({name: "sticky"})
				.addTo(controller);
			screen2.duration(getDuration2);
			$(window).resize(function () {
				offset2 = getOffset2();
				screen2.offset(offset2);
			});
		}


		$(window).triggerHandler("resize"); // set to initial value


	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	}
	,
});
