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
			toggleSearchFormSelector: '.js--toggle-search-form',
			headerSearchForm: '.js--header-search-form',
			headerSearchFormActiveClass: 'header__search-form--active',
			miniCartToggle: '.js--min-cart-toggle',
			miniCart: '.js--min-cart',
		};
		this.cache = {
			dropdowns: {},
		};
		this.init();
	}

	init() {
		this._cacheSelectors();
		this._initStickyHeader();
		this._initDropdownMenu();
		this._initHeaderSearch();
		this._initMiniCart();
	}

	_initMiniCart() {
		$(this.selectors.miniCartToggle).on('click', (e) => {
			e.preventDefault();
			$('body').toggleClass('is-open-mini-cart');
			$(this.selectors.miniCart).fadeToggle(200);
		})
	}

	_cacheSelectors() {
		this.cache.rootItems = $(this.selectors.rootItems, this.$container);
		this.cache.rootItems.each((index, el) => {
			this.cache.dropdowns[el.dataset.hasDropdown] = $(`[data-root-item="${el.dataset.hasDropdown}"]`, this.$container)[0];
		});
	}

	_initStickyHeader() {
		$(window).one('load', () => {
			this.headerHeight = this.$container.outerHeight();
			this.$container.css({
				paddingBottom: this.headerHeight,
			});
		});
		$(window).on('scroll', () => {
			var scrollTop = $(window).scrollTop();
			this.headerHeight = this.$container.outerHeight();
			if (scrollTop > this.headerHeight) {
				this.$container.addClass('header--sticky-totop');
			} else {
				this.$container.removeClass('header--sticky-totop');
			}

			if (scrollTop > this.headerHeight + 40) {
				this.$container.addClass('header--sticky');
			} else {
				this.$container.removeClass('header--sticky');
			}
		});
	}

	_initHeaderSearch() {
		$(this.selectors.toggleSearchFormSelector, this.$container).on('click', () => {
			const form = $(this.selectors.headerSearchForm, this.$container).toggleClass(this.selectors.headerSearchFormActiveClass);
			const input = form.find('input');

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

		$(Object.values(this.cache.dropdowns)).on('mouseout', function (e) {
			const toElement = e.toElement;
			const inDropdown = $(toElement).closest(this).length > 0;

			if (inDropdown) return;

			const root = self.cache.rootItems.filter(`[data-has-dropdown="${this.dataset.rootItem}"]`);
			const inRoot = $(toElement).closest(root).length > 0;

			if (inRoot) return;

			self.hideSubmenu(this);
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
			$(dropdown).addClass(this.selectors.activeSubmenuClass).trigger('dropdown.show');
		}
	}

	hideSubmenu(dropdown) {
		if (dropdown) {
			const root = this.cache.rootItems.filter(`[data-has-dropdown="${dropdown.dataset.rootItem}"]`);
			root.removeClass(this.selectors.activeRootClass);
			$(dropdown).removeClass(this.selectors.activeSubmenuClass).trigger('dropdown.hide');
		}
	}
}
