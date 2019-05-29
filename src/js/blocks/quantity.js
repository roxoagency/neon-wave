$(function () {
	$('.js--quantity--top').on('click', function (e) {
		e.preventDefault();
		var parent = $(this).parent('.js--quantity');
		var input = parent.find('.js--quantity-item');
		input.val(parseInt(input.val(), 10) + 1);
		if($(this).parents('.cart__row').length>0){
			$(this).parents('.cart__row').find('.js--quantity-item').val(input.val()).attr('value',input.val());
		}

	});
	$('.js--quantity-bottom').on('click', function (e) {
		e.preventDefault();
		var parent = $(this).parent('.js--quantity');
		var input = parent.find('.js--quantity-item');
		var value = parseInt(input.val(), 10) - 1;
		if (value < 0) {
			value = 0;
		}
		input.val(value);
		if($(this).parents('.cart__row').length>0){
			$(this).parents('.cart__row').find('.js--quantity-item').val(value).attr('value',value);
		}
	});
});