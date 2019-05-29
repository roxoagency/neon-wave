import $ from "jquery";

$(document).ready(function () {
	let message_timeout;
	function showMessage(message,el) {
		$(el)
			.html(message)
			.addClass('is-show');
	}

	function hideMessage() {
		$("#form-responses").removeClass('is-show');
		$("#form-responses-success").removeClass('is-show');
	}

	function register($form) {
		clearTimeout(message_timeout);
		$("#mc-embedded-subscribe").addClass('is-loading');
		$.ajax({
			type: $form.attr("method"),
			url: $form.attr("action"),
			data: $form.serialize(),
			cache: false,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			error: function (err) {
				console.log(err);
				$("#mc-embedded-subscribe").removeClass('is-loading');
			},
			success: function (data) {
				if (typeof data.msg !== "undefined") {
					showMessage('<h2>'+window.theme.strings.newsletterNotification+'</h2><p>'+data.msg+'</p>',"#form-responses-success");
					$("#mc-embedded-subscribe").removeClass('is-loading');

				}
			}
		});
	}

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	$("#mc-embedded-subscribe").on("click", function (event) {
		const $form = $(this).closest("form");
		const email = $("#mce-EMAIL").val();
		const firstname = $("#mce-FNAME").val();
		if (event) event.preventDefault();
		if (validateEmail(email) && firstname != '') {
			register($form);
		} else {
			if (!validateEmail(email) && firstname === '') {
				showMessage(window.theme.strings.validFirstName + '</br> ' + window.theme.strings.validEmail,"#form-responses");
			} else {
				if (firstname === '') {
					showMessage(window.theme.strings.validFirstName,"#form-responses");
				}
				if (!validateEmail(email)) {
					showMessage(window.theme.strings.validEmail,"#form-responses");
				}
			}
		}
	});

	$("#mce-EMAIL").on("change", function () {
		hideMessage();
	});
	$('.js-date').on('input', function() {
		this.value = this.value.replace(/[^0-9/]/g, '');
		var val =this.value;
		if(val!=''){
			$(this).parent().find('.form__placeholder').addClass('hide');
		}else{
			$(this).parent().find('.form__placeholder').removeClass('hide');
		}
		var arrayOfStrings = val.split('/');
		if(arrayOfStrings.length>0){
			$('#mce-BIRTHDAY-month').val(arrayOfStrings[0]);
		}
		if(arrayOfStrings.length>1){
			$('#mce-BIRTHDAY-day').val(arrayOfStrings[1]);
		}
		if(arrayOfStrings.length>2){
			$('#mce-BIRTHDAY-year').val(arrayOfStrings[2]);
		}
	});

});
