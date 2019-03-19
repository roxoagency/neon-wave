/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */

import Variants from '@shopify/theme-variants';
import {formatMoney} from '@shopify/theme-currency';
import {register} from '@shopify/theme-sections';


const selectors = {
	addToCart: '[data-add-to-cart]',
	addToCartText: '[data-add-to-cart-text]',
	comparePrice: '[data-sale-price]',
	comparePriceText: '[data-compare-text]',
	originalSelectorId: '[data-product-select]',
	priceWrapper: '[data-price]',
	productImageWrapper: '[data-product-image-wrapper]',
	productFeaturedImage: '[data-product-featured-image]',
	productJson: '[data-product-json]',
	productPrice: '[data-regular-price]',
	productThumbs: '[data-product-single-thumbnail]',
	singleOptionSelector: '[data-single-option-selector]',
	singleOptionSize: '[data-single-option-size]',
	singleForm: '[data-single-form]',
	sliderSelector: '.js--product-single__slider',
	stickyBreadcrumb: '.breadcrumb--product',
	stickyWrapper: '.product-single__meta',
	modalSliderSelector: '.js--product-single__slider-modal',
	modalToogle: '.js--product-single__zoom-link',

};

const cssClasses = {
	activeThumbnail: 'active-thumbnail',
	hide: 'hide',
	priceOnSale: 'price--on-sale',
	stickyShow: 'breadcrumb--show'
};

const keyboardKeys = {
	ENTER: 13,
};
const slickConfig = {
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
};
const modalSlickConfig = {
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	prevArrow: theme.strings.slickArrowLeftModal,
	nextArrow: theme.strings.slickArrowRightModal,
};
/**
 * Product section constructor. Runs on page load as well as Theme Editor
 * `section:load` events.
 * @param {string} container - selector for the section container DOM element
 */

register('product', {
	onLoad() {
		var self = this;
		this.$container = $(this.container);
		var sectionId = this.$container.attr('data-section-id');
		this.namespace = `.${this.id}`;
		// Stop parsing if we don't have the product json script tag when loading
		// section in the Theme Editor
		if (!$(selectors.productJson, this.$container).html()) {
			return;
		}

		this.productSingleObject = JSON.parse(
			$(selectors.productJson, this.$container).html(),
		);

		// singleForm
		this.forms = $(selectors.singleForm, this.$container);
		this.forms.each(function () {
			const options = {
				$container: $(this),
				enableHistoryState: self.$container.data('enable-history-state') || true,
				singleOptionSelector: selectors.singleOptionSelector,
				originalSelectorId: selectors.originalSelectorId,
				product: self.productSingleObject,
			};

			self.settings = {};
			self.variants = new Variants(options);

			// self.$featuredImage = $(selectors.productFeaturedImage, self.$container);

			self.$container.on(
				`variantChange${self.namespace}`,
				self.updateAddToCartState.bind(self),
			);
			self.$container.on(
				`variantPriceChange${self.namespace}`,
				self.updateProductPrices.bind(self),
			);

			var select = $('.js--select', $(this));
			select.on('selectric-change', function (event, element, selectric) {
				$(element).val($(element).val()).trigger("change");
				var index = $(element).attr('data-index');
				if ($(element).hasClass('single-option-selector-size')) {
					$('[data-single-option-size]').removeClass('btn-group__item--selected');
					$('.single-option-selector[data-index="' + index + '"]').val($(element).val());
					$('[data-single-option-size][data-value="' + $(element).val() + '"]').addClass('btn-group__item--selected');
				} else {
					$('.single-option-selector[data-index="' + index + '"]').val($(element).val()).prop('selectedIndex', selectric.state.selectedIdx).selectric('refresh');

				}
			});
			select.selectric();
			$(selectors.singleOptionSize, self.$container).on('click', function (e) {
				e.preventDefault();
				var value = $(this).attr('data-value');
				var index = $(this).parent().attr('data-index');
				$('select[data-index="' + index + '"]').val(value).trigger('change');
				$(this).parent().find('.btn-group__item--selected').removeClass('btn-group__item--selected');
				$(this).addClass('btn-group__item--selected');
			});

		});

		// $(selectors.sliderSelector, this.$container).slick(slickConfig);

		var slider = $(selectors.modalSliderSelector, this.$container).slick(modalSlickConfig);
		$(selectors.modalToogle, this.$container).on('click', function (e) {
			setTimeout(function () {
				var dataId = $(selectors.modalSliderSelector, this.$container).find('.slick-current').attr("data-slick-index");

				slider.slick('slickGoTo', parseInt(dataId), true);
			}, 200)
		});


		this.initStickyForm();
	},
	initStickyForm() {

		var $stickyElem = $(selectors.stickyBreadcrumb);
		var $elem = $(selectors.stickyWrapper);
		$(window).scroll(function () {
			var scrollTop = $(window).scrollTop();
			var elemTop = $elem.offset().top;
			var elemBottom = elemTop + $elem.height();
			if (elemBottom < scrollTop) {
				$stickyElem.addClass(cssClasses.stickyShow).css('top', $('.header__inner').outerHeight());
			} else {
				$stickyElem.removeClass(cssClasses.stickyShow).css('top', $('.header__inner').outerHeight());
			}
		});
	},
	/**
	 * Updates the DOM state of the add to cart button
	 *
	 * @param {boolean} enabled - Decides whether cart is enabled or disabled
	 * @param {string} text - Updates the text notification content of the cart
	 */
	updateAddToCartState(evt) {
		const variant = evt.variant;

		if (variant) {
			$(selectors.priceWrapper, this.$container).removeClass(cssClasses.hide);
		} else {
			$(selectors.addToCart, this.$container).prop('disabled', true);
			$(selectors.addToCartText, this.$container).html(
				theme.strings.unavailable,
			);
			$(selectors.priceWrapper, this.$container).addClass(cssClasses.hide);
			return;
		}

		if (variant.available) {
			$(selectors.addToCart, this.$container).prop('disabled', false);
			$(selectors.addToCartText, this.$container).html(theme.strings.addToCart);
		} else {
			$(selectors.addToCart, this.$container).prop('disabled', true);
			$(selectors.addToCartText, this.$container).html(theme.strings.soldOut);
		}
	},

	/**
	 * Updates the DOM with specified prices
	 *
	 * @param {string} productPrice - The current price of the product
	 * @param {string} comparePrice - The original price of the product
	 */
	updateProductPrices(evt) {
		const variant = evt.variant;
		const $comparePrice = $(selectors.comparePrice, this.$container);
		const $compareEls = $comparePrice.add(
			selectors.comparePriceText,
			this.$container,
		);

		$(selectors.productPrice, this.$container).html(
			formatMoney(variant.price, theme.moneyFormat),
		);

		if (variant.compare_at_price > variant.price) {
			$comparePrice.html(
				formatMoney(variant.compare_at_price, theme.moneyFormat),
			);
			$compareEls.removeClass(cssClasses.hide).parent().addClass(cssClasses.priceOnSale);
		} else {
			$comparePrice.html('');
			$compareEls.addClass(cssClasses.hide).parent().removeClass(cssClasses.priceOnSale);
		}
	},

	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	},
});
