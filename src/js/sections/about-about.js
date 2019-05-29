/**
 * About  Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the  About  section.
 *
 * @namespace about
 */

import {register} from '@shopify/theme-sections';


const selectors = {
	contentToogle: '.js-more-content',
	bgImage: '.about-section--about .about-section__bg',
	triggerElement: '.about-section--about',

};

register('about', {
	onLoad() {
		this.$container = $(this.container);
		this.namespace = `.${this.id}`;

		this.init();
		// this.initScrollMagic();
	},
	init() {
		$(selectors.contentToogle, this.$container).on('click', function (e) {
			e.preventDefault();
			$(this).parents('.about-section__content').addClass('about-section__content--show');
			$(this).parents('.about-section__content').find('.about-section__content--bottom').slideDown(500);
			$(this).hide();
		});
	},
	initScrollMagic() {
		let controller = new ScrollMagic.Controller();
		var tween = new TimelineMax()
			.add([
				TweenMax.to(selectors.bgImage, 1, {backgroundPosition: "100% center"})
			]);
		var duration = $(selectors.triggerElement).outerHeight()+$(window).height();

		var scene = new ScrollMagic.Scene({
			triggerElement: selectors.triggerElement,
			duration: duration,
			offset: 0,
			triggerHook: 1,
		})
			.setTween(tween)
			.addIndicators('bg')
			.addTo(controller);
		// var offset = $(".about-section--hero").outerHeight() - $(window).height();
		// if(offset<0){
		// 	offset=0
		// }
		// var scene2 = new ScrollMagic.Scene({
		// 	triggerElement: ".about-section--hero",
		// 	triggerHook: 0,
		// 	duration: '100%',
		// 	offset: offset,
		// })
		// 	.setPin(".about-section--hero", {pushFollowers:false})
		// 	.addIndicators()
		// 	.addTo(controller);
		// var offset = $(".about-section--navigation").outerHeight() -( $(window).height());
		// if(offset<0){
		// 	offset=0
		// }
		// var scene2 = new ScrollMagic.Scene({
		// 	triggerElement: ".about-section--navigation",
		// 	triggerHook: 0,
		// 	duration: '100%',
		// 	offset: offset,
		// })
		// 	.setPin(".about-section--navigation", {pushFollowers:false})
		// 	// .addIndicators()
		// 	.addTo(controller);
		// var offset = $(selectors.triggerElement).outerHeight() -( $(window).height());
		// if(offset<0){
		// 	offset=0
		// }
		// var scene2 = new ScrollMagic.Scene({
		// 	triggerElement: ".about-section--about",
		// 		triggerHook: 0,
		// 	duration: '100%',
		// 	offset: offset,
		// })
		// 	.setPin(".about-section--about", {pushFollowers:false})
		// 	// .addIndicators()
		// 	.addTo(controller);
		//
		// var tween = new TimelineMax()
		// 	.add([
		// 		TweenMax.to('.about-section--mission .about-section__bg', 1, {backgroundPosition: "center 30%"})
		// 	]);
		// var duration = $('.about-section--mission').outerHeight()-50;
		//
		// var scene = new ScrollMagic.Scene({
		// 	triggerElement: '.about-section--mission .about-section__bg',
		// 	duration: duration,
		// 	offset: 0,
		// 	triggerHook: 1,
		// })
		// 	.setTween(tween)
		// 	// .addIndicators('bg')
		// 	.addTo(controller);
		// var offset = $(".about-section--mission").outerHeight() -( $(window).height());
		// if(offset<0){
		// 	offset=0
		// }
		// var scene2 = new ScrollMagic.Scene({
		// 	triggerElement: ".about-section--mission",
		// 	triggerHook: 0,
		// 	duration: '100%',
		// 	offset: offset,
		// })
		// 	.setPin(".about-section--mission", {pushFollowers:false})
		// 	// .addIndicators()
		// 	.addTo(controller);


		// var offset = $(".about-section--location").outerHeight() ;
		// if(offset<0){
		// 	offset=81
		// }
		// var scene2 = new ScrollMagic.Scene({
		// 	triggerElement: ".about-section--location",
		// 	triggerHook: 0,
		// 	duration: $(".about-section--location").outerHeight(),
		// 	offset: offset,
		// })
		// 	.setPin(".about-section--location", {pushFollowers:false})
		// 	.addIndicators()
		// 	.addTo(controller);



		// var offset = $(".footer").outerHeight() -( $(window).height());
		//
		// var scene2 = new ScrollMagic.Scene({
		// 	triggerElement: ".footer",
		// 	triggerHook: 0,
		// 	duration: $(".footer").outerHeight(),
		// 	offset: offset,
		// })
		// 	.setPin(".footer", {pushFollowers:false})
		// 	.addIndicators()
		// 	.addTo(controller);
		// let controller = new ScrollMagic.Controller();
		// var tween = new
		// 		TweenMax.fromTo('.footer .container', 1, {y: "-100%"}, {y: "0%"});
		//
		// var duration = $('.footer').outerHeight();
		//
		// var scene = new ScrollMagic.Scene({
		// 	triggerElement: '.footer',
		// 	duration: duration,
		// 	offset: 0,
		// 	triggerHook: 1,
		// })
		// 	.setTween(tween)
		// 	// .addIndicators('bg')
		// 	.addTo(controller);
		$('.footer').css('height', $('.footer .container').outerHeight());
		// let screen2 = new ScrollMagic.Scene({
		// 	offset: 0,
		// 	triggerHook: 1,
		// 	triggerElement: ".footer",
		// 	duration: $('.footer .container').outerHeight()
		// })
		// 	.setPin(".footer .container")
		// 	.addIndicators({name: "sticky"})
		// 	.addTo(controller);

		// init
		// var controller = new ScrollMagic.Controller();
		//
		// // define movement of panels
		// var wipeAnimation = new TimelineMax()
		// 	.fromTo(".about-section--hero", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone})  // in from left
		// 	.fromTo(".about-section--navigation",    1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})  // in from right
		// 	.fromTo(".about-section--about", 1, {y: "100%"}, {y: "0%", ease: Linear.easeNone}); // in from top
		//
		// // create scene to pin and link animation
		// new ScrollMagic.Scene({
		// 	triggerElement: ".main-page",
		// 	triggerHook: "onLeave",
		// 	duration: "300%"
		// })
		// 	.setPin("#pinContainer")
		// 	.setTween(wipeAnimation)
		// 	.addIndicators() // add indicators (requires plugin)
		// 	.addTo(controller);
	},
	/**
	 * Event callback for Theme Editor `section:unload` event
	 */
	onUnload() {
		this.$container.off(this.namespace);
	},
});