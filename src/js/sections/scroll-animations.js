/**
 * Animations  Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the  Animations.
 *
 * @namespace animations
 */

import {register} from '@shopify/theme-sections';
import Scrollbar from 'smooth-scrollbar';
import {AnimatedBlock} from '../blocks/animated';

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();


class NativeScroll {
  constructor() {
    this.offset = {
      x: 0,
      y: document.body.scrollTop + document.documentElement.scrollTop,
    };
    this.limit = {
      x: 0,
      y: document.documentElement.scrollHeight - document.documentElement.clientHeight,
    };
    this.listeners = [];
    this.initialized = false;
  }

  init() {
    if (this.initialized) {
      return false;
    }
    this.scrollHandlerInstance = this.scrollHandler.bind(this);

    this.initialized = true;
    window.addEventListener('scroll', this.scrollHandlerInstance);
  }

  scrollHandler(e) {
    const status = {
      offset: {
        x: 0,
        y: document.body.scrollTop + document.documentElement.scrollTop,
      },
      limit: {
        x: 0,
        y: document.documentElement.scrollHeight - document.documentElement.clientHeight,
      }
    };

    this.offset = status.offset;
    this.limit = status.limit;

    requestAnimationFrame(() => {
      for (const listener of this.listeners) {
        if (typeof listener === 'function') {
          listener(status);
        }
      }
    })
  }

  scrollTo() {

  }

  addListener(handler) {
    if (typeof handler === 'function') {
      this.listeners.push(handler);
    }
  }

  destroyAll() {
    this.listeners = [];
    window.removeEventListener('scroll', this.scrollHandlerInstance);
  }
}

const selectors = {
	stickyBreadcrumb: '.breadcrumb--product',
	stickyWrapper: '.product-single__meta',
	parallax: '.ui-paralax',
  siteHeader: '[data-section-id="site-header"]',
  barLineSelector: '.js--progress-line',
  siteMain: 'main[role="main"]',
  siteFooter: '[data-section-id="footer"]',
  siteFooterContent: '.footer__content',
  stickyElements: '.is-sticky',
  stickySections: '.is-section-sticky',
  parallaxSections: '.about-section__bg--parallax',
};
const cssClasses = {
	stickyShow: 'breadcrumb--show'
};
var $stickyElem = $(selectors.stickyBreadcrumb);
var $elem = $(selectors.stickyWrapper);
var $parallax = $(selectors.parallax);

