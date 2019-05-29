export class RelatedProductsBlock {
	constructor(id, type, $container) {
		this.$container = $container;
		this.type = type;
		this.id = id;
		this.selectors = {
			sliderSelector: '.related-products__slider',
		};
		this.slickConfig = {
			arrows: true,
			prevArrow: theme.strings.slickArrowLeftLong,
			nextArrow: theme.strings.slickArrowRightLong,
			slidesToShow: 3, variableWidth: true,
			slidesToScroll: 3,
			centerMode: true,

		};

		this.init();
	}

	toggleSlider() {
		if ($(window).width() > 767) {
			if (!$(this.selectors.sliderSelector).hasClass('slick-initialized')) {
				$(this.selectors.sliderSelector, this.$container).slick(this.slickConfig);
			}
		} else {
			if ($(this.selectors.sliderSelector).hasClass('slick-initialized')) {
				$(this.selectors.sliderSelector, this.$container).slick('unslick');
			}
		}
	}

	init() {
		this.toggleSlider();
		$(window).resize(() => {
			this.toggleSlider();
		});
	}
}
