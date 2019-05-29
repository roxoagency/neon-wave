export class FeaturedCollectionBlock {
	constructor(id, type, $container) {
		this.$container = $container;
		this.type = type;
		this.id = id;
		this.selectors = {
			sliderSelector: '.featured-collection__products',
		};
		this.slickConfig = {
			arrows: true,
			prevArrow: theme.strings.slickArrowLeft,
			nextArrow: theme.strings.slickArrowRight,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1023,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						arrows: false
					}
				}]
		};

		this.init();
	}

	init() {
		var maxHeight = Math.max.apply(null, $('.featured-collection__products .product-card_content').map(function () {
			return $(this).outerHeight();
		}).get());
		$('.featured-collection__products .product-card_content').css('min-height', maxHeight);
		$(this.selectors.sliderSelector, this.$container).slick(this.slickConfig);
		$(window).resize(function () {
			$('.featured-collection__products .product-card_content').css('min-height', 0);
			maxHeight = Math.max.apply(null, $('.featured-collection__products .product-card_content').map(function () {
				return $(this).outerHeight();
			}).get());
			$('.featured-collection__products .product-card_content').css('min-height', maxHeight);
		});

	}
}
