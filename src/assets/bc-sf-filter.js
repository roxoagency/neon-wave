// Override Settings
var bcSfFilterSettings = {
	general: {
		limit: bcSfFilterConfig.custom.products_per_page,
		// Optional
		// loadProductFirst: true,
		styleScrollToTop: 'style2',
		defaultDisplay: bcSfFilterConfig.custom.layout,
	},
};

var bcSfFilterTemplate = {
	'soldOutClass': 'product-price--sold-out grid-view-item--sold-out',

	// Grid Template
	'vendorGridHtml': '{{itemVendorLabel}}',
	'soldOutLabelGridHtml': ' <span class="product-price__sold-out">' + bcSfFilterConfig.label.sold_out + '</span>',
	'productGridItemHtml':
	'<div class="product-card products-list__item {{productClass}}" data-section-type="product-card" data-section-id="{{itemId}}">' +
	'<script type="text/javascript">{{itemJson}}</script>' +
	'<div class="product-card__image">' +
	'{{itemForm}}</div>{{itemColors}}' +
	'  <div class="product-card_content">' +
	'  <div class="product-card__data">' +
	'      <h3 class="product-card__title"><a href="{{itemUrl}}">{{itemTitle}}</a></h3>' +
	'      <div class="product-card__price"><a href="{{itemUrl}}">{{itemPrice}}</a></div>' +
	'  </div>' +
	'{{itemMeta}}' +
	'  </div>' +
	'</div>',

	// List Template
	'vendorSmallListHtml': '<div class="list-view-item__vendor-column small--hide"><div class="list-view-item__vendor">{{itemVendorLabel}}</div></div>',
	'vendorMediumListHtml': '<div class="list-view-item__vendor medium-up--hide">{{itemVendorLabel}}</div>',
	'saleLabelListHtml': '<div class="list-view-item__on-sale">' + bcSfFilterConfig.label.sale + '</div>',
	'soldOutLabelListHtml': '<div class="list-view-item__sold-out">' + bcSfFilterConfig.label.sold_out + '</div>',
	'productListItemHtml': '<li href="{{itemUrl}}" class="list-view-item">' +
	'<div class="product-card product-card--list">' +
	'<div class="list-view-item__link">' +
	'<div class="list-view-item__image-column">' +
	'<div class="list-view-item__image-wrapper">' +
	'<img class="list-view-item__image" src="{{itemThumbUrl}}" alt="{{itemTitle}}">' +
	'</div>' +
	'</div>' +
	'<div class="list-view-item__title-column">' +
	'<div class="list-view-item__title">{{itemTitle}}</div>' +
	'{{itemSaleLabel}}' +
	'{{itemMediumVendor}}' +
	'{{itemSoldOutLabel}}' +
	'</div>' +
	'{{itemSmallVendor}}' +
	'<div class="list-view-item__price-column">{{itemPrice}}</div>' +
	'</div>' +
	'</div>' +
	'</li>',

	// Pagination Template
	'previousActiveHtml': '<li><a href="{{itemUrl}}" class="btn btn--secondary btn--narrow"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-arrow-left" viewBox="0 0 20 8"><path d="M4.814 7.555C3.95 6.61 3.2 5.893 2.568 5.4 1.937 4.91 1.341 4.544.781 4.303v-.44a9.933 9.933 0 0 0 1.875-1.196c.606-.485 1.328-1.196 2.168-2.134h.752c-.612 1.309-1.253 2.315-1.924 3.018H19.23v.986H3.652c.495.632.84 1.1 1.036 1.406.195.306.485.843.869 1.612h-.743z" fill="#000" fill-rule="evenodd"></path></svg><span class="icon__fallback-text">Previous</span></a></li>',
	'previousDisabledHtml': '<li><div class="btn btn--secondary btn--narrow btn--disabled"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-arrow-left" viewBox="0 0 20 8"><path d="M4.814 7.555C3.95 6.61 3.2 5.893 2.568 5.4 1.937 4.91 1.341 4.544.781 4.303v-.44a9.933 9.933 0 0 0 1.875-1.196c.606-.485 1.328-1.196 2.168-2.134h.752c-.612 1.309-1.253 2.315-1.924 3.018H19.23v.986H3.652c.495.632.84 1.1 1.036 1.406.195.306.485.843.869 1.612h-.743z" fill="#000" fill-rule="evenodd"></path></svg><span class="icon__fallback-text">Previous</span></div></li>',
	'nextActiveHtml': '<li><a href="{{itemUrl}}" class="btn btn--secondary btn--narrow"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-arrow-right" viewBox="0 0 20 8"><path d="M15.186.445c.865.944 1.614 1.662 2.246 2.154.631.491 1.227.857 1.787 1.098v.44a9.933 9.933 0 0 0-1.875 1.196c-.606.485-1.328 1.196-2.168 2.134h-.752c.612-1.309 1.253-2.315 1.924-3.018H.77v-.986h15.577c-.495-.632-.84-1.1-1.035-1.406-.196-.306-.486-.843-.87-1.612h.743z" fill="#000" fill-rule="evenodd"></path></svg><span class="icon__fallback-text">Next</span></a></li>',
	'nextDisabledHtml': '<li><div class="btn btn--secondary btn--narrow btn--disabled"><svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-arrow-right" viewBox="0 0 20 8"><path d="M15.186.445c.865.944 1.614 1.662 2.246 2.154.631.491 1.227.857 1.787 1.098v.44a9.933 9.933 0 0 0-1.875 1.196c-.606.485-1.328 1.196-2.168 2.134h-.752c.612-1.309 1.253-2.315 1.924-3.018H.77v-.986h15.577c-.495-.632-.84-1.1-1.035-1.406-.196-.306-.486-.843-.87-1.612h.743z" fill="#000" fill-rule="evenodd"></path></svg><span class="icon__fallback-text">Next</span></div></li>',
	'paginateHtml': '<ul class="list--inline pagination clearfix">{{previous}}<li class="pagination__text">{{pageItems}}</li>{{next}}</ul>',

	// Sorting Template
	'sortingHtml': '<div class="filters-dropdown"><div class="filters-dropdown__title">' + bcSfFilterConfig.label.sorting + '</div><div class="filters-dropdown__items">{{sortingItemsDropdown}}</div><select class="filters-toolbar__input filters-toolbar__input--sort">{{sortingItems}}</select></div>',
};

