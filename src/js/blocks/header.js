export class HeaderBlock {
	constructor(id, type, $container) {
		this.$container = $container;
		this.type = type;
		this.id = id;
		this.selectors = {
			rootItems: '.js--has-dropdown',
			dropdowns: '.js--dropdown',
			activeRootClass: 'site-nav__item--dropdown-active',
			activeSubmenuClass: 'site-nav__dropdown--active',
			visibleSubmenuClass: 'site-nav__dropdown--visible',
			toggleSearchFormSelector: '.js--toggle-search-form',
			headerSearchForm: '.header__search-form--desktop',
			headerSearchFormActiveClass: 'header__search-form--active',
			miniCartToggle: '.js--min-cart-toggle.cart-nav__link',
			miniCartLink: '.cart-nav__link',
			miniCart: '.js--min-cart',
			header: '.header',
			nav: '.site-nav__item',
			customNav: '.customer-nav__link:not(.cart-nav__link)',
			miniCartToggleHide: '.js-mini-cart-hide',
			miniCartOverlay: '.cart__overlay',


		};
		this.cache = {
			dropdowns: {},
		};
		this.slickConfig = {
			arrows: true,
			prevArrow: theme.strings.slickArrowLeft,
			nextArrow: theme.strings.slickArrowRight,
		};
		this.init();
	}

	init() {
		this._cacheSelectors();
		this._initStickyHeader();
		this._initDropdownMenu();
		this._initHeaderSearch();
		this._initMiniCart();
		this._initMobileNave();
		this._initLogo();

	}

	_initLogo() {
		$('body').on('click', '.header--sticky .logo__image', (e) => {
			e.preventDefault();
			setTimeout(() => {
				if (!$('body').hasClass('is-dblclick')) {
          if ($('body').hasClass('page-sustainability-tpl')) {
            $('body').trigger('scrollToTop');
          } else {
            $("html, body").animate({
              scrollTop: 0
            }, 500);
          }
				}
			}, 200);

		}).on('dblclick', '.header--sticky .logo__image', function (e) {
			$('body').addClass('is-dblclick');
			window.location.replace($(this).attr("href"));
		});
	}

	_initMiniCartOpen() {
		if (!$('body').hasClass('is-open-mini-cart')) {
			$('body').addClass('is-open-mini-cart');
			const el = $(this.selectors.miniCart);
			el.addClass('cart--visible');
			el.addClass('cart--open');
		}
	}

	_initMiniCartClose() {
		$('body').removeClass('is-open-mini-cart');
		$('body').removeClass('is-toggle-mini-cart');
		const el = $(this.selectors.miniCart);
		if (el.hasClass('cart--open')) {
			setTimeout(function () {
				if (!el.hasClass('cart--open')) {
					el.removeClass('cart--visible');
				}
			}, 200);
		}
		el.removeClass('cart--open');
	}

	_initMiniCart() {
		$(this.selectors.miniCartToggle).on('click', (e) => {
			const el = $(this.selectors.miniCart);
			if (el.hasClass('cart--open')) {
				if ($(window).width() < 1024) {
					e.preventDefault();
					this._initMiniCartClose();
				}
			} else {
				e.preventDefault();
				this._initMiniCartOpen();
			}
		});
		$(this.selectors.miniCartOverlay).on('click', (e) => {
			e.preventDefault();
			this._initMiniCartClose();
		});

		$(this.selectors.miniCartToggleHide).on('click', (e) => {
      e.preventDefault();
			$('body').addClass('is-toggle-mini-cart');
			this._initMiniCartClose();
		});
		$(this.selectors.miniCartLink).on('mouseenter', (e) => {
			if (!$('body').hasClass('is-toggle-mini-cart')) {
				if ($(window).width() > 1023) {
					this._initMiniCartOpen();
				}
			}
		});
		$(this.selectors.nav).on('mouseleave', (e) => {
			if (!$('body').hasClass('is-toggle-mini-cart')) {
				if ($(window).width() > 1023) {
					this._initMiniCartClose();
				}
			}
		});
		$(this.selectors.header).on('mouseleave', (e) => {
			if (!$('body').hasClass('is-toggle-mini-cart')) {
				if ($(window).width() > 1023) {
					this._initMiniCartClose();
				}
			}
		});
		$(this.selectors.customNav).on('mouseleave', (e) => {
			if (!$('body').hasClass('is-toggle-mini-cart')) {
				if ($(window).width() > 1023) {
					this._initMiniCartClose();
				}
			}
		});
	}

	_cacheSelectors() {
		this.cache.rootItems = $(this.selectors.rootItems, this.$container);
		this.cache.rootItems.each((index, el) => {
			this.cache.dropdowns[el.dataset.hasDropdown] = $(`[data-root-item="${el.dataset.hasDropdown}"]`, this.$container)[0];
		});
	}

	_initStickyHeader() {
		// this.headerHeight = this.$container.outerHeight();
		// this.$container.css({
		// 	paddingBottom: this.headerHeight,
		// });
		// $(window).one('load', () => {
		// 	this.headerHeight = this.$container.outerHeight();
		// 	this.$container.css({
		// 		paddingBottom: this.headerHeight,
		// 	});
		// });
		// $(window).on('resize', () => {
		// 	this.headerHeight = this.$container.outerHeight();
		// 	this.$container.css({
		// 		paddingBottom: this.headerHeight,
		// 	});
		// });
		let oldPosition=$(window).scrollTop();
		$(window).on('scroll', () => {
			var scrollTop = $(window).scrollTop();
			this.headerHeight = this.$container.outerHeight();
			if (scrollTop > 1) {
				this.$container.addClass('header--sticky-totop');
			} else {
				this.$container.removeClass('header--sticky-totop');
			}

			if (scrollTop > 10) {
				this.$container.addClass('header--sticky');
			} else {
				this.$container.removeClass('header--sticky');
			}
			if(oldPosition>scrollTop){
				this.$container.addClass('header--sticky-go-top');
			}else{
				this.$container.removeClass('header--sticky-go-top');
			}
			oldPosition=scrollTop;
		});
	}

	_initHeaderSearch() {
		$(this.selectors.toggleSearchFormSelector, this.$container).on('click', () => {
			const form = $(this.selectors.headerSearchForm, this.$container).toggleClass(this.selectors.headerSearchFormActiveClass);
			const input = form.find('.search__input');

			if (input.length && form.hasClass(this.selectors.headerSearchFormActiveClass)) {
				input[0].focus();
			}
		});
	}

	_initDropdownMenu() {
		const self = this;
		this.cache.rootItems.on('mouseover', function () {
			$(Object.values(self.cache.dropdowns)).removeClass(self.selectors.activeSubmenuClass);
			const dropdown = self.cache.dropdowns[this.dataset.hasDropdown];

			self.showSubmenu(dropdown);
		});

		this.cache.rootItems.on('mouseout', function (e) {
			const dropdown = self.cache.dropdowns[this.dataset.hasDropdown];
			const toElement = e.toElement;
			const inElement = $(toElement).closest(this).length > 0;

			if (inElement) return;

			const inDropdown = $(toElement).closest(dropdown).length > 0;

			if (inDropdown) return;

			self.hideSubmenu(dropdown);
		});

    $(Object.values(this.cache.dropdowns)).each((index, dropdown) => {
      const target = this.cache.rootItems.filter(`[data-has-dropdown="${dropdown.dataset.rootItem}"]`);
      $(dropdown).appendTo(target);
    });

		if ($('[data-root-item="content"]').length > 0) {
			let menuContent = $('.js-menu-content .block_menu-content-blog').clone();
			$('[data-root-item="content"] .js-blog-block').html(menuContent);
			menuContent = $('.js-menu-content .block_menu-content-lookbook').clone();
			$('[data-root-item="content"] .js-lookbook-block').html(menuContent);

			const blockSize = $('.block_menu-content-lookbook').attr('data-block-size');
			if (blockSize === '1') {
				$('[data-root-item="content"]').addClass('is-one-lookbook');
			}
		}
	}

	showSubmenu(dropdown) {
		if (dropdown) {
			const root = this.cache.rootItems.filter(`[data-has-dropdown="${dropdown.dataset.rootItem}"]`);
			root.addClass(this.selectors.activeRootClass);
			$(dropdown).addClass(this.selectors.activeSubmenuClass).addClass(this.selectors.visibleSubmenuClass).trigger('dropdown.show');
		}
	}

	hideSubmenu(dropdown) {
		if (dropdown) {
			const root = this.cache.rootItems.filter(`[data-has-dropdown="${dropdown.dataset.rootItem}"]`);
			root.removeClass(this.selectors.activeRootClass);
			$(dropdown).removeClass(this.selectors.activeSubmenuClass).trigger('dropdown.hide');
			var self = this;
			setTimeout(function () {
				if (!$(dropdown).hasClass(self.selectors.activeSubmenuClass)) {
					$(dropdown).removeClass(self.selectors.visibleSubmenuClass);
				}
			}, 200);
		}
	}

	_initMobileNave() {
		$('.mobile-nav__slider-wrapper').append($('.js--menu-slides').html()).slick(this.slickConfig);
		$('body').on('click', '.js-mobile-root', function (e) {
			e.preventDefault();
			if ($(this).hasClass('mobile-nav__link--is-open')) {
				$('.mobile-nav__link--is-open').removeClass('mobile-nav__link--is-open');
				$(this).removeClass('mobile-nav__link--is-open');
				$('.mobile-nav').removeClass('mobile-nav__sub-open');
			} else {
				$('.mobile-nav__link--is-open').removeClass('mobile-nav__link--is-open');
				$(this).addClass('mobile-nav__link--is-open');
				$('.mobile-nav').addClass('mobile-nav__sub-open');
			}
		});
		$('body').on('click', '.js-mobile-subroot', function (e) {
			e.preventDefault();
			$(this).toggleClass('mobile-nav__link--is-open');
			$(this).next('.mobile-nav__dropdown').slideToggle();
		});
		$('body').on('click', '.mobile-nav .site-nav__childlist-heading', function (e) {
			e.preventDefault();
			$(this).toggleClass('mobile-nav__link--is-open');
			$(this).next('.row').slideToggle();
		});
		$('body').on('click', '.header__nav-toggle-link', function (e) {
			e.preventDefault();
			$('body').toggleClass('is-mobile-nav-open');
			if ($('body').hasClass('is-mobile-nav-open')) {
				$('body').removeClass('is-mobile-nav-close');
			} else {
				$('body').addClass('is-mobile-nav-close');
				$('.mobile-nav__link--is-open').removeClass('mobile-nav__link--is-open');
				$('.mobile-nav').removeClass('mobile-nav__sub-open');
			}
		});
		$('body').on('click', '.mobile-nav', function (e) {
			if ($(e.target).hasClass('mobile-nav')) {
				$('body').toggleClass('is-mobile-nav-open');
				if ($('body').hasClass('is-mobile-nav-open')) {
					$('body').removeClass('is-mobile-nav-close');
				} else {
					$('body').addClass('is-mobile-nav-close');
					$('.mobile-nav__link--is-open').removeClass('mobile-nav__link--is-open');
					$('.mobile-nav').removeClass('mobile-nav__sub-open');
				}
			}
		});

	}
}
