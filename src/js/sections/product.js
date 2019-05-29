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
import {Product} from "../theme/product";


const selectors = {
	addToCart: '[data-add-to-cart]',
	addToCartText: '[data-add-to-cart-text]',
	comparePrice: '[data-sale-price]',
	comparePriceText: '[data-compare-text]',
	originalSelectorId: '[data-product-select]',
	priceWrapper: '[data-price]',
	productImageWrapper: '[data-product-image-wrapper]',
	productSliderImageWrapper: '[data-product-slider-image-wrapper]',
	productFeaturedImage: '[data-product-featured-image]',
	productJson: '[data-product-json]',
	productPrice: '[data-regular-price]',
	productThumbs: '[data-product-single-thumbnail]',
	singleOptionSelector: '[data-single-option-selector]',
	singleOptionSize: '[data-single-option-size]',
	singleForm: '[data-single-form]',
	sliderSelector: '.js--product-single__slider',
	modalSliderSelector: '.js--product-single__slider-modal',
	modalToogle: '.js--product-single__zoom-link',

};

const cssClasses = {
	activeThumbnail: 'active-thumbnail',
	hide: 'hide',
	priceOnSale: 'price--on-sale',
};

const keyboardKeys = {
	ENTER: 13,
};

let slideIndex = $('.product-single__photo-wrapper--active').length > 0 ? parseInt($('.product-single__photo-wrapper--active').attr('data-index')) : 0;
const slickConfig = {
	arrows: false,
	slidesToShow: 1,
	slidesToScroll: 1,
	dots: true,
	initialSlide: slideIndex
};
const modalSlickConfig = {
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	prevArrow: theme.strings.slickArrowLeftModal,
	nextArrow: theme.strings.slickArrowRightModal,
	cssEase:'ease-out'
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

		this.$featuredImage = $(selectors.productFeaturedImage, this.$container);
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
				select.selectric('refresh');
				$(this).parent().find('.btn-group__item--selected').removeClass('btn-group__item--selected');
				$(this).addClass('btn-group__item--selected');
			});

		});
		this.toggleSlider();
		$(window).resize(() => {
			this.toggleSlider();
		});

		let slider = $(selectors.modalSliderSelector, this.$container);
		$(selectors.modalToogle, this.$container).on('click', function (e) {
			if ($(selectors.modalSliderSelector, this.$container).hasClass('slick-initialized')) {
				$(selectors.modalSliderSelector, this.$container).slick('unslick');
			}
			setTimeout(function () {
				slider = $(selectors.modalSliderSelector, this.$container).slick(modalSlickConfig);
			}, 400)
		});
		this.initQuickBuy();


	},
	toggleSlider() {
		if ($(window).width() < 1024) {
			if (!$(selectors.sliderSelector).hasClass('slick-initialized')) {
				$(selectors.sliderSelector, this.$container).slick(slickConfig);
			}
		} else {
			if ($(selectors.sliderSelector).hasClass('slick-initialized')) {
				$(selectors.sliderSelector, this.$container).slick('unslick');
			}
		}
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
		this.updateProductImage(evt);
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

		$(selectors.productPrice, this.$container).html('<span class="money">' +
			formatMoney(variant.price, theme.moneyFormat) + '</span>'
		);

		if (variant.compare_at_price > variant.price) {
			$comparePrice.html('<span class="money">' +
				formatMoney(variant.compare_at_price, theme.moneyFormat) + '</span>'
			);
			$compareEls.removeClass(cssClasses.hide).parent().addClass(cssClasses.priceOnSale);
		} else {
			$comparePrice.html('');
			$compareEls.addClass(cssClasses.hide).parent().removeClass(cssClasses.priceOnSale);
		}
		Currency.convertAll(theme.defaultCurrency, Currency.currentCurrency);

	},
	updateProductImage(evt) {
		const variant = evt.variant;
		if (variant.featured_image != null) {
			const imageId = variant.featured_image.id;
			let index = null;
			variant.options.forEach(function (el) {
				const slide = $(`.js--product-single__slider [data-image-option='${el}']`);
				if (slide.length > 0) {
					index = slide.attr('data-index');
				}
			});
			this.switchImage(imageId, index);
		}

	},

	switchImage(imageId, index) {
		this.$featuredImage = $(selectors.productFeaturedImage, self.$container);
		if (this.$featuredImage.length > 0) {
			const $newImage = $(
				`${selectors.productImageWrapper}[data-image-id='${imageId}']`,
				this.$container,
			);
			const $otherImages = $(
				`${selectors.productImageWrapper}:not([data-image-id='${imageId}'])`,
				this.$container,
			);
			$newImage.removeClass(cssClasses.hide);
			$otherImages.addClass(cssClasses.hide);
			const $newSliderImage = $(
				`${selectors.productSliderImageWrapper}[data-image-id='${imageId}']`,
				this.$container,
			);
			if ($(selectors.sliderSelector).hasClass('slick-initialized')) {
				if (index != null) {
					$(selectors.sliderSelector).slick('slickGoTo', parseInt(index));
				}
			}
		}
	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	},
	initQuickBuy() {
		$(selectors.addToCart, this.$container).on('click', (e) => {
			e.preventDefault();

			const form = $(e.target).closest(selectors.singleForm);
			const data = form.serializeArray();
			Product.addToCart(data, true);
		});
	}
});