if (!$('body').hasClass('no-custom-scroll')) {
  BCSfFilter.prototype.buildInfiniteLoadingEvent = function(a) {
    var self = this,
      total_product = parseInt(a.total_product),
      limit = parseInt(self.getSettingValue("general.limit")),
      page = parseInt(self.queryParams.page);

    if (total_product > limit * page) {
        let loading = 0;

        const scrollHandler = function(event, status) {
          const scrollY = status.offset.y;
          const j = self.getSettingValue("general.positionShowInfiniteLoading");

          if ((g = !0) && 0 == loading && a.products.length && (status.limit.y - j) <= scrollY) {
            self.showLoadMoreLoading();
            loading = 1;
            page++;
            var k = Math.ceil(total_product / self.getSettingValue("general.limit"));

            if (page <= k) {
              self.internalClick = !0;
              self.queryParams.limit = self.getSettingValue("general.limit");
              self.queryParams.page = page;

              if (self.getSettingValue("general.paginationTypeAdvanced")) {
                var l = self.buildToolbarLink("page", page - 1, page);
                self.onChangeData(l, "page");
              } else {
                self.getFilterData("page");
              }
            }
          }
      };

      $('body').on('nwscroll', scrollHandler);
    }
  };
}

BCSfFilter.prototype.buildProductGridItem = function (data) {
	/*** Prepare data ***/
	var images = data.images_info;
	// Displaying price base on the policy of Shopify, have to multiple by 100
	var soldOut = !data.available; // Check a product is out of stock
	var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
	var priceVaries = data.price_min != data.price_max; // Check a product has many prices
	// Get First Variant (selected_or_first_available_variant)
	var firstVariant = data['variants'][0];
	if (getParam('variant') !== null && getParam('variant') != '') {
		var paramVariant = data.variants.filter(function (e) {
			return e.id == getParam('variant');
		});
		if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
	} else {
		for (var i = 0; i < data['variants'].length; i++) {
			if (data['variants'][i].available) {
				firstVariant = data['variants'][i];
				break;
			}
		}
	}
	/*** End Prepare data ***/

		// Get Template
	var itemHtml = bcSfFilterTemplate.productGridItemHtml;

	// Add a specific class for grid item
	var itemGridWidthClass = '';
	var imageSize = '600x600';

	switch (bcSfFilterConfig.custom.products_per_row) {
		case 2:
			itemGridWidthClass = 'medium-up--one-half';
			imageSize = '540x600';
			break;
		case 3:
			itemGridWidthClass = 'small--one-half medium-up--one-third';
			imageSize = '345x550';
			break;
		case 4:
			itemGridWidthClass = 'small--one-half medium-up--one-quarter';
			imageSize = '250x';
			break;
		case 5:
			itemGridWidthClass = 'small--one-half medium-up--one-fifth';
			imageSize = '195x';
			break;
	}
	itemHtml = itemHtml.replace(/{{itemGridWidthClass}}/g, itemGridWidthClass);

	// Add soldOut class
	var itemSoldOutClass = soldOut ? bcSfFilterTemplate.soldOutClass : '';
	itemHtml = itemHtml.replace(/{{itemSoldOutClass}}/g, itemSoldOutClass);

	// Add soldOut label
	var itemSoldOutLabel = soldOut ? bcSfFilterTemplate.soldOutLabelGridHtml : '';
	itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabel);

	var imgId = 'ProductCardImage-' + data.id;
	var wrapperId = 'ProductCardImageWrapper-' + data.id;

	// Build Image style
	var imageStyle = buildImageStyle(data);
	itemHtml = itemHtml.replace(/{{imageStyle}}/g, imageStyle);

	// Add Images
  var aspect_ratio = '';
  var imageWrapperClass = '';
	var itemImagesHtml = '<a href="' + this.buildProductItemUrl(data) + '" class="product-card__image-link">' +
		'<img class="product-card__image--featured active js--default-image" src="' + this.getFeaturedImage(images, '600x600_crop_center') + '">';
	if (images.length > 1) {
    imageWrapperClass = ' has--alt-images';
		var images1 = [];
		images1.push(images[1]);
		itemImagesHtml += '<img class="product-card__image--alt active js--default-image" src="' + this.getFeaturedImage(images1, '600x600_crop_center') + '">';

		if (data['variants'].length > 1) {
			for (var i = 0; i < data['variants'].length; i++) {
				if (data['variants'][i].image) {
					var images2 = [];
					images2.push(data['variants'][i].image);

					itemImagesHtml += '<img class="product-card__image--featured product-card__image--variant-featured js--variant-image" data-variant="' + data['variants'][i].id + '" src="' + this.getFeaturedImage(images2, '600x600_crop_center') + '">';
				}
			}
		}
	}
	itemImagesHtml += '</a>';
	// itemHtml = itemHtml.replace(/{{itemImages}}/g, itemImagesHtml);

	// Add Vendor
	var itemVendorHtml = bcSfFilterConfig.custom.vendor_enable ? '<div class="product-card__vendor"><a href="' + this.buildProductItemUrl(data) + '">' + bcSfFilterTemplate.vendorGridHtml + '</a></div>' : '';
	itemHtml = itemHtml.replace(/{{itemVendor}}/g, itemVendorHtml);

	// Add Price
	var itemPriceHtml = buildPrice(data, onSale, priceVaries);
	itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);
	var itemFormHtml = '';
	var productOptions = [];
	var countColors = 0;
	var colorsHtml = '';
	var hasSizeOption = false;
	var hasColorOption = false;
	var productClass = '';
	itemFormHtml += '<form method="post" action="/cart/add" id="product_form_' + data.id + '" accept-charset="UTF-8" class="js--product-card-form" enctype="multipart/form-data" data-product-id="' + data.id + '" novalidate="novalidate">';
	itemFormHtml += '<div class="product-card__image-wrapper'+ imageWrapperClass +'">' + itemImagesHtml;
	if (data.available) {
		if (data['variants'].length > 1) {
			for (var i = 0; i < data.options_with_values.length; i++) {
				if (data.options_with_values[i].name == 'size') {
					hasSizeOption = true;
				} else if (data.options_with_values[i].name == 'color') {
					hasColorOption = true;
				}
			}

			itemFormHtml += '    <div class="product-card__form">' +
				'<input type="hidden" name="form_type" value="product" tabindex="0">' +
				'<input type="hidden" name="utf8" value="✓" tabindex="0">';
			for (var i = 0; i < data.options_with_values.length; i++) {
				if (data.options_with_values[i].name == 'size') {
					itemFormHtml += '<div class="product-card__form-group btn-group js--quick-buy-group product-card__form-group--size" data-index="option' + (i + 1) + '">';
				var values=data.options_with_values[i].values.sort();
					for (var j = 0; j < values.length; j++) {
						itemFormHtml += '<button type="button" class="option btn-group__item js--quick-buy" data-value-sort="' + encodeURI(values[j].title).toLowerCase() + '"  data-value="' + encodeURI(values[j].title) + '">' + values[j].title + '</button>';
					}

					itemFormHtml += '</div>';
				} else if (data.options_with_values[i].name == 'color') {
				} else {
					for (var j = 0; j < data.options_with_values[i].values.length; j++) {
						if (j != data.options_with_values[i].values.length - 1) {
							productOptions.push(data.options_with_values[i].values[j]);
						}
						itemFormHtml += '<input type="hidden" class="js--product-option" data-index="option' + j + '" value="' + data.options_with_values[i].values[j].title + '">';
					}
				}
			}
			itemFormHtml += '</div><input type="hidden" name="quantity js--product-quantity" value="1">';

      if (hasSizeOption) {
        itemFormHtml += '<span class="product-card__form-group-label">' + bcSfFilterConfig.label.select_size_to_add_to_cart + '</span>';
      }
		}
	}
	itemFormHtml += '</div>';
	if (data.available) {
		if (data['variants'].length > 1) {
			for (var i = 0; i < data.options_with_values.length; i++) {
				if (data.options_with_values[i].name == 'size') {
					hasSizeOption = true;
				} else if (data.options_with_values[i].name == 'color') {
					hasColorOption = true;
				}
			}

			for (var i = 0; i < data.options_with_values.length; i++) {
				if (data.options_with_values[i].name == 'size') {

				} else if (data.options_with_values[i].name == 'color') {
					itemFormHtml += '<div class="product-card__form-group btn-group js--color-option-group product-card__form-group--color" data-index="option' + (i + 1) + '">';
					for (var j = 0; j < data.options_with_values[i].values.length; j++) {
						var optionClass = '';

						if (j === 0) {
							optionClass = ' default selected';
						}

						itemFormHtml += '<button type="button" class="option btn-group__item js--color-option product-color-' + data.options_with_values[i].values[j].title.toLowerCase() + optionClass + '" data-value="' + data.options_with_values[i].values[j].title + '"></button>';
					}
					itemFormHtml += '</div>';
				}
			}

		}
	}
	itemFormHtml += '</form>';

	// Add Meta
	var itemColorsHtml = '';
	if (countColors > 0) {
		itemColorsHtml += '<div class="product-card__colors-select-wrapper">' + colorsHtml + '</div>';

	}
	itemHtml = itemHtml.replace(/{{itemColors}}/g, itemColorsHtml);
	var itemMetaHtml = '<div class="product-card__meta">';
	itemMetaHtml += '<div class="product-card__vendor"><a href="' + this.buildProductItemUrl(data) + '">' + bcSfFilterTemplate.vendorGridHtml + '</a></div>';

	if (hasSizeOption && hasColorOption) {
		productClass = 'product-card--with-colors';
	}
	itemHtml = itemHtml.replace(/{{productClass}}/g, productClass);

	itemHtml = itemHtml.replace(/{{itemForm}}/g, itemFormHtml);

	// if (productOptions.length > 0) {
	// 	itemMetaHtml += '<div class="product-card__options">'
	// 	for (var i = 0; i < productOptions.length; i++) {
	// 		itemMetaHtml += '<a href="' + this.buildProductItemUrl(data) + '">' + productOptions[i].title + '</a>';
	// 	}
	// 	itemMetaHtml += '</div>'
	// }
	itemMetaHtml += '  </div>';
	if (countColors > 0) {
		itemMetaHtml += '<div class="product-card__colors">';
		if (countColors == 1) {
			itemMetaHtml += bcSfFilterConfig.label.color_available_count_one.replace(/{{ count }}/g, countColors);
		} else {
			itemMetaHtml += bcSfFilterConfig.label.color_available_count_other.replace(/{{ count }}/g, countColors);
		}
		itemMetaHtml += '</div>';

	}
	itemHtml = itemHtml.replace(/{{itemMeta}}/g, itemMetaHtml);


	// Add data json
	var self = this;
	var itemJson = {
		"id": data.id,
		"title": data.title,
		"handle": data.handle,
		"vendor": data.vendor,
		"variants": data.variants,
		"url": self.buildProductItemUrl(data),
		"options_with_values": data.options_with_values,
		"images": data.images,
		"available": data.available,
		"price_min": data.price_min,
		"price_max": data.price_max,
		"compare_at_price_min": data.compare_at_price_min,
		"compare_at_price_max": data.compare_at_price_max
	};
	var itemJsonText = '';
	// var itemJsonText = 'window.theme = window.theme || {};' +
	// 	'window.theme.products = window.theme.products || {};' +
	// 	'window.theme.products[' + data.id + '] = ' + JSON.stringify(itemJson) + ';';
	itemHtml = itemHtml.replace(/{{itemJson}}/g, itemJsonText);

	// Add main attribute
	itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
	itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
	itemHtml = itemHtml.replace(/{{itemVendorLabel}}/g, data.vendor);
	itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));

	return itemHtml;
}

