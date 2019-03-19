export class CoordinatesBlock {
  constructor(id, type, $container) {
    this.$container = $container;
    this.type = type;
    this.id = id;
    this.selectors = {
      userCoordsSelector: '.js--user-coords',
      latValueSelector: '.lat',
      lngValueSelector: '.lng',
      dirLinkSelector: '.js--dir-link',
    };
    this.init();
  }

  init() {
    if (typeof navigator.geolocation === 'undefined') return;

    navigator.geolocation.getCurrentPosition(this.showUserCoordinates.bind(this));
  }

  showUserCoordinates(position) {
    const $block = $(this.selectors.userCoordsSelector, this.$container);
    const $dirLink = $(this.selectors.dirLinkSelector, this.$container);

    $dirLink.attr('href', $dirLink.attr('href')
      .replace('USER_LAT', position.coords.latitude)
      .replace('USER_LNG', position.coords.longitude)
    );

    $block.find(this.selectors.latValueSelector).text(position.coords.latitude.toFixed(6));
    $block.find(this.selectors.lngValueSelector).text(position.coords.longitude.toFixed(6));
    $block.removeClass('hide');
  }
}
