$(function () {
  var $html = $('html');

	$('.js-go-to').on('click', function (e) {
		e.preventDefault();
		var $el = $($(this).attr('href'));
    var $self = $(this);
		if ($el.length > 0) {
			var scrollTop = ($el.offset().top - $('.header').outerHeight() + 40);
			if ($(this).parents('.about-section--navigation').length > 0 ) {
        scrollTop = ($el.offset().top - $('.header__inner').outerHeight() + 1);

        if ($html.hasClass('is-phone') && !$self.hasClass('is--hover')) {
          $('.about-navigation__item').removeClass('is--hover');
          $self.addClass('is--hover');
          $(document).one('click', function() {
            $self.removeClass('is--hover');
          });
          return false;
        }
			}
			else {
				if ($(this).parents('.about-section--hero').length > 0) {
					scrollTop = ($el.offset().top - 80);
				}
			}
			$("html, body").animate({
				scrollTop: scrollTop
			}, 500);
		}
	});

});