// Build Image style
function buildImageStyle(data) {
	var images = data.images_info;
	var imgId = 'ProductCardImage-' + data.id;
	var wrapperId = 'ProductCardImageWrapper-' + data.id;
	var imageStyle = '';
	if (images.length > 0) {
		var image = images[0];
		var width = bcSfFilterConfig.custom.max_height;
		var height = bcSfFilterConfig.custom.max_height;
		var aspect_ratio = image.width / image.height;
		var small_style = true;
		var container_aspect_ratio = width * 1.0 / height;

		if (image.aspect_ratio < 1.0) {
			var maximum_width = height * aspect_ratio;
			if (image.height <= height) {
				var maximum_height = image.height;
				maximum_width = image.width;
			} else {
				var maximum_height = height;
			}
		} else if (aspect_ratio < container_aspect_ratio) {
			var maximum_height = height / aspect_ratio;
			if (image.height <= height) {
				var maximum_height = image.height;
				var maximum_width = image.width;
			} else {
				var maximum_height = height;
				var maximum_width = height * aspect_ratio;
			}
		} else {
			var maximum_height = height / aspect_ratio;
			if (image.width <= width) {
				maximum_height = image.height;
				var maximum_width = image.width
			} else {
				var maximum_width = width;
				maximum_height = maximum_width / aspect_ratio;
			}
		}

		imageStyle += '<style>';
		if (small_style) imageStyle += '@media screen and (min-width: 750px) {';
		imageStyle += '#' + imgId + ' {' +
			'max-width: ' + maximum_width + 'px;' +
			'max-height: ' + maximum_height + 'px;' +
			'}' +
			'#' + wrapperId + ' {' +
			'max-width: ' + maximum_width + 'px;' +
			'max-height: ' + maximum_height + 'px;' +
			'}';
		if (small_style) imageStyle += '}';

		if (small_style) {
			if (aspect_ratio < 1) {
				maximum_width = 750 * aspect_ratio;
			} else {
				if (image.width < 750) {
					maximum_width = image.width;
				} else {
					maximum_width = 750;
				}
			}
			imageStyle += '@media screen and (max-width: 749px) {'
			imageStyle += '#' + imgId + ' {' +
				'max-width: ' + maximum_width + 'px;' +
				'max-height: 750px;' +
				'}' +
				'#' + wrapperId + ' {' +
				'max-width: ' + maximum_width + 'px;' +
				'}';
			imageStyle += '}';
		}
		imageStyle += '</style>';
	}
	return imageStyle;
}

