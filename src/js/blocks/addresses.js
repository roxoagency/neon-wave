/**
 * Customer Addresses Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Customer Addresses
 * template.
 *
 * @namespace customerAddresses
 */

const $newAddressForm = $("#AddressNewForm");

if ($newAddressForm.length) {
	// Initialize observers on address selectors, defined in shopify_common.js
	if (Shopify) {
		new Shopify.CountryProvinceSelector(
			"AddressCountryNew",
			"AddressProvinceNew",
			{
				hideElement: "AddressProvinceContainerNew"
			}
		);
	}

	// Initialize each edit form"s country/province selector
	$(".address-country-option").each(function () {
		const formId = $(this).data("form-id");
		const countrySelector = `AddressCountry_${formId}`;
		const provinceSelector = `AddressProvince_${formId}`;
		const containerSelector = `AddressProvinceContainer_${formId}`;

		new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
			hideElement: containerSelector
		});
	});

	// Toggle new/edit address forms
	$(".address-new-toggle").on("click", () => {
		$newAddressForm.toggleClass("hide");
		$(window).trigger('resize');
	});

	$(".address-edit-toggle").on("click", function () {
		const formId = $(this).data("form-id");
		$(`#EditAddress_${formId}`).toggleClass("hide");
		$(window).trigger('resize');
	});

	$(".address-delete").on("click", function () {
		const $el = $(this);
		const formId = $el.data("form-id");
		const confirmMessage = $el.data("confirm-message");
		if (
			window.confirm(
				confirmMessage ||
				"Are you sure you wish to delete this address?"
			)
		) {
			Shopify.postLink(`/account/addresses/${formId}`, {
				parameters: {_method: "delete"}
			});
		}
		$(window).trigger('resize');
	});
	$(function () {
		var addressProvince = $('.js__address_province');
		addressProvince.selectric();
		addressProvince.on('selectric-select', function (event, element, selectric) {
			var sel = document.getElementById($(element).attr('id'));
			if ("createEvent" in document) {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("change", false, true);
				sel.dispatchEvent(evt);
			}
			else {
				sel.fireEvent("onchange");
			}
		});
		var Selectric = addressProvince.data('selectric');
		var addressCountry = $('.js__address_country');
		addressCountry.selectric();

		addressCountry.on('selectric-select', function (event, element, selectric) {
			var sel = document.getElementById($(element).attr('id'));
			if ("createEvent" in document) {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent("change", false, true);
				sel.dispatchEvent(evt);
			}
			else {
				sel.fireEvent("onchange");
			}
			Selectric.refresh();
		});
	});
}
