$(function () {
	$('.js--quantity--top').on('click', function (e) {
		e.preventDefault();
		var parent = $(this).parent('.js--quantity');
		var input = parent.find('.js--quantity-item');
		input.val(parseInt(input.val(), 10) + 1)

	});
	$('.js--quantity-bottom').on('click', function (e) {
		e.preventDefault();
		var parent = $(this).parent('.js--quantity');
		var input = parent.find('.js--quantity-item');
		var value = parseInt(input.val(), 10) - 1;
		if (value < 0) {
			value = 0;
		}
		input.val(value)
	});
});