BCSfFilter.prototype.buildProductListItem = function (data) {
	/*** Prepare data ***/
	var images = data.images_info;
	// Displaying price base on the policy of Shopify, have to multiple by 100
	var soldOut = !data.available; // Check a product is out of stock
	var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
	var priceVaries = data.price_min != data.price_max; // Check a product has many prices
	// Get First Variant (selected_or_first_available_variant)
	var firstVariant = data['variants'][0];
	if (getParam('variant') !== null && getParam('variant') != '') {
		var paramVariant = data.variants.filter(function (e) {
			return e.id == getParam('variant');
		});
		if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
	} else {
		for (var i = 0; i < data['variants'].length; i++) {
			if (data['variants'][i].available) {
				firstVariant = data['variants'][i];
				break;
			}
		}
	}
	/*** End Prepare data ***/

		// Get Template
	var itemHtml = bcSfFilterTemplate.productListItemHtml;

	// Add onSale label
	var itemSaleLabel = onSale ? bcSfFilterTemplate.saleLabelListHtml : '';
	itemHtml = itemHtml.replace(/{{itemSaleLabel}}/g, itemSaleLabel);

	// Add soldOut label
	var itemSoldOutLabel = soldOut ? bcSfFilterTemplate.soldOutLabelListHtml : '';
	itemHtml = itemHtml.replace(/{{itemSoldOutLabel}}/g, itemSoldOutLabel);

	// Add Thumbnail
	var itemThumbUrl = images.length > 0 ? this.optimizeImage(images[0]['src'], '600x600') : bcSfFilterConfig.general.no_image_url;
	itemHtml = itemHtml.replace(/{{itemThumbUrl}}/g, itemThumbUrl);

	// Add Vendor
	var itemSmallVendorHtml = bcSfFilterConfig.custom.vendor_enable ? bcSfFilterTemplate.vendorSmallListHtml : '';
	itemHtml = itemHtml.replace(/{{itemSmallVendor}}/g, itemSmallVendorHtml);
	var itemMediumVendorHtml = bcSfFilterConfig.custom.vendor_enable ? bcSfFilterTemplate.vendorMediumListHtml : '';
	itemHtml = itemHtml.replace(/{{itemMediumVendor}}/g, itemMediumVendorHtml);

	// Add Price
	var itemPriceHtml = buildPrice(data, onSale, priceVaries);
	itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);

	// Add main attribute
	itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
	itemHtml = itemHtml.replace(/{{itemVendorLabel}}/g, data.vendor);
	itemHtml = itemHtml.replace(/{{itemUrl}}/g, this.buildProductItemUrl(data));

	return itemHtml;
}

