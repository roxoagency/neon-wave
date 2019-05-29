export  class AnimatedBlock {
	constructor(element) {
		this.element = element;
		this.bindEvents();
	}

	checkBlocksPosition() {
		if ( (this.element.getBoundingClientRect().top - window.innerHeight) <= 0 ) {
			this.element.classList.add("animated-block--visible");
		}
	}

	bindEvents() {
		this.checkBlocksPosition();
		window.addEventListener("scroll", () => {
			this.checkBlocksPosition();
		});
	}
}
