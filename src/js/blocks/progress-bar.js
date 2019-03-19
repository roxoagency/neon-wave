export class ProgressBarBlock {
  constructor(id, type, $container) {
    this.$container = $container;
    this.type = type;
    this.id = id;
    this.selectors = {
      barLineSelector: '.js--progress-line',
    };
    this.cache = {};
    this.init();
  }

  init() {
    this._cacheSelectors();
    document.addEventListener('scroll', this._onScroll.bind(this));
  }

  _cacheSelectors() {
    this.cache.barLine = $(this.selectors.barLineSelector, this.$container);
  }

  _onScroll() {
    this.cache.barLine.css({
      right: `${(100 - this.getScrollPercent().toFixed(2))}%`,
    });
  }

  getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
  }
}