function buildPrice(data, onSale, priceVaries) {
	var priceHtml = '',
		onSaleClass = onSale ? ' price--on-sale' : '';

	// priceHtml += '<dl class="price' + onSaleClass + '" data-price>';
	// if (bcSfFilterConfig.custom.vendor_enable) {
	//   priceHtml += '<div class="price__vendor">';
	//   priceHtml += '<dt>';
	//   priceHtml += '<span class="visually-hidden">' + bcSfFilterConfig.label.vendor + '</span>';
	//   priceHtml += '</dt>';
	//   priceHtml += '<dd>';
	//   priceHtml += data.vendor;
	//   priceHtml += '</dd>';
	//   priceHtml += '</div>';
	// }
	// priceHtml +=  bcSfFilterConfig.label.regular_price ;
	// if (data.available) {
	if (onSale) {
		priceHtml += '<span class="product-card__price--sale" data-sale-price>';
		priceHtml += bcsffilter.formatMoney(data.compare_at_price_min, bcsffilter.moneyFormat);
		priceHtml += '</span> ';
		priceHtml += bcsffilter.formatMoney(data.price_min, bcsffilter.moneyFormat);
	} else {
		priceHtml += bcsffilter.formatMoney(data.price_min, bcsffilter.moneyFormat);
	}
	// } else {
	//   priceHtml += bcSfFilterConfig.label.sold_out;
	// }
	// priceHtml += '</span>';
	// priceHtml += '</dd>';
	// priceHtml += '</div>';
	// priceHtml += '<div class="price__sale">';
	// priceHtml += '<dt>';
	// priceHtml += '<span class="visually-hidden visually-hidden--inline">' + bcSfFilterConfig.label.sale_price + '</span>';
	// priceHtml += '</dt>';
	// // priceHtml += '<dd>';
	// priceHtml += '<span class="price-item price-item--sale" data-sale-price>';
	// priceHtml += bcsffilter.formatMoney(data.price_min, bcsffilter.moneyFormat);
	// priceHtml += '</span> ';
	// priceHtml += '<span class="price-item__label" aria-hidden="true">' + bcSfFilterConfig.label.sale + '</span>';
	// priceHtml += '</dd>';
	// priceHtml += '</div>';
	// priceHtml += '</dl>';
	// {{ product.price | money | replace: ',00', '' }}
	return priceHtml;
}

