import Scrollbar from 'smooth-scrollbar';

$(function () {
  var $html = $('html');

	$('.js-go-to').on('click', function (e) {
		e.preventDefault();
		var $el = $($(this).attr('href'));
    var $self = $(this);
    const pageScrollContent = $('[data-section-type="scroll-animations"]');

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

      if ($(window).width() > 1023 && pageScrollContent.length) {
        const page_scrollbar = Scrollbar.get(pageScrollContent[0]);

        page_scrollbar.scrollIntoView($el[0], {
          offsetTop: 81,
        });
      } else {
        $("html, body").animate({
          scrollTop: scrollTop
        }, 500);
      }

		}
	});

});