register('scroll-animations', {
  onLoad() {
    this.useCustomScroll = !($('body').hasClass('use-native-scroll'));
    this.$container = $(this.container);
    this.namespace = `.${this.id}`;
    this.mainContainer = $(selectors.siteMain);
    this.headerBarLine = $(selectors.barLineSelector);
    this.uiParallax = $(selectors.parallaxSections);
    this.initialized = false;
    this.resizeObservers = [];
    this.resizeTimer;

    if ($(window).width() > 1023) {
      this.initAnimations();
    }

    this.initSearchAnimation();
    this.initModals();
    this.initAnimatedBlocks();
    this.observeResize();

    document.querySelector('.currency-switcher__list').addEventListener('wheel', (e) => {
      e.stopImmediatePropagation();
      e.stopPropagation();
    });
  },

  observeResize() {
    $(window).resize(() => {
      clearTimeout(this.resizeTimer);

      this.resizeTimer = setTimeout(() => {
        if ($(window).width() > 1023 && !this.initialized) {
          this.initAnimations();
        } else if ($(window).width() <= 1023 && this.initialized) {
          this.destroyAnimations();
        }

        if (this.initialized) {
          $.each(this.resizeObservers, (index, observer) => {
            if (typeof observer === 'function') {
              observer();
            }
          });
        }
      }, 200);
    });
  },

  initAnimations() {
    $('body').on('scrollToTop', () => {
      this.scrollbar.scrollTo(0, 0, 500);
    });

    this.initialized = true;

    if (this.useCustomScroll) {
      this.scrollbar = Scrollbar.init(this.container, {
        damping: 0.08,
        continuousScrolling: true,
        delegateTo: $('body')[0],
      });
      this.scrollbar.addListener((status) => {
        $('body').trigger('nwscroll', status);
      });
    } else {
      this.scrollbar = new NativeScroll();
      this.scrollbar.init();
    }

    this.lastKnownScrollPosition = this.scrollbar.offset.y;

    if (this.useCustomScroll) {
      this.initHeaderAnimations();
      this.initSinglePostNav();
    }

    this.initFooterAnimations();
    this.initStickySections();
    this.initStickyBlocks();
    this.initParallax();
    this.getCache();
    this.parallaxEffectInit();
    this.initStickyForm();
  },

  destroyAnimations() {
    $('body').off('scrollToTop');

    this.initialized = false;

    this.resizeObservers = [];
    this.lastKnownScrollPosition = 0;

    if (this.scrollbar) {
      if (this.useCustomScroll) {
        Scrollbar.destroyAll();
      } else {
        this.scrollbar.destroyAll();
      }
    }

    if (this.headerContainer) {
      this.headerContainer.removeClass('header--sticky-totop header--sticky header--sticky-go-top');
    }

    if (this.footerContainer) {
      this.footerContainer.removeClass('footer--animated');
      this.footerContent.css({
        transform: '',
        opacity: '',
      });
    }

    this.mainContainer.css({
      marginBottom: '',
    });

    if (this.stickySections) {
      this.stickySections.css({
        transform: '',
      });
    }

    const stickyBlocks = $('[data-sticky]');
    stickyBlocks.each((index, block) => {
      $(block).css({
        transform: '',
      }).removeClass('is--sticky').unwrap();
    });

    this.uiParallax.css({
      backgroundPosition: '',
    });

    if (this.stickySections) {
      $parallax.css({
        transform: '',
      });
    };
  },

  initHeaderAnimations() {
    this.headerContainer = $(selectors.siteHeader);

    if (!this.headerContainer.length) return;

    this.scrollbar.addListener((status) => {
      const scrollY = status.offset.y;
      const limitY = status.limit.y;

      this.headerBarLine.css({
        right: `${(100 - ((scrollY / limitY) * 100).toFixed(2))}%`,
      });

      if (scrollY > 1 && !this.headerContainer.hasClass('header--sticky-totop')) {
        this.headerContainer.addClass('header--sticky-totop');
      } else if (scrollY <= 1 && this.headerContainer.hasClass('header--sticky-totop')) {
        this.headerContainer.removeClass('header--sticky-totop');
      }

      if (scrollY > 10 && !this.headerContainer.hasClass('header--sticky')) {
				this.headerContainer.addClass('header--sticky');
			} else if (scrollY <= 10 && this.headerContainer.hasClass('header--sticky')) {
				this.headerContainer.removeClass('header--sticky');
      }

      if (this.lastKnownScrollPosition > scrollY && !this.headerContainer.hasClass('header--sticky-go-top')) {
				this.headerContainer.addClass('header--sticky-go-top');
			} else if (this.lastKnownScrollPosition < scrollY && this.headerContainer.hasClass('header--sticky-go-top')) {
				this.headerContainer.removeClass('header--sticky-go-top');
      }

      this.lastKnownScrollPosition = scrollY;
    });
  },

  initFooterAnimations() {
    this.footerContainer = $(selectors.siteFooter);
    this.footerContent = $(selectors.siteFooterContent, this.footerContainer);

    if (!this.footerContainer.length) return;

    if (
      this.footerContainer.hasClass('footer--no-parallax')
      || ($('body').hasClass('swym-hosted-page') || window.location.href.indexOf('swymWishlist') !== -1)
    ) {
      this.footerContainer.appendTo($('.main-page', this.container));
      return;
    }

    let footerHeight = this.footerContainer.height();

    this.footerContainer.addClass('footer--animated');
    this.mainContainer.css({
      marginBottom: (footerHeight - 3),
    });

    this.resizeObservers.push(() => {
      footerHeight = this.footerContainer.height();
      this.mainContainer.css({
        marginBottom: footerHeight,
      });
    })

    this.scrollbar.addListener((status) => {
      const scrollY = status.offset.y;
      const limitY = status.limit.y;

      if ((limitY - scrollY) <= footerHeight) {
        let percent = (((limitY - scrollY) / footerHeight) * 100).toFixed(2);
        const transform = ((50 / 100) * percent).toFixed(2);
        let opacity = ((1.2 / 100) * Math.abs(percent - 100)).toFixed(2);

        if (opacity > 1) {
          opacity = 1;
        }

        if (opacity < 0.2) {
          opacity = 0.2;
        }

        this.footerContent.css({
          transform: `translate3d(0, ${transform}%, 0)`,
          opacity,
        });
      }
    });
  },

  initStickySections() {
    this.stickySections = $(selectors.stickySections);

    if (!this.stickySections.length) return;

    this.stickySections.each((index, section) => {
      const $section = $(section);
      let sectionRect = section.getBoundingClientRect();
      let sectionParentRect = section.parentElement.getBoundingClientRect();
      let windowHeight = window.innerHeight;
      let yPos = 0;

      const inView = () => {
        sectionRect = section.getBoundingClientRect();
        sectionParentRect = section.parentElement.getBoundingClientRect();
        return (sectionParentRect.top < windowHeight && sectionParentRect.bottom > 0);
      };

      this.resizeObservers.push(() => {
        sectionRect = section.getBoundingClientRect();
        sectionParentRect = section.parentElement.getBoundingClientRect();
        windowHeight = window.innerHeight;
      });

      const translate = (transform) => {
        yPos = transform;
        $section.css({
          transform: 'translate3d(0, ' + transform.toFixed(2) + 'px, 0)',
        });
      };

      this.scrollbar.addListener((status) => {
        sectionRect = section.getBoundingClientRect();
        sectionParentRect = section.parentElement.getBoundingClientRect();
        // if (inView()) {
          if ((windowHeight) < sectionRect.height) {
            if (sectionParentRect.bottom <= windowHeight) {
              translate(Math.abs(sectionParentRect.bottom - windowHeight));
            }
          } else {
            if (sectionParentRect.top <= 0) {
              translate(Math.abs(sectionParentRect.top));
            } else if (yPos > 0) {
              translate(0);
            }
          }
        // }
      });
    });
  },

  initAnimatedBlocks() {
		// this.initSearchAnimation();
		const elements = document.querySelectorAll('.animated-block');
		for (let i = 0; i < elements.length; i++) {
			new AnimatedBlock(elements[i]);
		}
		const pages = document.querySelectorAll('.animated-pages');
		for (let i = 0; i < pages.length; i++) {
			new AnimatedBlock(pages[i]);
		}
  },

  initStickyBlocks() {
    const $blocks = $('[data-sticky]');
    const $header = $('.header__inner');

    if (!$blocks.length) return;

    $blocks.each((index, block) => {
      if ($(block).closest('[data-sticky-wrapper]').length) {
        $(block).unwrap();
      }
      const $blockWrap = $(block).wrap('<div data-sticky-wrapper/>').parent();
      $blockWrap.css({
        position: 'relative',
        height: $(block).height(),
      });
    });

    const handleBlocks = function(status) {
      const headerHeight = $header.outerHeight() - Math.abs($header.offset().top);

      $blocks.each((index, block) => {
        const parent = $(block).parent().parent();
        const parentheight = parent.height();
        const blockHeight = $(block).outerHeight(true);

        if (blockHeight > parentheight) {
          return;
        }

        const offset = $(block).parent().get(0).getBoundingClientRect();
        const maxTransform = parentheight - blockHeight;

        if ((offset.top - headerHeight) <= 0) {
          const transform = Math.abs(offset.top - headerHeight).toFixed(2);

          if (transform <= maxTransform) {
            $(block).css({
              transform: `translate3d(0, ${Math.abs(offset.top - headerHeight).toFixed(2)}px, 0)`,
            }).addClass('is--sticky');
          }
        } else if ($(block).hasClass('is--sticky')) {
          $(block).css({
            transform: '',
          }).removeClass('is--sticky');
        }
      });
    };

    this.scrollbar.addListener(handleBlocks.bind(this));
  },

  initParallax() {
    this.uiParallax.each((index, el) => {
      let elRect = el.getBoundingClientRect();
      const headerHeight = 81;
      let orientation = el.dataset.orientation || 'horizontaly';

      this.scrollbar.addListener((status) => {
        elRect = el.getBoundingClientRect();

        if ((elRect.top - headerHeight) <= 0 && (elRect.bottom - headerHeight >= 0)) {
          const percent = 100 - (((elRect.bottom - headerHeight) / elRect.height) * 100).toFixed(2);
          if (orientation === 'horizontaly') {
            $(el).css('background-position', percent + '% center');
          } else {
            $(el).css('background-position', 'center ' + percent + '%');
          }
        }
      });
    });
  },

  getCache() {
		var self = this;
		// parallax element cache
    this.parallax = [];
    const windowHeight = window.innerHeight;

		$parallax.each((index, el) => {
			var multiply = el.getAttribute('data-multiply') || '1';
			var speed = el.getAttribute('data-speed') || '-0.02';//1
			var bounding = el.getBoundingClientRect();
			var start = el.hasAttribute('data-start') ? this.percentToPixel('start', el.getAttribute('data-start'), bounding.height) : false;
			var type = 'parallax';
			var parentBounding = el.parentNode.getBoundingClientRect();
			var end = el.hasAttribute('data-end') ? el.getAttribute('data-end') == 'parent' ? parseFloat(parentBounding.bottom - bounding.bottom) : this.percentToPixel('end', el.getAttribute('data-end'), bounding.height) : false;
			var bounds = {
				el: el,
				breakpoint: el.hasAttribute('data-breakpoint') ? el.getAttribute('data-breakpoint') : false,
				parent: el.parentNode,
				bounding: bounding,
				parentBottom: parentBounding.bottom + this.scrollbar.offset.y,
				parentTop: parentBounding.top + this.scrollbar.offset.y,
				state: true,
				top: el.hasAttribute('data-end') && el.getAttribute('data-end') == 'parent' ? parentBounding.top + this.scrollbar.offset.y : bounding.top + this.scrollbar.offset.y - windowHeight,
				bottom: el.hasAttribute('data-end') && el.getAttribute('data-end') == 'parent' ? parentBounding.bottom + this.scrollbar.offset.y : bounding.bottom + this.scrollbar.offset.y,
				height: bounding.height,
				multiply: parseFloat(multiply),
				speed: parseFloat(speed),
				start: start,
				end: end,
				endOffset: this.getEndOffset(el),
				bottomOffset: this.getBottomOffset(el),
				type: type,
				// lazy: el.hasAttribute('data-component') && el.getAttribute('data-component') === 'lazy' && !(0, _core.$)(el).hasClass('prevent-lazyload') ? (0, _core.$)(el).data('lazy') : undefined,
				lerp: 0
			};

			self.parallax[self.parallax.length] = bounds;
		});
  },

  parallaxEffectInit() {
    if (this.parallax === undefined) return;

    let windowHeight = window.innerHeight;


    this.scrollbar.addListener((status) => {
      const scrollY = status.offset.y;

      for (var index = this.parallax.length - 1; index >= 0; index--) {
        var cache = this.parallax[index];
        var top = Math.round(cache.top - scrollY);
        var bottom = Math.round(cache.bottom - scrollY);
        var inview = top < windowHeight && bottom > 0;
        if (cache.type == 'parallax' && inview) {
          if (typeof cache.end == 'number' && typeof cache.start == 'number') {
            // const t = utils.js.constrain(utils.js.mapRange([0, cache.bottom - cache.top], [cache.start, cache.end], scrollY), cache.start, cache.end);
            var t = this.constrain(this.mapRange([0, cache.bottom - cache.endOffset], [cache.start, cache.end - cache.bottomOffset], scrollY), cache.start, cache.end - cache.bottomOffset);
            cache.el.style.transform = 'translate3d(0,' + (((t.toFixed(2) * (-1))) * cache.multiply) + 'px,0)';
          } else {
            var _t = scrollY * cache.speed;
            cache.el.style.transform = 'translate3d(0,' + _t.toFixed(2) + 'px,0)';
          }
        }
      }
    });
	},

  initModals() {
		$('.modal').each(function () {
			const modal = $(this).clone();
			$('body').append(modal);
			$(this).remove();
		});
	},

	initStickyForm() {
    if ($elem.length > 0) {
      this.scrollbar.addListener((status) => {
        const scrollY = status.offset.y;
        var scrollTop = scrollY;
        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();
        if (elemBottom < scrollTop) {
          $stickyElem.addClass(cssClasses.stickyShow);
        } else {
          $stickyElem.removeClass(cssClasses.stickyShow);
        }
      });
    }
  },

	shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	},
	initSearchAnimation(){
		if(	$('.search-page__title-text--top').length>0) {
			const data=$('.search-page__title-text--top .counter-el__digit').text().split('');
			let text ='';
			for (let j = 0; j < data.length; j++) {
				const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

				const newArr = (this.shuffle(arr));
				text += '<span class="counter-el__digit"><span class="counter-el__digit-spacer">2</span>' +
					'<span class="counter-el__digit-inner">' +
					'<span class="counter-el__ribbon">' +
					'<span class="counter-el__ribbon-inner">' +
					'<span class="counter-el__value">&nbsp</span>';
				let count = parseInt(data[j]);
				for (let i = 0; i < newArr.length; i++) {
					if (newArr[i] != count) {
						text += '<span class="counter-el__value">' + newArr[i] + '</span>';
					}
				}
				text += '<span class="counter-el__value counter-el__last-value">' + count + '</span>' +
					'</span>' +
					'</span>' +
					'</span>' +
					'</span>';
			}

			$('.search-page__title-text--top').html(text);
		}
	},

	// onLoad() {
	// 	this.$container = $(this.container);
	// 	this.namespace = `.${this.id}`;
	// 	if (!$('body').hasClass('no-custom-scroll')) {
	// 		if ($(window).width() > _config2.default.breakpoints.medium && !_config2.default.is.mobile() && !_config2.default.is.tablet()) {
	// 			this.stickyElements = $('.is-sticky');
	// 			if (this.stickyElements.length > 0) this.stickyElements.css({transform: 'none'});
	// 			this.stickyAboutElements = $('.is-section-sticky');
	// 			if (this.stickyAboutElements.length > 0) this.stickyAboutElements.css({transform: 'none'});
	// 			this.stickyFooterElements = $('.footer:not(.footer--no-parallax) .footer__content');
	// 			if (this.stickyFooterElements.length > 0) this.stickyFooterElements.css({transform: 'none'});
	// 			this.animatedElements = $('.animated-block');
	// 			if (this.animatedElements.length > 0) this.animatedElements.css({transform: 'none'});
	// 			this.setPageHeight();
	// 			this.uiParallax = $('.about-section__bg--parallax');
	// 			_rafScroll2.default.add(this.momentumScroll.bind(this));
	// 			if ($('.is-safari .page-view').hasClass('template-index') ) {
	// 				$(window).load(() => {
	// 					this.initStickyAboutEl();
	// 				});
	// 			}else{
	// 				this.initStickyAboutEl();
	// 			}
	// 			this.initStickyEl();
	// 			this.initBgAboutEffect();
	// 			this.initStickyFooter();
	// 			this.initModal();
  //       this.getCache();
  //       // this.initStickyBlocks();

	// 		}
	// 		//
	// 		this.onPageLoad();
	// 		this.onResize();
	// 	}
	// 	this.initAnimation();

  // },
  //
	percentToPixel(pos, value, elHeight) {
		if (value.indexOf('%') > -1) {
			return elHeight / 100 * parseInt(value);
		} else {
			return parseFloat(value);
		}
	},
	getEndOffset(el) {
    var offset = 0;
    let windowHeight = window.innerHeight;
    let windowWidth = document.body.clientWidth || document.documentElement.offsetWidth || window.innerWidth;

		if (el.hasAttribute('data-end-offset')) {
			var dataOffset = el.getAttribute('data-end-offset');

			if (dataOffset.indexOf('col') > -1) {
				offset = windowWidth / 24 * parseInt(dataOffset.replace('col', ''));
			} else if (dataOffset.indexOf('window_height') > -1) {
				dataOffset.replace('window_height', windowHeight - this.footerHeight);
			} else {
				offset = dataOffset;
			}
    }

    return offset;
  },

	getBottomOffset(el) {
    var offset = 0;

    let windowHeight = window.innerHeight;
    let windowWidth = document.body.clientWidth || document.documentElement.offsetWidth || window.innerWidth;

		if (el.hasAttribute('data-bottom-offset')) {
			var dataOffset = el.getAttribute('data-bottom-offset');

			if (dataOffset.indexOf('col') > -1) {
				offset = windowWidth / 24 * parseInt(dataOffset.replace('col', ''));
			} else if (dataOffset.indexOf('window_height') > -1) {
				offset = dataOffset.replace('window_height', windowHeight - this.footerHeight);
			} else {
				offset = dataOffset;
			}
		}

		return offset;
  },
  constrain: function (t, e, i) {
		return Math.min(i, Math.max(e, t))
	},
	mapRange: function (t, e, i) {
		return e[0] + (i - t[0]) * (e[1] - e[0]) / (t[1] - t[0])
  },

  initSinglePostNav() {
    const navEl = $('.single-post__nav-text, .single-post__nav-item');

    if (navEl.length) {
      this.scrollbar.addListener((status) => {
        const scrollY = status.offset.y;

        navEl.css({
          transform: `translate3d(0,${scrollY.toFixed(2)}px,0)`,
        })
      });
    }
  }
});
