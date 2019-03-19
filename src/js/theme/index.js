export class Theme {
  constructor() {
    this.constructors = [];
    this.instances = [];
  }

  _createInstance(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (typeof constructor === 'undefined') {
      return;
    }

    var instance = new constructor(id, type, $container);

    this.instances.push(instance);
  }

  register(type, constructor) {
    $('[data-section-type=' + type + ']').each((index, container) => {
      this._createInstance(container, constructor);
    });
  }
}
