import {ProductListBlock} from "./product-list";

export class CollectionBlock {
	constructor(id, type, $container) {
		this.$container = $container;
		this.type = type;
		this.id = id;
		this.selectors = {
			listViewToggle: '.js-list-view-toggle',
			productsList: '.js-products-list',
			filterToogle: '.filter__header',
			filterClose: '.filter__close',
			filterClear: '.filter__clear',
			filterClearWrapper: '.filter__clear-wrapper'
		};

		this.init();
	}

	init() {
		this._initListView();
		new ProductListBlock('bc-list', 'product-list', $('#bc-sf-filter-products'));

		this._filter();
	}

	_filter() {
		$('body').on('click', this.selectors.filterToogle, function (e) {
			e.preventDefault();
			$('body').toggleClass('is-filter-show');
			if ($('body').hasClass('is-filter-show')) {
				$('body').addClass('is-filter-open');
				disableBodyScroll(true, '.filter__wrapper');
			} else {
				disableBodyScroll(false, '.filter__wrapper');
			}
			setTimeout(function () {
				if (!$('body').hasClass('is-filter-show')) {
					$('body').removeClass('is-filter-open')
				}
			}, 200);

		});
		$('body').on('click', this.selectors.filterClose, function (e) {
			e.preventDefault();
			$('body').toggleClass('is-filter-show');
			if ($('body').hasClass('is-filter-show')) {
				disableBodyScroll(true, '.ffilter__wrapper');
			} else {
				disableBodyScroll(false, '.filter__wrapper');
			}
			setTimeout(function () {
				if (!$('body').hasClass('is-filter-show')) {
					$('body').removeClass('is-filter-open')
				}
			}, 200);

		});
		$('body').on('click', this.selectors.filterClear, function (e) {
			e.preventDefault();
			$('.bc-sf-filter-clear-all').trigger('click');
			$(this.selectors.filterClearWrapper).removeClass('filter__clear-wrapper--is-show');

		});
		$('body').on('click', '.filter__sidebar', function (e) {
			if ($(e.target).hasClass('filter__sidebar')) {
				$('body').toggleClass('is-filter-show');
				if ($('body').hasClass('is-filter-show')) {
					$('body').addClass('is-filter-open');
					disableBodyScroll(true, '.filter__wrapper');
				} else {
					disableBodyScroll(false, '.filter__wrapper');
				}
				setTimeout(function () {
					if (!$('body').hasClass('is-filter-show')) {
						$('body').removeClass('is-filter-open')
					}
				}, 200);

			}
		});
	}

	_initListView() {
		var self = this
		if (this._getCookie('filter__list-view') != '') {
			$(self.selectors.productsList).removeClass("products-list--4").removeClass("products-list--3").removeClass("products-list--2").addClass("products-list--" + this._getCookie('filter__list-view'));
			$(self.selectors.listViewToggle).removeClass('filter__list-view-btn--selected');
			$(this.selectors.listViewToggle + '[data-item="' + this._getCookie('filter__list-view') + '"]').addClass('filter__list-view-btn--selected');
		}
		$(this.selectors.listViewToggle).on('click', function () {
			$(self.selectors.listViewToggle).removeClass('filter__list-view-btn--selected');
			$(this).addClass('filter__list-view-btn--selected');
			$(self.selectors.productsList).removeClass("products-list--4").removeClass("products-list--3").removeClass("products-list--2").addClass("products-list--" + $(this).attr("data-item"));
			self._setCookie('filter__list-view', $(this).attr("data-item"), 30);
			$(window).trigger('resize');
		});
		$(window).trigger('resize');
	}

	_setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	_getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

}
