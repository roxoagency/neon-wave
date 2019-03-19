export class HeroBlock {
  constructor(id, type, $container) {
    this.$container = $container;
    this.type = type;
    this.id = id;
    this.selectors = {
    };
    this.slickConfig = {
      arrows: true,
      prevArrow: theme.strings.slickArrowLeft,
      nextArrow: theme.strings.slickArrowRight,
    };

    this.init();
  }

  init() {
    this.$container.slick(this.slickConfig);
  }
}
