/**
 * Animations  Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the  Animations.
 *
 * @namespace animations
 */

import {AnimatedBlock} from '../blocks/animated';
import {register} from '@shopify/theme-sections';

const _config2 = require('../blocks/config');
let rafScroll = require('raf-scroll');

function _interopRequireDefault(module) {
	const
		isCJSModule = module && module.__esModule,
		cjsStyedModule = {default: module};

	return isCJSModule
		? module
		: cjsStyedModule;
}
var scrollY = 0;
var momentumY = 0;
var biaElement = document.querySelector('.page-view__scroll');
var _rafScroll2 = _interopRequireDefault(rafScroll);
const selectors = {
	stickyBreadcrumb: '.breadcrumb--product',
	stickyWrapper: '.product-single__meta',
	parallax: '.ui-paralax',

};
const cssClasses = {
	stickyShow: 'breadcrumb--show'
};
var $stickyElem = $(selectors.stickyBreadcrumb);
var $elem = $(selectors.stickyWrapper);
var $parallax = $(selectors.parallax);


register('animations', {
	setPageHeight() {
		if ($(window).width() > _config2.default.breakpoints.medium) {
			$('.page-view').height(($('.page-view__scroll-content').outerHeight() + $('.footer:not(.footer--no-parallax)').outerHeight() + $('.header').outerHeight()));
		} else {
			$('.page-view').height('auto');
		}
	},

	initStickyEl() {
		const translate = function (scrollY, el, index) {
			const t = Math.max(0, scrollY - this.vars.sticky[index].parentTop);
			el.style.transform = 'translate3d(0, ' + t.toFixed(2) + 'px, 0)';
			this.vars.sticky[index].y = t;
		}.bind(this);
		this.stickyElements.each(function (index, el) {
			const elRect = el.getBoundingClientRect(),
				parentRect = el.parentElement.getBoundingClientRect();
			this.vars = this.vars || {};
			this.vars.sticky = this.vars.sticky || {};
			this.vars.sticky[index] = {};
			this.vars.sticky[index].height = elRect.height;
			this.vars.sticky[index].parentBottom = parentRect.bottom - scrollY;
			this.vars.sticky[index].parentTop = parentRect.top - scrollY;
			this.vars.sticky[index].y = 0;
			this.vars.sticky[index].preScrollY = 0;
			if (window.innerHeight - 81 > elRect.height) {
				this.vars.sticky[index].stickyElOnScroll = function (e) {

					var scrollY = momentumY.toFixed(2) * 1;
					var scrollTop = scrollY + 81; // header height
					var scrollBottom = scrollY + $(window).height() + 60;
					var stickyEl = this.vars.sticky[index];

					/* within parent */
					if (scrollBottom - stickyEl.height > stickyEl.parentTop && scrollTop + stickyEl.height < stickyEl.parentBottom) {
						/* scrolled down */
						if (stickyEl.preScrollY < scrollY) {
							if (scrollTop > stickyEl.parentTop + stickyEl.y) {
								translate(scrollTop, el, index);
							}
						}
						/* scrolled up */
						else if (stickyEl.preScrollY > scrollY) {
							if (scrollBottom < stickyEl.parentTop + stickyEl.y + stickyEl.height) {
								translate(scrollBottom - stickyEl.height, el, index);
							}
						}
					}

					stickyEl.preScrollY = scrollY;
				}.bind(this);

				/* Adds on scroll */
				_rafScroll2.default.add(this.vars.sticky[index].stickyElOnScroll);
			} else {
				/* Stick only to bottom */
				_rafScroll2.default.add(this.vars.sticky[index].stickyElOnScroll = function (e) {

					var scrollY = momentumY.toFixed(2) * 1;
					var scrollTop = scrollY + 81; // header height
					var scrollBottom = scrollY + $(window).height() + 60;
					var stickyEl = this.vars.sticky[index];
					if (scrollTop > stickyEl.parentTop && scrollBottom < stickyEl.parentBottom) {
						var t = Math.max(0, scrollBottom - (this.vars.sticky[index].parentTop + stickyEl.height));
						el.style.transform = 'translate3d(0, ' + t.toFixed(2) + 'px, 0)';
					}
				}.bind(this));
			}
		}.bind(this));
	},
	initStickyAboutEl() {
		var translate = function (scrollY, el, index) {
			var t = Math.max(0, scrollY - this.vars.stickyAbout[index].parentTop);
			el.style.transform = 'translate3d(0, ' + t.toFixed(2) + 'px, 0)';
			this.vars.stickyAbout[index].y = t;
		}.bind(this);
		/* Loop though every sticky element */
		this.stickyAboutElements.each(function (index, el) {
			'use strict';
			var elRect = el.getBoundingClientRect(),
				parentRect = el.parentElement.getBoundingClientRect();

			this.vars = this.vars || {};
			this.vars.stickyAbout = this.vars.stickyAbout || {};
			this.vars.stickyAbout[index] = {};

			this.vars.stickyAbout[index].height = elRect.height;
			this.vars.stickyAbout[index].parentBottom = parentRect.bottom - scrollY;
			this.vars.stickyAbout[index].parentTop = parentRect.top - scrollY;

			this.vars.stickyAbout[index].y = 0;

			this.vars.stickyAbout[index].preScrollY = 0;
			/* If window is heigher than element */
			if (window.innerHeight - 81 > elRect.height) {
				this.vars.stickyAbout[index].stickyElOnScroll = function (e) {
					var scrollY = momentumY.toFixed(2) * 1;
					var scrollTop = scrollY + 81; // header height
					var scrollBottom = scrollY + _config2.default.height;
					var stickyEl = this.vars.stickyAbout[index];
					if ((scrollTop) >= stickyEl.parentTop) {
						/* scrolled down */
						if (stickyEl.preScrollY < scrollY) {
							// if (scrollTop > stickyEl.parentTop + stickyEl.y) {
							translate(scrollTop, el, index);
							// }
						}
						/* scrolled up */
						else if (stickyEl.preScrollY > scrollY) {
							// if (scrollBottom < stickyEl.parentTop + stickyEl.y + stickyEl.height) {
							translate(scrollBottom - stickyEl.height, el, index);
							// }
						}
					}
				}.bind(this);
				//
				// 	/* Adds on scroll */
				_rafScroll2.default.add(this.vars.stickyAbout[index].stickyElOnScroll);
			} else {
				// 	/* Stick only to bottom */
				_rafScroll2.default.add(this.vars.stickyAbout[index].stickyElOnScroll = function (e) {

					var scrollY = momentumY.toFixed(2) * 1;
					var scrollTop = scrollY + 81; // header height
					var scrollBottom = scrollY + _config2.default.height;
					var stickyEl = this.vars.stickyAbout[index];

					if (scrollBottom > stickyEl.parentBottom) {
						var t = Math.max(0, scrollBottom - (this.vars.stickyAbout[index].parentTop + stickyEl.height));
						el.style.transform = 'translate3d(0, ' + t.toFixed(2) + 'px, 0)';
					}
				}.bind(this));
			}
		}.bind(this));
	},
	initStickyFooter() {
		const translate = function (scrollY, el, index) {
			const t = Math.max(0, scrollY - this.vars.stickyFooter[index].parentTop);
			el.style.transform = 'translate3d(0, ' + t.toFixed(2) + 'px, 0)';
			this.vars.stickyFooter[index].y = t;
		}.bind(this);
		this.stickyFooterElements.each(function (index, el) {
			let elRect = el.getBoundingClientRect(),
				toggle = document.querySelector('.page-view__scroll-content').getBoundingClientRect(),
				header = document.querySelector('.header').getBoundingClientRect();
			this.vars = this.vars || {};
			this.vars.stickyFooter = this.vars.stickyFooter || {};
			this.vars.stickyFooter[index] = {};
			this.vars.stickyFooter[index].height = elRect.height;
			this.vars.stickyFooter[index].toggleBottom = toggle.height + header.height;
			_rafScroll2.default.add(this.vars.stickyFooter[index].stickyElOnScroll = function (e) {
        toggle = document.querySelector('.page-view__scroll-content').getBoundingClientRect();
        this.vars.stickyFooter[index].toggleBottom = toggle.height + header.height;
				const scrollY = momentumY.toFixed(2) * 1;
				const scrollBottom = scrollY + $(window).height();
				const stickyEl = this.vars.stickyFooter[index];
				if (stickyEl.toggleBottom < scrollBottom) {
					let t = 100 + (((stickyEl.toggleBottom - scrollBottom) * 100) / (stickyEl.height));
					el.style.opacity = (1 - (t.toFixed(2) / 100) + 0.2);
					t = t * 0.5;
					if (t < 0) {
						t = 0;
					}
					el.style.transform = 'translate3d(0, ' + t.toFixed(2) + '%, 0)';
				}
			}.bind(this));
		}.bind(this));
	},
	initStickyForm() {
		if ($elem.length > 0) {
			var scrollTop = momentumY;
			var elemTop = $elem.offset().top;
			var elemBottom = elemTop + $elem.height();
			if (elemBottom < scrollTop) {
				$stickyElem.addClass(cssClasses.stickyShow).css('top', $('.header__inner').outerHeight() - $('.header__anounsment').outerHeight());
			} else {
				$stickyElem.removeClass(cssClasses.stickyShow).css('top', $('.header__inner').outerHeight() - $('.header__anounsment').outerHeight());
			}
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
	initAnimation() {
		this.initSearchAnimation();
		const elements = document.querySelectorAll(".animated-block");
		for (let i = 0; i < elements.length; i++) {
			new AnimatedBlock(elements[i]);
		}
		const pages = document.querySelectorAll(".animated-pages");
		for (let i = 0; i < pages.length; i++) {
			new AnimatedBlock(pages[i]);
		}
	},
	onLoad() {
		this.$container = $(this.container);
		this.namespace = `.${this.id}`;
		if (!$('body').hasClass('no-custom-scroll')) {
			if ($(window).width() > _config2.default.breakpoints.medium && !_config2.default.is.mobile() && !_config2.default.is.tablet()) {
				this.stickyElements = $('.is-sticky');
				if (this.stickyElements.length > 0) this.stickyElements.css({transform: 'none'});
				this.stickyAboutElements = $('.is-section-sticky');
				if (this.stickyAboutElements.length > 0) this.stickyAboutElements.css({transform: 'none'});
				this.stickyFooterElements = $('.footer:not(.footer--no-parallax) .footer__content');
				if (this.stickyFooterElements.length > 0) this.stickyFooterElements.css({transform: 'none'});
				this.animatedElements = $('.animated-block');
				if (this.animatedElements.length > 0) this.animatedElements.css({transform: 'none'});
				this.setPageHeight();
				this.uiParallax = $('.about-section__bg--parallax');
				_rafScroll2.default.add(this.momentumScroll.bind(this));
				if ($('.is-safari .page-view').hasClass('template-index') ) {
					$(window).load(() => {
						this.initStickyAboutEl();
					});
				}else{
					this.initStickyAboutEl();
				}
				this.initStickyEl();
				this.initBgAboutEffect();
				this.initStickyFooter();
				this.initModal();
        this.getCache();
        // this.initStickyBlocks();

			}
			//
			this.onPageLoad();
			this.onResize();
		}
		this.initAnimation();

  },
  initStickyBlocks() {
    const $blocks = $('[data-sticky]');
    const $header = $('.header__inner');
    let headerHeight = $header.outerHeight();
    let scrollTop =  _rafScroll2.default.getCurrent();

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

    const handleBlocks = function() {
      $blocks.each((index, block) => {
        const parentheight = $(block).parent().parent().height();
        const blockHeight = $(block).outerHeight();
        const offset = block.parentElement.getBoundingClientRect();
        headerHeight = $header.outerHeight();

        if (blockHeight >= parentheight) {
          return;
        }

        if (offset.top - headerHeight <= 0) {
          const top = Math.abs(offset.top - headerHeight);
          const bottom = blockHeight + top;

          if (bottom <= parentheight) {
            $(block).css({
              transform: `translate3d(0, ${top}px, 0)`,
            }).addClass('is--sticky');
          } else {
            $(block).css({
              transform: `translate3d(0, ${parentheight - blockHeight}px, 0)`,
            }).addClass('is--sticky');
          }

        } else if ($(block).hasClass('is--sticky')) {
          $(block).css({
            transform: '',
          }).removeClass('is--sticky');
        }

      });
    };

    _rafScroll2.default.add(handleBlocks.bind(this));

    handleBlocks();
  },
	initModal() {
		$('.modal').each(function () {
			const modal = $(this).clone();
			$('body').append(modal);
			$(this).remove();
		});
	},
	onPageLoad() {
		$(window).load(function () {
      this.setPageHeight();
      this.initStickyBlocks();
			// self.updateSticky();
		}.bind(this));
	},
	onResize() {
    let resizeTimer;
		$(window).resize(function () {
			this.setPageHeight();
      _rafScroll2.default.destroy();
      this.initStickyBlocks();

			if ($(window).width() > _config2.default.breakpoints.medium && !_config2.default.is.mobile() && !_config2.default.is.tablet()) {

        // if ($('.page-view').hasClass('template-pageabout')) {

          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            window.location.reload();
          }, 500);
        // } else {
        //   _rafScroll2.default.add(this.momentumScroll.bind(this));
        //   this.stickyElements = $('.is-sticky');
        //   if (this.stickyElements.length > 0) this.stickyElements.css({transform: 'none'});
        //   this.stickyAboutElements = $('.is-section-sticky');
        //   if (this.stickyAboutElements.length > 0) this.stickyAboutElements.css({transform: 'none'});
        //   this.stickyFooterElements = $('.footer:not(.footer--no-parallax) .footer__content');
        //   if (this.stickyFooterElements.length > 0) this.stickyFooterElements.css({
        //     transform: 'none',
        //     opacity: 1
        //   });
        //   this.initStickyFooter();
        // }
			} else {
				biaElement.style.transform = 'none';
				$parallax.each((index, el) => {
					el.style.transform = 'none';
				});
			}
		}.bind(this));
	},
	initBgAboutEffect() {
		var translate = function (scrollY, el, index) {
			var t = Math.max(0, scrollY - this.vars.parallaxAbout[index].parentTop);
			el.style.transform = 'translate3d(0, ' + t.toFixed(2) + 'px, 0)';
			this.vars.parallaxAbout[index].y = t;
		}.bind(this);
		/* Loop though every sticky element */
		this.uiParallax.each(function (index, el) {
			'use strict';
			var elRect = el.getBoundingClientRect(),
				parentRect = el.parentElement.getBoundingClientRect();
			this.vars = this.vars || {};
			this.vars.parallaxAbout = this.vars.parallaxAbout || {};
			this.vars.parallaxAbout[index] = {};
			this.vars.parallaxAbout[index].height = elRect.height;
			this.vars.parallaxAbout[index].parentBottom = parentRect.bottom - scrollY;
			this.vars.parallaxAbout[index].parentTop = parentRect.top - scrollY;
			this.vars.parallaxAbout[index].y = 0;
			this.vars.parallaxAbout[index].preScrollY = 0;
			this.vars.parallaxAbout[index].orientation = el.hasAttribute('data-orientation') ? el.hasAttribute('data-orientation') : 'horizontaly';
			this.vars.parallaxAbout[index].isFixed = $(el).data('fixed');
			_rafScroll2.default.add(this.vars.parallaxAbout[index].stickyElOnScroll = function (e) {
				var scrollY = momentumY.toFixed(2) * 1;
				var scrollTop = scrollY;
				var scrollBottom = scrollY + $(window).height();
				var stickyEl = this.vars.parallaxAbout[index];
				var isFixed = this.vars.parallaxAbout[index].isFixed;
				if ((stickyEl.parentTop-80  < scrollTop) && (stickyEl.parentBottom + $(window).height()) > scrollTop) {
					var height = stickyEl.height ;

					var scrollBg = scrollBottom - stickyEl.parentTop - $(window).height()+80;
          var bg = (scrollBg * 100) / height;

          if (isFixed) {
            bg = scrollTop - (stickyEl.parentTop - 80);
            $(el).css('background-position', 'center -' + bg + 'px');
          } else {
            if (stickyEl.orientation === 'horizontaly') {
              $(el).css('background-position', bg + '% center');
            } else {
              $(el).css('background-position', 'center ' + bg + '%');
            }
          }
				}
			}.bind(this));
		}.bind(this));
	},
	onScroll(e) {
	},
	percentToPixel(pos, value, elHeight) {
		if (value.indexOf('%') > -1) {
			return elHeight / 100 * parseInt(value);
		} else {
			return parseFloat(value);
		}
	},
	getEndOffset(el) {
		var offset = 0;

		if (el.hasAttribute('data-end-offset')) {
			var dataOffset = el.getAttribute('data-end-offset');

			if (dataOffset.indexOf('col') > -1) {
				offset = _config2.default.width / 24 * parseInt(dataOffset.replace('col', ''));
			} else if (dataOffset.indexOf('window_height') > -1) {
				dataOffset.replace('window_height', _config2.default.height - this.footerHeight);
			} else {
				offset = dataOffset;
			}
		}

		return offset;
	},

	getBottomOffset(el) {
		var offset = 0;

		if (el.hasAttribute('data-bottom-offset')) {
			var dataOffset = el.getAttribute('data-bottom-offset');

			if (dataOffset.indexOf('col') > -1) {
				offset = _config2.default.width / 24 * parseInt(dataOffset.replace('col', ''));
			} else if (dataOffset.indexOf('window_height') > -1) {
				offset = dataOffset.replace('window_height', _config2.default.height - this.footerHeight);
			} else {
				offset = dataOffset;
			}
		}

		return offset;
	},

	momentumScroll(e) {
		var scroll = window.pageYOffset;
		scrollY = scroll;
		momentumY += (scrollY - momentumY) * 0.1;
		var transform = momentumY * (-1);

		biaElement.style.transform = 'translate3d(0,' + transform.toFixed(2) + 'px,0)';
		this.initStickyForm();
		this.parallaxEffect(e);
		const navEl = $('.single-post__nav-text');
		navEl.each(function (index, el) {
			el.style.transform = 'translate3d(0,' + momentumY.toFixed(2) + 'px,0)';
		});
		const navPostEl = $('.single-post__nav-item');
		navPostEl.each(function (index, el) {
			el.style.transform = 'translate3d(0,' + momentumY.toFixed(2) + 'px,0)';
		});

	},

	// data-speed
	init() {

	},
	constrain: function (t, e, i) {
		return Math.min(i, Math.max(e, t))
	},
	mapRange: function (t, e, i) {
		return e[0] + (i - t[0]) * (e[1] - e[0]) / (t[1] - t[0])
	},


	getCache() {
		var _this7 = this;
		// parallax element cache
		this.parallax = [];

		$parallax.each(function (index, el) {
			var multiply = el.getAttribute('data-multiply') || '1';
			var speed = el.getAttribute('data-speed') || '-0.02';//1
			var bounding = el.getBoundingClientRect();
			var start = el.hasAttribute('data-start') ? _this7.percentToPixel('start', el.getAttribute('data-start'), bounding.height) : false;
			var type = 'parallax';
			var parentBounding = el.parentNode.getBoundingClientRect();
			var end = el.hasAttribute('data-end') ? el.getAttribute('data-end') == 'parent' ? parseFloat(parentBounding.bottom - bounding.bottom) : _this7.percentToPixel('end', el.getAttribute('data-end'), bounding.height) : false;
			var bounds = {
				el: el,
				breakpoint: el.hasAttribute('data-breakpoint') ? el.getAttribute('data-breakpoint') : false,
				parent: el.parentNode,
				bounding: bounding,
				parentBottom: parentBounding.bottom + scrollY,
				parentTop: parentBounding.top + scrollY,
				state: true,
				top: el.hasAttribute('data-end') && el.getAttribute('data-end') == 'parent' ? parentBounding.top + scrollY : bounding.top + scrollY - _config2.default.height,
				bottom: el.hasAttribute('data-end') && el.getAttribute('data-end') == 'parent' ? parentBounding.bottom + scrollY : bounding.bottom + scrollY,
				height: bounding.height,
				multiply: parseFloat(multiply),
				speed: parseFloat(speed),
				start: start,
				end: end,
				endOffset: _this7.getEndOffset(el),
				bottomOffset: _this7.getBottomOffset(el),
				type: type,
				// lazy: el.hasAttribute('data-component') && el.getAttribute('data-component') === 'lazy' && !(0, _core.$)(el).hasClass('prevent-lazyload') ? (0, _core.$)(el).data('lazy') : undefined,
				lerp: 0
			};

			_this7.parallax[_this7.parallax.length] = bounds;
		});
		// console.log(_this7.parallax);
	},

	getEndOffset(el) {
		var offset = 0;

		if (el.hasAttribute('data-end-offset')) {
			var dataOffset = el.getAttribute('data-end-offset');

			if (dataOffset.indexOf('col') > -1) {
				offset = _config2.default.width / 24 * parseInt(dataOffset.replace('col', ''));
			} else if (dataOffset.indexOf('window_height') > -1) {
				dataOffset.replace('window_height', _config2.default.height - this.footerHeight);
			} else {
				offset = dataOffset;
			}
		}

		return offset;
	},

	getBottomOffset(el) {
		var offset = 0;

		if (el.hasAttribute('data-bottom-offset')) {
			var dataOffset = el.getAttribute('data-bottom-offset');

			if (dataOffset.indexOf('col') > -1) {
				offset = _config2.default.width / 24 * parseInt(dataOffset.replace('col', ''));
			} else if (dataOffset.indexOf('window_height') > -1) {
				offset = dataOffset.replace('window_height', _config2.default.height - this.footerHeight);
			} else {
				offset = dataOffset;
			}
		}

		return offset;
	},

	percentToPixel(pos, value, elHeight) {
		if (value.indexOf('%') > -1) {
			return elHeight / 100 * parseInt(value);
		} else {
			return parseFloat(value);
		}
	},


	parallaxEffect: function parallaxEffect(e) {
		if (this.parallax === undefined) return;

		for (var index = this.parallax.length - 1; index >= 0; index--) {
			var cache = this.parallax[index];
			var top = Math.round(cache.top - scrollY);
			var bottom = Math.round(cache.bottom - scrollY);

			var transform = (cache.top - scrollY) * -1;
			var inview = top < _config2.default.height && bottom > 0;
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
	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	},
});
