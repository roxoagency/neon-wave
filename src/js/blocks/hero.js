export class HeroBlock {
	constructor(id, type, $container) {
		this.$container = $container;
		this.type = type;
		this.id = id;
		this.selectors = {};
		this.slickConfig = {
			arrows: true,
			prevArrow: theme.strings.slickArrowLeft,
      nextArrow: theme.strings.slickArrowRight,
      autoplay: false,
      pauseOnFocus: false,
      pauseOnHover: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						arrows: false,
						dots: true
					}
				}
			]
		};

		this.init();
	}

	init() {
		this.$container.slick(this.slickConfig);
	}
}
