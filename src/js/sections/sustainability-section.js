//
/**
 * Sustainability section  Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the  Sustainability section.
 *
 * @namespace sustainability-section
 */

import {register} from '@shopify/theme-sections';

function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}



const selectors = {
	navItem: '.sustainability-nav__link',
	sectionItem: '.sustainability-section',
	header: '.header',
	goNext: '.js-sustainability-go-to',
	footer: '.footer',
};

let currentSection = 0;
let prevSection = -1;
let startAnimation = false;

function finishAnimation() {
	$('.sustainability-section[data-section-index="' + currentSection + '"]').addClass('sustainability-section--active');
	startAnimation = false;
	if (currentSection === 2) {
		$('.globe__animation').addClass('is--played');
	} else {
		$('.globe__animation').removeClass('is--played');
	}
}

register('sustainability-section', {

	initMousewheel() {
		const self = this;
		$('body').mousewheel(function (event, delta) {

			if ($(document).width() > 1023 && $('html').hasClass('is-desktop')) {
				this.deltaOfInterest = delta;
				let timeNow = new Date().getTime();

				if (startAnimation) {
					return;
				}
				if (timeNow - this.lastAnimation < this.quietPeriod + this.animationTime) {
					return;
				}
				if (this.deltaOfInterest < 0) {
					this.quietPeriod = 500;
					this.animationTime = 1100;
					this.scrollSecond = 0;

					currentSection = currentSection + 1;
					if (currentSection < 0) {
						currentSection = 0;
					}
					if (currentSection > 6) {
						currentSection = 6;
					}
					prevSection = currentSection - 1;

					self.stateSections(currentSection);
					self.stateHeader(currentSection, 'down');
					$('.sustainability-section--active').removeClass('sustainability-section--active');
					switch (currentSection) {

						case 1: {

							self.showSecondSection();
							break;
						}
						case 2: {
							self.showThirdSection();
							break;
						}
						case 3: {
							self.showFourthSection();
							break;
						}
						case 4: {
							self.showFifthSection();
							break;
						}
						case 5: {
							self.showSixthSection();
							break;
						}
						default: {

						}
					}

				} else {
					if ($('.page--sustainability').scrollTop() == 0) {
						if (currentSection === 0) {
							return;
						}
						if ($('.sustainability-section--sixth .sustainability-section__container-wrapper').scrollTop() != 0) {
							if (currentSection === 6) {
								return;
							}
						}
						$('.sustainability-section--active').removeClass('sustainability-section--active');
						currentSection = currentSection - 1;

						if (currentSection < 0) {
							currentSection = 0;
						}
						if (currentSection > 6) {
							currentSection = 6;
						}
						prevSection = currentSection - 1;
						this.lastAnimation = timeNow;

						self.stateHeader(currentSection, 'up');
						self.stateSections(currentSection);
						switch (currentSection) {
							case 0: {
								self.showFirstSection();
								break;
							}
							case 1: {
								self.showReverseSecondSection();
								break;
							}
							case 2: {
								self.showReverseThirdSection();
								break;
							}
							case 3: {
								self.showReverseFourthSection();
								break;
							}
							case 4: {
								self.showReverseFifthSection();
								break;
							}
							default: {

							}
						}

					}
				}

			} else {
				this.deltaOfInterest = delta;
				return;

			}
		});
	},
	footerAnimation() {

		const el = document.querySelector('.footer__content');
		if ($(window).width() >= 1024) {
			const footerHeight = $('.footer').innerHeight();
			const srollTop = $('.sustainability-section--sixth .sustainability-section__container-wrapper').scrollTop();
			let t = (srollTop * 100) / footerHeight;
			el.style.opacity = ((t.toFixed(2) / 100) + 0.2);
			t = t * 0.5;
			t = 47 - t;
			if (t < 0) {
				t = 0;
			}
			el.style.transform = 'translate3d(0, ' + t.toFixed(2) + '%, 0)';
		} else {
			el.style.transform = 'translate3d(0,0, 0)';
			el.style.opacity = '1';
		}
	},
	onLoad() {

		this.$container = $(this.container);
		this.namespace = `.${this.id}`;
		this.initNav();
    this.initMousewheel();

    $('body').on('scrollToTop', () => {
      prevSection = currentSection;
      const firstSection = $('#sustainability-section--first');
			currentSection = parseInt(firstSection.data('section-index'));
      this.goTo(firstSection);
    });

		let footer = $('.footer').clone();
		$('.footer').remove();
		$('.sustainability-section--sixth .sustainability-section__container-wrapper').append(footer);
		if ($(window).width() >= 1024) {
			$('.sustainability-section--sixth .sustainability-section__container-wrapper>.container').css('margin-bottom', $('.footer').innerHeight());
		} else {

			$('.sustainability-section--sixth .sustainability-section__container-wrapper>.container').css('margin-bottom', 0);
		}
		$(window).resize(() => {
			this.footerAnimation();
			if ($(window).width() >= 1024) {
				$('.sustainability-section--sixth .sustainability-section__container-wrapper>.container').css('margin-bottom', $('.footer').innerHeight());
			} else {

				$('.sustainability-section--sixth .sustainability-section__container-wrapper>.container').css('margin-bottom', 0);
			}
		});
		// $('.footer__content').removeClass('animated-block');

		$('.sustainability-section--sixth .sustainability-section__container-wrapper').scroll((e) => {
			this.footerAnimation();

		});

	},
	triggerHeader(toUp) {
		if (currentSection == 0) {
			$(selectors.header).removeClass('header--sticky');
		} else {
			$(selectors.header).addClass('header--sticky');
		}
		if (toUp) {
			$(selectors.header).addClass('header--sticky-go-top');
		} else {
			$(selectors.header).removeClass('header--sticky-go-top');
		}
	},
	getDalay(sectionIndex) {
		switch (sectionIndex) {
			case 0: {
				return 0;
			}
			case 1: {
				return 1800;
			}
			case 2: {
				return 3600;
			}
			case 3: {
				return 1600;
			}
			case 4: {
				return 1700;
			}
			case 5: {
				return 1600;
			}

			default: {
				return 0;
			}
		}
	},
	getReverseDalay(sectionIndex) {
		switch (sectionIndex) {
			case 0: {
				return 1900;
			}
			case 1: {
				return 4000;
			}
			case 2: {
				return 1600;
			}
			case 3: {
				return 1700;
			}
			case 4: {
				return 1600;
			}
			case 5: {
				return 0;
			}

			default: {
				return 0;
			}
		}
	},
	goTo($el) {
		let self = this;

		startAnimation = true;
		let currentSectionDefaut = currentSection;
		let prevSectionDefaut = prevSection;
		if (prevSection < currentSection) {
			let defaulDelay = 0;
			for (let currentSectionIndex = (prevSectionDefaut + 1); currentSectionIndex <= currentSectionDefaut; currentSectionIndex++) {
				setTimeout(function () {
					self.stateSections(currentSectionIndex);

					self.stateHeader(currentSectionIndex, 'down');
					$('.sustainability-section--active').removeClass('sustainability-section--active');
					switch (currentSectionIndex) {

						case 1: {

							self.showSecondSection();
							break;
						}
						case 2: {
							self.showThirdSection();
							break;
						}
						case 3: {
							self.showFourthSection();
							break;
						}
						case 4: {
							self.showFifthSection();
							break;
						}
						case 5: {
							self.showSixthSection();
							break;
						}
						default: {

						}
					}
				}, defaulDelay);
				defaulDelay += self.getDalay(currentSectionIndex);

			}
		} else {
			let defaulDelay = 0;
			for (let currentSectionIndex = (prevSectionDefaut - 1); currentSectionIndex >= currentSectionDefaut; currentSectionIndex--) {
				setTimeout(function () {

					self.stateHeader(currentSectionIndex, 'up');
					self.stateSections(currentSectionIndex);
					$('.sustainability-section--active').removeClass('sustainability-section--active');
					switch (currentSectionIndex) {
						case 0: {
							self.showFirstSection();
							break;
						}
						case 1: {
							self.showReverseSecondSection();
							break;
						}
						case 2: {
							self.showReverseThirdSection();
							break;
						}
						case 3: {
							self.showReverseFourthSection();
							break;
						}
						case 4: {
							self.showReverseFifthSection();
							break;
						}
						default: {

						}
					}
				}, defaulDelay);
				defaulDelay += self.getReverseDalay(currentSectionIndex);
			}

		}
	},
	showReverseThirdSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__next', 0.6, {
			opacity: '1',
			ease: Power1.easeInOut

		}, {
			opacity: '0',
			ease: Power1.easeInOut,
		});
		TweenLite.fromTo('#sustainability-section--third .sustainability-section__next', 0.6, {
			opacity: '0',
			ease: Power1.easeInOut

		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 2
		});
		TweenLite.fromTo('#sustainability-section--third .container', 1.5, {
			y: '100vh',
			ease: Power1.easeInOut

		}, {
			y: '0',
			ease: Power1.easeInOut,
			onComplete: finishAnimation
		});
		TweenLite.fromTo('#sustainability-section--third', 1.5, {
			y: '-100vh',
			ease: Power1.easeInOut

		}, {
			y: '0',
			ease: Power1.easeInOut,
		});
		TweenLite.fromTo('#sustainability-section--fourth', 1.5, {
			y: '0%',
			ease: Power1.easeInOut

		}, {
			y: '100%',
			ease: Power1.easeInOut,
		});


		// TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__snow', 1, {
		// 	left: "0%",
		// 	top: "0%",
		// 	ease: Power1.easeInOut,
		// }, {
		// 	left: "-100%",
		// 	top: "-200%",
		// 	ease: Power1.easeInOut
		//
		// });
		//Total first animation time: 1.5
	},
	showFourthSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--third .container', 1.5, {
			y: '0',
			ease: Power1.easeInOut,
		}, {
			y: '100vh',
			ease: Power1.easeInOut

		});
		TweenLite.fromTo('#sustainability-section--third', 1.5, {
			y: '0',
			ease: Power1.easeInOut,
		}, {
			y: '-100vh',
			ease: Power1.easeInOut

		});
		TweenLite.fromTo('#sustainability-section--fourth', 1.5, {
			y: '100%',
			ease: Power1.easeInOut,
		}, {
			y: '0%',
			ease: Power1.easeInOut,
			onComplete: finishAnimation

		});
		TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__next', 0.6, {
			opacity: '0',
			ease: Power1.easeInOut

		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 2
		});
		// TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__snow', 1, {
		// 	left: "-100%",
		// 	top: "-200%",
		// 	ease: Power1.easeInOut
		//
		// }, {
		// 	left: "0%",
		// 	top: "0%",
		// 	ease: Power1.easeInOut,
		// });

		//Total first animation time: 1.5
	},
	showReverseFourthSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--fifth .sustainability-section__next', 0.6, {
			opacity: '1',
			ease: Power1.easeInOut

		}, {
			opacity: '0',
			ease: Power1.easeInOut,
		});
		TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__next', 0.6, {
			opacity: '0',
			ease: Power1.easeInOut

		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 2
		});
		TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__title', 1, {
			y: "-40%",
			ease: Power1.easeInOut,
		}, {
			y: "0%",
			ease: Power1.easeInOut,
			delay: 0.8

		});
		TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__content', 1, {
			y: "-30%",
			ease: Power1.easeInOut,
		}, {
			y: "0%",
			ease: Power1.easeInOut,
			delay: 0.8

		});
		TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__image-wrapper', 1, {
			y: "-20%",
			ease: Power1.easeInOut,
		}, {
			y: "0%",
			ease: Power1.easeInOut,
			delay: 0.8

		});

		// TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__snow', 1, {
		// 	left: "100%",
		// 	top: "200%",
		// 	ease: Power1.easeInOut,
		// }, {
		// 	left: "0%",
		// 	top: "0%",
		// 	ease: Power1.easeInOut,
		// 	delay: 0.8
		//
		// });
		// TweenLite.fromTo('#sustainability-section--fourth .snow-el--xlg', 1, {
		// 	scale: 6,
		// 	opacity: 1,
		// 	ease: Power1.easeInOut,
		// }, {
		// 	scale: 1,
		// 	opacity: 0,
		// 	ease: Power1.easeInOut,
		// 	delay: 0.8
		//
		// });
		if ($(window).width() > 1023) {
			TweenLite.fromTo('#sustainability-section--fifth', 1.3, {
				y: '0%',
				opacity: '1',
				ease: Power1.easeInOut

			}, {
				y: '100%',
				opacity: '0',
				delay: 0.8,
				ease: Power1.easeInOut,
				onComplete: finishAnimation
			});
		} else {
			TweenLite.fromTo('#sustainability-section--fifth', 1.5, {
				opacity: '1',
				ease: Power1.easeInOut

			}, {
				opacity: '0',
				ease: Power1.easeInOut,
				delay: 0.8,
				onComplete: finishAnimation
			});
			TweenLite.fromTo('#sustainability-section--fifth', 0, {
				y: '0%',
				ease: Power1.easeInOut

			}, {
				y: '100%',
				ease: Power1.easeInOut,
				delay: 1.6
			});
		}
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(1)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,

		}, {
			top: "100vh",
			ease: Power1.easeInOut,
			delay: 0.4
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(2)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,
		}, {
			top: "100vh",
			ease: Power1.easeInOut,
			delay: 0.3

		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(3)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,
		}, {
			top: "100vh",
			ease: Power1.easeInOut,
			delay: 0.2

		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(4)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,
		}, {
			top: "100vh",
			ease: Power1.easeInOut,
			delay: 0.1

		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(5)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,
			// delay: 0.8
		}, {
			top: "100vh",
			ease: Power1.easeInOut,

		});

		//Total first animation time: 1.6
	},
	showFifthSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__title', 1, {
			y: "0%",
			ease: Power1.easeInOut

		}, {
			y: "-40%",
			ease: Power1.easeInOut,
		});
		TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__content', 1, {
			y: "0%",
			ease: Power1.easeInOut

		}, {
			y: "-30%",
			ease: Power1.easeInOut,
		});
		TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__image-wrapper', 1, {
			y: "0%",
			ease: Power1.easeInOut

		}, {
			y: "-20%",
			ease: Power1.easeInOut,
		});
		TweenLite.fromTo('#sustainability-section--fifth .sustainability-section__next', 0.6, {
			opacity: '0',
			ease: Power1.easeInOut

		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 2
		});
		// TweenLite.fromTo('#sustainability-section--fourth .sustainability-section__snow', 1, {
		// 	left: "0%",
		// 	top: "0%",
		// 	ease: Power1.easeInOut
		//
		// }, {
		// 	left: "100%",
		// 	top: "200%",
		// 	ease: Power1.easeInOut,
		// });
		// TweenLite.fromTo('#sustainability-section--fourth .snow-el--xlg', 1, {
		// 	scale: 1,
		// 	opacity: 0,
		// 	ease: Power1.easeInOut
		//
		// }, {
		// 	scale: 6,
		// 	opacity: 1,
		// 	ease: Power1.easeInOut,
		// });

		if ($(window).width() > 1023) {
			TweenLite.fromTo('#sustainability-section--fifth', 1.3, {
				y: '100%',
				opacity: '0',
				ease: Power1.easeInOut
			}, {
				y: '0%',
				opacity: '1',
				ease: Power1.easeInOut

			});
		} else {
			TweenLite.fromTo('#sustainability-section--fifth', 0, {
				y: '100%',
				ease: Power1.easeInOut
			}, {
				y: '0%',
				ease: Power1.easeInOut

			});
			TweenLite.fromTo('#sustainability-section--fifth', 1.5, {
				opacity: '0',
				ease: Power1.easeInOut
			}, {
				opacity: '1',
				ease: Power1.easeInOut

			});
		}

		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(1)', 0.8, {
			top: "100vh",
			ease: Power1.easeInOut,

		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.4
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(2)', 0.8, {
			top: "100vh",
			ease: Power1.easeInOut,

		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.5
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(3)', 0.8, {
			top: "100vh",
			ease: Power1.easeInOut,

		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.6
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(4)', 0.8, {
			top: "100vh",
			ease: Power1.easeInOut,

		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.7
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(5)', 0.8, {
			top: "100vh",
			ease: Power1.easeInOut,

		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.8,
			onComplete: finishAnimation
		});

		//Total first animation time: 1.6

	},
	showReverseFifthSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--fifth', 1.5, {
			y: '-100%',
			ease: Power1.easeInOut

		}, {
			y: '0%',
			ease: Power1.easeInOut
		});
		TweenLite.fromTo('#sustainability-section--sixth', 1.5, {
			y: '0%',
			ease: Power1.easeInOut

		}, {
			y: '100%',
			ease: Power1.easeInOut,
			onComplete: finishAnimation
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(1)', 0.8, {
			top: "-100vh",
			ease: Power1.easeInOut
		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.5

		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(2)', 0.8, {
			top: "-100vh",
			ease: Power1.easeInOut

		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.4
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(3)', 0.8, {
			top: "-100vh",
			ease: Power1.easeInOut,


		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.3
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(4)', 0.8, {
			top: "-100vh",
			ease: Power1.easeInOut

		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.2
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(5)', 0.8, {
			top: "-100vh",
			ease: Power1.easeInOut,

		}, {
			top: "0vh",
			ease: Power1.easeInOut,
			delay: 0.1

		});
		TweenLite.fromTo('#sustainability-section--fifth .sustainability-section__next', 0.6, {
			opacity: '0',
			ease: Power1.easeInOut

		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 2
		});
		//Total first animation time:1.5
	},
	showSixthSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--fifth', 1.5, {
			y: '0%',
			ease: Power1.easeInOut
		}, {
			y: '-100%',
			ease: Power1.easeInOut

		});
		TweenLite.fromTo('#sustainability-section--sixth', 1.5, {
			y: '100%',
			ease: Power1.easeInOut
		}, {
			y: '0%',
			ease: Power1.easeInOut,
			onComplete: finishAnimation

		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(1)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,

		}, {
			top: "-100vh",
			ease: Power1.easeInOut,
		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(2)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,
		}, {
			top: "-100vh",
			ease: Power1.easeInOut,
			delay: 0.1

		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(3)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,
		}, {
			top: "-100vh",
			ease: Power1.easeInOut,
			delay: 0.2

		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(4)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,
		}, {
			top: "-100vh",
			ease: Power1.easeInOut,
			delay: 0.3

		});
		TweenLite.fromTo('#sustainability-section--fifth .block-slider__item:nth-child(5)', 0.8, {
			top: "0vh",
			ease: Power1.easeInOut,
			// delay: 0.8
		}, {
			top: "-100vh",
			ease: Power1.easeInOut,
			delay: 0.4

		});
		//Total first animation time: 1.5
	},
	showReverseSecondSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--third .sustainability-section__next',0.6, {
			opacity: '1',
			ease: Power1.easeInOut,

		}, {
			opacity: '0',
			ease: Power1.easeInOut
		});
		TweenLite.fromTo('#sustainability-section--second .sustainability-section__next', 0.6, {
			opacity: '0',
			ease: Power1.easeInOut

		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 2
		});
		TweenLite.fromTo('#sustainability-section--second .sustainability-section__container-wrapper', 0.5, {
			opacity: '0',
			ease: Power1.easeOut

		}, {
			opacity: '1',
			delay: 3.5,
			ease: Power1.easeOut
		});
		TweenLite.fromTo('.sustainability-section__bg-bottom', 1, {
			top: '-28vh',
			ease: Power1.easeInOut

		}, {
			top: '76vh',
			ease: Power1.easeInOut,
			delay: 2.9,
			onComplete: finishAnimation
		});
		TweenLite.fromTo('#sustainability-section--third', 0, {
			y: '0%',
			ease: Power1.easeInOut

		}, {
			y: '100%',
			ease: Power1.easeInOut,
			delay: 2.9
		});
		TweenLite.fromTo('#sustainability-section--third', 1, {
			opacity: '1',
			ease: Power1.easeInOut,
			// delay: 1

		}, {
			opacity: '0',
			ease: Power1.easeInOut,
			delay: 1.9
		});
		TweenLite.fromTo('.globe__content', 1, {
			scale: 1,
			ease: Power1.easeInOut,
			// delay: 1.5
		}, {
			scale: 6,
			ease: Power1.easeInOut,
			delay: 1.1
		});
		if ($(window).width() < 1024) {
			TweenLite.fromTo('#sustainability-section--third .sustainability-section__title', 1, {
				y: '0wv',
				x: 0,
				ease: Power1.easeInOut,
				// delay: 2
			}, {
				y: '80vw',
				x: 0,
				ease: Power1.easeInOut,
				delay: 0.9

			});

			TweenLite.fromTo('#sustainability-section--third .sustainability-section__content', 1, {
				y: '0wv',
				x: 0,
				ease: Power1.easeInOut,
				// delay: 2.1
			}, {
				y: '80vw',
				x: 0,
				ease: Power1.easeInOut,
				delay: 0.8

			},);
			TweenLite.fromTo('#sustainability-section--third .sustainability-section__image-wrapper', 1, {
				y: '0wv',
				x: 0,
				ease: Power1.easeInOut,
				// delay: 2.2
			}, {
				y: '80vw',
				x: 0,
				ease: Power1.easeInOut,
				delay: 0.7
			});
		} else {
			TweenLite.fromTo('#sustainability-section--third .sustainability-section__title', 1, {
				x: '0wv',
				y: 0,
				ease: Power1.easeInOut
			}, {
				x: '60vw',
				y: 0,
				ease: Power1.easeInOut,
				delay: 0.9

			});
			TweenLite.fromTo('#sustainability-section--third .sustainability-section__content', 1, {
				x: '0wv',
				y: 0,
				ease: Power1.easeInOut,
			}, {
				x: '60vw',
				y: 0,
				ease: Power1.easeInOut,
				delay: 0.8

			});

			TweenLite.fromTo('#sustainability-section--third .sustainability-section__image-wrapper', 1, {
				x: '0wv',
				y: 0,
				ease: Power1.easeInOut
			}, {

				delay: 0.7,
				x: '60vw',
				y: 0,
				ease: Power1.easeInOut

			});

		}
		if ($(window).width() < 1024) {
			TweenLite.fromTo('.sustainability-section__clouds', 0.5, {
				top: '85vh',
				ease: Power1.easeInOut
			}, {
				top: '120vh',
				ease: Power1.easeInOut,
				delay: 0.1
				// delay: 2.8
			});
		} else {
			TweenLite.fromTo('.sustainability-section__clouds', 0.5, {
				top: '58vh',
				ease: Power1.easeInOut
			}, {
				top: '120vh',
				ease: Power1.easeInOut,
				delay: 0.1,
				// delay: 2.8
			});

		}
		TweenLite.fromTo('.sustainability-section__mountain', 0.5, {
			bottom: '600px',
			ease: Power1.easeInOut,
			// delay: 2.9
		}, {
			bottom: '-100%',
			ease: Power1.easeInOut
		});
		TweenLite.fromTo('.sustainability-section__mountain2', 0.6, {
			bottom: '600px',
			ease: Power1.easeInOut,
			// delay: 2.9
		}, {
			bottom: '-100%',
			ease: Power1.easeInOut
		});

		//Total first animation time: 3.5
	},
	showThirdSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--second .sustainability-section__container-wrapper', 0.5, {
			opacity: '1',
			ease: Power1.easeOut

		}, {
			opacity: '0',
			ease: Power1.easeOut
		});

		TweenLite.fromTo('.sustainability-section__bg-bottom', 1, {
			top: '76vh',
			ease: Power1.easeInOut
		}, {
			top: '-28vh',
			ease: Power1.easeInOut

		});
		TweenLite.fromTo('#sustainability-section--third', 0, {
			y: '100%',
			ease: Power1.easeInOut
		}, {
			y: '0%',
			ease: Power1.easeInOut

		});
		TweenLite.fromTo('#sustainability-section--third', 1, {
			opacity: '0',
			ease: Power1.easeInOut
		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 1

		});
		TweenLite.fromTo('.globe__content', 1, {
			scale: 8,
			ease: Power1.easeInOut

		}, {
			scale: 1,
			ease: Power1.easeInOut,
			delay: 1.5
		});
		TweenLite.fromTo('.sustainability-section__mountain', 0, {
			opacity: '0',
			ease: Power1.easeInOut
		}, {

			opacity: '1',
			ease: Power1.easeInOut,
			delay: 2.5
		});
		TweenLite.fromTo('.sustainability-section__mountain2', 0, {
			opacity: '0',
			ease: Power1.easeInOut
		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 2.5
		});
		if ($(window).width() < 1024) {
			TweenLite.fromTo('#sustainability-section--third .sustainability-section__title', 1, {
				y: '80vw',
				x: 0,
				ease: Power1.easeInOut

			}, {
				y: '0wv',
				x: 0,
				ease: Power1.easeInOut,
				delay: 2
			});

			TweenLite.fromTo('#sustainability-section--third .sustainability-section__content', 1, {
				y: '80vw',
				x: 0,
				ease: Power1.easeInOut

			}, {
				y: '0wv',
				x: 0,
				ease: Power1.easeInOut,
				delay: 2.1
			});
			TweenLite.fromTo('#sustainability-section--third .sustainability-section__image-wrapper', 1, {
				y: '80vw',
				x: 0,
				ease: Power1.easeInOut
			}, {
				y: '0wv',
				x: 0,
				ease: Power1.easeInOut,
				delay: 2.2
			});
		} else {
			TweenLite.fromTo('#sustainability-section--third .sustainability-section__title', 1, {
				x: '60vw',
				y: 0,
				ease: Power1.easeInOut

			}, {
				x: '0wv',
				y: 0,
				ease: Power1.easeInOut,
				delay: 2
			});
			TweenLite.fromTo('#sustainability-section--third .sustainability-section__content', 1, {
				x: '60vw',
				y: 0,
				ease: Power1.easeInOut

			}, {
				x: '0wv',
				y: 0,
				ease: Power1.easeInOut,
				delay: 2.1
			});

			TweenLite.fromTo('#sustainability-section--third .sustainability-section__image-wrapper', 1, {
				x: '60vw',
				y: 0,
				ease: Power1.easeInOut

			}, {
				x: '0wv',
				y: 0,
				ease: Power1.easeInOut,
				delay: 2.2
			});

		}
		if ($(window).width() < 1024) {
			TweenLite.fromTo('.sustainability-section__clouds', 0.5, {
				top: '120vh',
				ease: Power1.easeInOut
			}, {
				top: '85vh',
				ease: Power1.easeInOut,
				delay: 2.8,
				clearProps: "top",
			});
		} else {
			TweenLite.fromTo('.sustainability-section__clouds', 0.5, {
				top: '120vh',
				ease: Power1.easeInOut
			}, {
				top: '58vh',
				ease: Power1.easeInOut,
				delay: 2.8,
				clearProps: "top",
			});
		}
		TweenLite.fromTo('.sustainability-section__mountain', 0.5, {
			bottom: '-100%',
			ease: Power1.easeInOut
		}, {
			bottom: '600px',
			ease: Power1.easeInOut,
			delay: 2.9
		});
		TweenLite.fromTo('.sustainability-section__mountain2', 0.6, {
			bottom: '-100%',
			ease: Power1.easeInOut
		}, {
			bottom: '600px',
			ease: Power1.easeInOut,
			delay: 2.9,
			onComplete: finishAnimation
		});
		TweenLite.fromTo('#sustainability-section--third .sustainability-section__next', 0.6, {
			opacity: '0',
			ease: Power1.easeInOut

		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 3
		});
		//Total first animation time: 3.5
	},

	showFirstSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--first', 1.5, {
			y: '-100%',
			ease: Power1.easeInOut,
			delay: 0.5
		}, {
			y: '0%',
			ease: Power1.easeInOut

		});
		TweenLite.fromTo('#sustainability-section--second', 1.5, {
			y: '0%',
			ease: Power1.easeInOut,
			delay: 0.5
		}, {
			y: '100%',
			ease: Power1.easeInOut

		});
		TweenLite.fromTo('.sustainability-section__bg', 1.5, {
			y: '-100vh',
			ease: Power1.easeInOut,
			delay: 0.5
		}, {
			y: '0%',
			ease: Power1.easeInOut,
			onComplete: finishAnimation

		});
		TweenLite.fromTo('#sustainability-section--second .container', 0.8, {
			y: '0px',
			ease: Power1.easeInOut,
		}, {
			y: '100px',
			ease: Power1.easeInOut,
			delay: 0.2

		});
		TweenLite.fromTo('#sustainability-section--second .sustainability-section__bg-bottom', 0.8, {
			y: '0px',
			ease: Power1.easeInOut,
		}, {
			y: '100px',
			ease: Power1.easeInOut

		});
		//Total first animation time: 1.8;
	},

	showSecondSection() {

		startAnimation = true;
		TweenLite.fromTo('#sustainability-section--first', 1.5, {
			y: '0%',
			ease: Power1.easeInOut

		}, {
			y: '-100%',
			ease: Power1.easeInOut,
		});
		TweenLite.fromTo('#sustainability-section--second', 1.5, {
			y: '100%',
			ease: Power1.easeInOut

		}, {
			y: '0%',
			ease: Power1.easeInOut,
		});
		TweenLite.fromTo('#sustainability-section--second .container', 0.8, {
			y: '100px',
			ease: Power1.easeInOut

		}, {
			y: '0px',
			ease: Power1.easeInOut,
			delay: 0.5
		});
		TweenLite.fromTo('#sustainability-section--second .sustainability-section__bg-bottom', 0.8, {
			y: '100px',
			ease: Power1.easeInOut

		}, {
			y: '0px',
			ease: Power1.easeInOut,
			delay: 0.8
		});

		TweenLite.fromTo('.sustainability-section__bg', 1.5, {
			y: '0%',
			ease: Power1.easeInOut

		}, {
			y: '-100vh',
			ease: Power1.easeInOut,
			onComplete: finishAnimation
		},);
		TweenLite.fromTo('#sustainability-section--second .sustainability-section__next', 0.6, {
			opacity: '0',
			ease: Power1.easeInOut

		}, {
			opacity: '1',
			ease: Power1.easeInOut,
			delay: 2
		});
		//Total second animation time: 1.5;
	},

	initNav() {
		const self = this;
		$(selectors.navItem, this.$container).click(function (e) {

			e.preventDefault();
			if (startAnimation) {
				return;
			}
			const $el = $($(this).attr('href'));
			prevSection = currentSection;
			currentSection = parseInt($($(this).attr('href')).attr('data-section-index'));
			self.goTo($el);

		});
		$(selectors.goNext, this.$container).click(function (e) {
			e.preventDefault();
			if (startAnimation) {
				return;
			}
			const $el = $($(this).attr('href'));
			prevSection = currentSection;
			currentSection = parseInt($($(this).attr('href')).attr('data-section-index'));
			self.goTo($el);
		});

	}
	,
	stateHeader(index, dirrection) {
		if (dirrection === 'up') {
			$('.header').addClass('header--sticky-go-top');
		} else {
			$('.header').removeClass('header--sticky-go-top');

		}
		if (index > 0) {
			$('.header').addClass('header--sticky-totop');
		} else {
			$('.header').removeClass('header--sticky-totop');
		}

		if (index > 0) {
			$('.header').addClass('header--sticky');
		} else {
			$('.header').removeClass('header--sticky');
		}
		if (index > 5) {
			TweenLite.to('.js--progress-line', 0.4, {
				right: `0%`,
				ease: Power1.easeInOut
			});
		} else {
			TweenLite.to('.js--progress-line', 1, {
				right: `${(100 - 100 * (index) / 6)}%`,
				ease: Power1.easeInOut

			});
		}


	},
	stateSections(index) {

		if (index === 5 || index === 4) {
			$('.sustainability-nav__item').addClass('sustainability-nav__item--dark');
		} else {
			$('.sustainability-nav__item').removeClass('sustainability-nav__item--dark');
		}
		$('.sustainability-nav__link').removeClass('sustainability-nav__link--active');
		$('.sustainability-nav__link[href="#' + $('.sustainability-section[data-section-index="' + index + '"]').attr('id') + '"]').addClass('sustainability-nav__link--active');

	}
	,

	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	}
})