// Build Pagination
BCSfFilter.prototype.buildPagination = function (totalProduct) {
  console.log("TCL: BCSfFilter.prototype.buildPagination -> totalProduct", totalProduct)
	// Get page info
	var currentPage = parseInt(this.queryParams.page);
	var totalPage = Math.ceil(totalProduct / this.queryParams.limit);

	// If it has only one page, clear Pagination
	if (totalPage == 1) {
		jQ(this.selector.pagination).html('');
		return false;
	}

	if (this.getSettingValue('general.paginationType') == 'default') {
		var paginationHtml = bcSfFilterTemplate.paginateHtml;

		// Build Previous
		var previousHtml = (currentPage > 1) ? bcSfFilterTemplate.previousActiveHtml : bcSfFilterTemplate.previousDisabledHtml;
		previousHtml = previousHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage - 1));
		paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);

		// Build Next
		var nextHtml = (currentPage < totalPage) ? bcSfFilterTemplate.nextActiveHtml : bcSfFilterTemplate.nextDisabledHtml;
		nextHtml = nextHtml.replace(/{{itemUrl}}/g, this.buildToolbarLink('page', currentPage, currentPage + 1));
		paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);

		// Build page items
		var currentPage = bcSfFilterConfig.label.current_page.replace(/{{ current }}/g, currentPage).replace(/{{ total }}/g, totalPage);
		paginationHtml = paginationHtml.replace(/{{pageItems}}/g, currentPage);

		jQ(this.selector.pagination).html(paginationHtml);
	}
};

// Build Sorting
BCSfFilter.prototype.buildFilterSorting = function () {
	if (bcSfFilterTemplate.hasOwnProperty('sortingHtml')) {
		jQ(this.selector.topSorting).html('');

		var sortingArr = this.getSortingList();
		if (sortingArr) {
			// Build content
			var sortingItemsHtml = '';
			var sortingItemsDropdownHtml = '';
			for (var k in sortingArr) {
				sortingItemsHtml += '<option value="' + k + '">' + sortingArr[k] + '</option>';
				if (k != 'created-descending' && k != 'created-ascending') {

					sortingItemsDropdownHtml += '<a class="filters-dropdown__item" href="#" data-value="' + k + '">' + sortingArr[k] + '</a>';
				}
			}
			var html = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
			html = html.replace(/{{sortingItemsDropdown}}/g, sortingItemsDropdownHtml);
			jQ(this.selector.topSorting).html(html);

			// Set current value
			jQ(this.selector.topSorting + ' select').val(this.queryParams.sort);
		}
	}
};

// Build Display type
BCSfFilter.prototype.buildFilterDisplayType = function () {
	var itemHtml = '<span>View As </span>';
	itemHtml += '<a href="' + this.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="bc-sf-filter-display-item bc-sf-filter-display-grid" data-view="grid"><span class="icon-fallback-text"><span class="fallback-text">Grid view</span></span></a>';
	itemHtml += '<a href="' + this.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="bc-sf-filter-display-item bc-sf-filter-display-list" data-view="list"><span class="icon-fallback-text"><span class="fallback-text">List view</span></span></a>';
	jQ(this.selector.topDisplayType).html(itemHtml);

	// Active current display type
	jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').removeClass('active');
	jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').removeClass('active');
	if (this.queryParams.display == 'list') {
		jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-list').addClass('active');
	} else if (this.queryParams.display == 'grid') {
		jQ(this.selector.topDisplayType).find('.bc-sf-filter-display-grid').addClass('active');
	}
};

// Add additional feature for product list, used commonly in customizing product list
BCSfFilter.prototype.buildExtrasProductList = function (data, eventType) {
	/* start-initialize-bc-al */
	var self = this;
	var alEnable = true;
	if (self.getSettingValue('actionlist.qvEnable') != '' || self.getSettingValue('actionlist.atcEnable') != '') {
		alEnable = self.getSettingValue('actionlist.qvEnable') || self.getSettingValue('actionlist.atcEnable');
	}
	if (alEnable === true && typeof BCActionList !== 'undefined') {
		if (typeof bcActionList === 'undefined') {
			bcActionList = new BCActionList();
		} else {
			if (typeof bcAlParams !== 'undefined' && typeof bcSfFilterParams !== 'undefined') {
				bcActionList.initFlag = false;
				bcActionList.alInit(bcSfFilterParams, bcAlParams);
			} else {
				bcActionList.alInit();
			}
		}
	}
	/* end-initialize-bc-al */
	var productSelector = jQ(this.selector.products);
	if (this.queryParams.display == 'list') {
		if (productSelector.children('.list-view-items').length == 0) {
			productSelector.children().wrapAll('ul class="list-view-items"/>');
		}
		productSelector.removeClass('grid grid--uniform grid--view-items');
	} else {
		if (productSelector.children('.list-view-items').length > 0) {
			productSelector.children('.list-view-items').children().unwrap();
		}
		productSelector.addClass('grid grid--uniform grid--view-items');
	}
};

