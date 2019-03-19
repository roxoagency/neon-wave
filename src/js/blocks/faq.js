
$(function () {
	$('.js-faq-toogle').on('click', function (e) {
		e.preventDefault();
		var parent = $(this).parent();
		parent.find('.faq__content').slideToggle(300);
		parent.toggleClass('faq--open')
	});

});