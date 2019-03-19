
$(function(){
		var addressProvince = $('#address_province');
		addressProvince.selectric();
		addressProvince.on('selectric-select', function (event, element, selectric) {
			var sel = document.getElementById('address_province');
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
		var addressCountry = $('#address_country');
		addressCountry.selectric();

		addressCountry.on('selectric-select', function (event, element, selectric) {
			var sel = document.getElementById('address_country');
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