function resizable(el, factor) {
	var int = Number(factor) || 7.7;

	function resize() {
		if (el != null) {
			el.style.maxWidth = ((el.value.length + 1) * int) + 'px';
		}
	}

	var e = 'keyup,keypress,focus,blur,change,input,onchange'.split(',');
	for (var i in e) {
		if (el != null) {
			el.addEventListener(e[i], resize, false);
		}
	}
	resize();
}
var firstInit =true;

// Build Additional Elements
BCSfFilter.prototype.buildAdditionalElements = function (data, eventType) {

	var totalProduct = '';
	if (data.total_product == 1) {
		totalProduct = bcSfFilterConfig.label.items_with_count_one.replace(/{{ count }}/g, data.total_product);
	} else {
		totalProduct = bcSfFilterConfig.label.items_with_count_other.replace(/{{ count }}/g, data.total_product);
	}
	jQ('#bc-sf-filter-total-product').html(totalProduct);
	var sortText = jQ('.filters-toolbar__input--sort').find("option:selected").text();
	if(!firstInit) {
		jQ('.filters-dropdown__title').text(sortText);
	}
	var sortValue = jQ('.filters-toolbar__input--sort').val();
	jQ('.filters-dropdown__item').removeClass('filters-dropdown__item--select');
	jQ('.filters-dropdown__item[data-value="' + sortValue + '"]').addClass('filters-dropdown__item--select');
	jQ('.filters-dropdown__item').on('click', function (e) {
		e.preventDefault();
		jQ('.filters-dropdown__item').removeClass('filters-dropdown__item--select');
		jQ(this).addClass('filters-dropdown__item--select');
		jQ('.filters-toolbar__input--sort').val(jQ(this).attr('data-value')).trigger('change');
		jQ('.filters-dropdown__title').text(jQ(this).text());
	});
	if (jQ('.bc-sf-filter-clear-all').length > 0) {
		jQ('.filter__clear-wrapper').addClass('filter__clear-wrapper--is-show');
	} else {
		jQ('.filter__clear-wrapper').removeClass('filter__clear-wrapper--is-show');
	}
	resizable(document.querySelector('.bc-sf-filter-option-range-amount-max'), 7);
	resizable(document.querySelector('.bc-sf-filter-option-range-amount-min'), 7);


	//Add animation
	// var elements =  document.querySelectorAll("#bc-sf-filter-products .product-card");
	// for (let i = 0; i < elements.length; i++) {
	// 	checkBlocksPosition(elements[i]);
	// }
	// jQ(window).scroll(function(){
	// for (let i = 0; i < elements.length; i++) {
	// 	checkBlocksPosition(elements[i]);
	// }});
	// setTimeout(function () {
	// 	if ($(window).width() > 1023) {
	// 		$('.page-view').height(($('.page-view__scroll-content').outerHeight() + $('.footer').outerHeight() + $('.header').outerHeight()));
	// 	} else {
	// 		$('.page-view').height('auto');
	// 	}
	// },200);
	firstInit=false;
	jQ('#bc-sf-filter-products').css('opacity',1);
	jQ('#bc-sf-filter-tree').addClass('is-show');
	jQ('.filter__header').addClass('is-show');
	jQ('.filter__list-view').addClass('is-show');

	Currency.convertAll(theme.defaultCurrency, Currency.currentCurrency);
}
// function checkBlocksPosition(element) {
// 	if (element.getBoundingClientRect().top - window.innerHeight <= 0 ) {
// 		element.classList.add("animated-block--visible");
// 	}
// }

// Build Default layout
function buildDefaultLink(a, b) {
	var c = window.location.href.split("?")[0];
	return c += "?" + a + "=" + b
}

