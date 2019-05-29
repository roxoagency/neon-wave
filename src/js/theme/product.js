import {Nofification} from "./notification";

import {formatMoney} from '@shopify/theme-currency';

export class Product {

	/**
	 * Get product by ID
	 * @param {number} ProductID
	 */
	static get(id) {
		let product = undefined;

		if (typeof window.theme != 'undefined' && typeof window.theme.products != 'undefined') {
			product = theme.products[id];
		}
		return product;
	}

	static addToCart(data, isSingle) {
		if (isSingle) {
			$('[data-add-to-cart]').addClass('is-loading');
		}
		return $.ajax({
			url: '/cart/add.js',
			data: data,
			dataType: 'json',
			success: (success) => {
				Nofification.add(theme.strings.addedToCart);
				const cartCount = $('.js--cart-count');

				const current = parseInt(cartCount.data('count'));
				let qty = 0;
				if (isSingle) {
					$.each(data, function (key, value) {
						if (value.name === "quantity") {
							qty = parseInt(value.value);
						}
					});
				} else {
					qty = data.quantity;
				}
				cartCount
					.data('count', (current + qty))
					.attr('data-count', (current + qty))
					.text((current + qty));

				//Mini cart
				$.ajax({
					url: '/cart.js',
					dataType: "json",
					cache: false,
					success: function (cart) {
						$(".cart_count").empty();
						var cart_items_html = "";
						var cart_action_html = "";
						var cart_savings_html = "";
						var $cart = $(".cart_content form");
						var total_savings = 0;

						if (cart.item_count == 0) {
							$('.js-empty-cart__message').removeClass('hide');
							$('.js-cart_content__form').addClass('hide');
						} else {
							$('.js-empty-cart__message').addClass('hide');
							$('.js-cart_content__form').removeClass('hide');

							$.each(cart.items, function (index, item) {
								var line_id = index + 1;
								cart_items_html += '<tr class="cart__row"><td class="cart__image-wrapper">';
								if (item.image) {
									cart_items_html += '<img class="cart_image" src="' + item.image.replace(/(\.[^.]*)$/, "_85x85_crop_center$1").replace('http:', '') + '" alt="" />';
								}
								cart_items_html += '</td>' +
									'<td class="cart__item-quantity-wrapper">' +
									'<span class="cart__item-quantity">x' + item.quantity + '</span>' +
									'</td>';

								cart_items_html += '<td class="cart__meta"><div class="cart__item-title"><a href="' + item.url + '">' + item.title + ' <span class="cart__item-quantity">x' + item.quantity + '</span>' + '</a></div>' +
									'<div class="cart__item-vendor">' + item.vendor + '</div>';

								if (item.properties) {
									$.each(item.properties, function (title, value) {
										if (value) {
											cart_items_html += '<div class="cart__meta-text">' + title + ': ' + value + '</div>';
										}
									});
								}
								cart_items_html += '<div class="cart__item-price">';


								cart_items_html += '<div class="cart-item__original-price"><span class="money">' + formatMoney(item.price, theme.moneyFormat) + '</span></div>';
								cart_items_html += '</div>';
								cart_items_html += '</td>';

								cart_items_html += '<td class="cart__item-total-price-wrapper"><div class="cart__item-price">';


								cart_items_html += '<div class="cart-item__original-price"><span class="money">' + formatMoney(item.price, theme.moneyFormat) + '</span></div>';
								cart_items_html += '</div></tr>';

							});

							cart_action_html += '<span class="money">' + formatMoney(cart.total_price, theme.moneyFormat) + '</span>';
						}

						$('.js-cart_items').html(cart_items_html);
						$('.js-cart_subtotal').html(cart_action_html);

						Currency.convertAll(theme.defaultCurrency, Currency.currentCurrency);
						if ($('.js-mini-cart-hide').length > 0) {
							$('.js-mini-cart-hide').trigger('click');
						}
						if (isSingle) {
							$('[data-add-to-cart]').removeClass('is-loading');
							setTimeout(function () {
								$('.cart__overlay').trigger('click');
							}, 5000);
						}
					}
				});

			},
			error: (error) => {
				if (isSingle) {
					$('[data-add-to-cart]').removeClass('is-loading');
				}
				if (error.responseJSON) {
					Nofification.add(error.responseJSON.description);
				}
			}
		});
	}


}
