export class MenuSliderBlock {
  constructor(id, type, $container) {
    this.$container = $container;
    this.type = type;
    this.id = id;
    this.selectors = {
        slide: '.js--menu-slide',
        navigation: '#AccessibleNav',
        dropdown: '.site-nav__dropdown',
        childlist: '.site-nav__childlist',
    };
    this.sliders = {};
    this.slickConfig = {
      arrows: true,
      prevArrow: theme.strings.slickArrowLeft,
      nextArrow: theme.strings.slickArrowRight,
    };
    this.init();
  }

  init() {
    const nav = $(this.selectors.navigation);

    $(this.selectors.slide, this.$container).each((index, slide) => {
      const target = $(slide).data('target');

      if (typeof this.sliders[target] === 'undefined') {
        this.sliders[target] = '';
      }

      this.sliders[target] = `${this.sliders[target]}${$(slide).html().trim()}`;
    });

    $.each(this.sliders, (index, slider) => {
        const menu_slider = $(`
          <div class="site-nav__slider">
          ${slider}
          </div>
        `);

        const target = $(`${this.selectors.dropdown}[data-slug="${index}"]`, nav);
        target.find(this.selectors.childlist).addClass('site-nav__childlist--with-slider');
        target.append(menu_slider);

        target.on('dropdown.show', () => {
          if (!menu_slider.hasClass('slick-initialized')) {
            menu_slider.slick(this.slickConfig);
          }
        });

        target.on('dropdown.hide', () => {
          if (menu_slider.hasClass('slick-initialized')) {
            menu_slider.slick('unslick');
          }
        });
    });
  }
}