BCSfFilter.prototype.buildDefaultElements = function (a) {
	if (bcSfFilterConfig.general.hasOwnProperty("collection_count") && jQ("#bc-sf-filter-bottom-pagination").length > 0) {
		var b = bcSfFilterConfig.general.collection_count, c = parseInt(this.queryParams.page),
			d = Math.ceil(b / this.queryParams.limit);
		if (1 == d) return jQ(this.selector.pagination).html(""), !1;
		if ("default" == this.getSettingValue("general.paginationType")) {
			var e = bcSfFilterTemplate.paginateHtml, f = "";
			f = c > 1 ? bcSfFilterTemplate.hasOwnProperty("previousActiveHtml") ? bcSfFilterTemplate.previousActiveHtml : bcSfFilterTemplate.previousHtml : bcSfFilterTemplate.hasOwnProperty("previousDisabledHtml") ? bcSfFilterTemplate.previousDisabledHtml : "", f = f.replace(/{{itemUrl}}/g, buildDefaultLink("page", c - 1)), e = e.replace(/{{previous}}/g, f);
			var g = "";
			g = c < d ? bcSfFilterTemplate.hasOwnProperty("nextActiveHtml") ? bcSfFilterTemplate.nextActiveHtml : bcSfFilterTemplate.nextHtml : bcSfFilterTemplate.hasOwnProperty("nextDisabledHtml") ? bcSfFilterTemplate.nextDisabledHtml : "", g = g.replace(/{{itemUrl}}/g, buildDefaultLink("page", c + 1)), e = e.replace(/{{next}}/g, g);
			for (var h = [], i = c - 1; i > c - 3 && i > 0; i--) h.unshift(i);
			c - 4 > 0 && h.unshift("..."), c - 4 >= 0 && h.unshift(1), h.push(c);
			for (var j = [], k = c + 1; k < c + 3 && k <= d; k++) j.push(k);
			c + 3 < d && j.push("..."), c + 3 <= d && j.push(d);
			for (var l = "", m = h.concat(j), n = 0; n < m.length; n++) "..." == m[n] ? l += bcSfFilterTemplate.pageItemRemainHtml : l += m[n] == c ? bcSfFilterTemplate.pageItemSelectedHtml : bcSfFilterTemplate.pageItemHtml, l = l.replace(/{{itemTitle}}/g, m[n]), l = l.replace(/{{itemUrl}}/g, buildDefaultLink("page", m[n]));
			e = e.replace(/{{pageItems}}/g, l), jQ(this.selector.pagination).html(e)
		}
	}
	if (bcSfFilterTemplate.hasOwnProperty("sortingHtml") && jQ(this.selector.topSorting).length > 0) {
		jQ(this.selector.topSorting).html("");
		var o = this.getSortingList();
		if (o) {
			var p = "";
			for (var q in o) p += '<option value="' + q + '">' + o[q] + "</option>";
			var r = bcSfFilterTemplate.sortingHtml.replace(/{{sortingItems}}/g, p);
			jQ(this.selector.topSorting).html(r);
			var s = void 0 !== this.queryParams.sort_by ? this.queryParams.sort_by : this.defaultSorting;
			jQ(this.selector.topSorting + " select").val(s), jQ(this.selector.topSorting + " select").change(function (a) {
				window.location.href = buildDefaultLink("sort_by", jQ(this).val())
			})
		}
	}
};

// Customize data to suit the data of Shopify API
BCSfFilter.prototype.prepareProductData = function (data) {
	for (var k = 0; k < data.length; k++) {
		data[k]['images'] = data[k]['images_info'];
		if (data[k]['images'].length > 0) {
			data[k]['featured_image'] = data[k]['images'][0]
		} else {
			data[k]['featured_image'] = {
				src: bcSfFilterConfig.general.no_image_url,
				width: '',
				height: '',
				aspect_ratio: 0
			}
		}
		data[k]['url'] = '/products/' + data[k].handle;
		var optionsArr = [];
		for (var i = 1; i < data[k]['options_with_values'].length; i++) {
			optionsArr.push(data[k]['options_with_values'][i]['name'])
		}
		data[k]['options'] = optionsArr;
		data[k]['price_min'] *= 100, data[k]['price_max'] *= 100, data[k]['compare_at_price_min'] *= 100, data[k]['compare_at_price_max'] *= 100;
		data[k]['price'] = data[k]['price_min'];
		data[k]['compare_at_price'] = data[k]['compare_at_price_min'];
		data[k]['price_varies'] = data[k]['price_min'] != data[k]['price_max'];
		var firstVariant = data[k]['variants'][0];
		if (getParam('variant') !== null && getParam('variant') != '') {
			var paramVariant = data.variants.filter(function (e) {
				return e.id == getParam('variant')
			});
			if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0]
		} else {
			for (var i = 0; i < data[k]['variants'].length; i++) {
				if (data[k]['variants'][i].available) {
					firstVariant = data[k]['variants'][i];
					break
				}
			}
		}
		data[k]['selected_or_first_available_variant'] = firstVariant;
		for (var i = 0; i < data[k]['variants'].length; i++) {
			var variantOptionArr = [];
			var count = 1;
			var variant = data[k]['variants'][i];
			var variantOptions = variant['merged_options'];
			if (Array.isArray(variantOptions)) {
				for (var j = 0; j < variantOptions.length; j++) {
					var temp = variantOptions[j].split(':');
					data[k]['variants'][i]['option' + (parseInt(j) + 1)] = temp[1];
					data[k]['variants'][i]['option_' + temp[0]] = temp[1];
					variantOptionArr.push(temp[1])
				}
				data[k]['variants'][i]['options'] = variantOptionArr
			}
			data[k]['variants'][i]['compare_at_price'] = parseFloat(data[k]['variants'][i]['compare_at_price']) * 100;
			data[k]['variants'][i]['price'] = parseFloat(data[k]['variants'][i]['price']) * 100
		}
		data[k]['description'] = data[k]['content'] = data[k]['body_html']
	}
	return data
};

BCSfFilter.prototype.buildProductList = function (a, b) {
	(0 == this.loadProductFirst || this.isSearchPage() || this.isVendorPage() || this.isTagPage() || "best-selling" == this.defaultSorting || 1 == this.getSettingValue("general.productAndVariantAvailable") || 1 == this.loadProductFirst && ("init" != b || window.location.search.length > 0)) && (a = this.prepareProductData(a),
		this.buildProductListData(a, b),
		this.buildExtrasProductList(a, b));
	$.each(a, function(index, product)  {
		window.theme.products[product.id] = product;
	});
	$(document).trigger('bcsf-list-refresh', {products: a});
}
