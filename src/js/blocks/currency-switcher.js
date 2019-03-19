export class CurrencySwitcherBlock {
  constructor(id, type, $container) {
    this.$container = $container;
    this.type = type;
    this.id = id;
    this.selectors = {
      currentItem: '.js--current-currency',
      currencies: '.js--currency-item',
      dropdown: '.js--currency-list',
      currencyIcon: '.js--currency-icon',
      currencyValue: '.js--currency-value',
      activeClass: 'currency-switcher--active',
      activeItemClass: 'currency-switcher__list-item--selected',
      money: 'span.money',
    };
    this.documentClickHandler = this._documentClick.bind(this);

    this.init();
  }

  init() {
    $(this.selectors.currentItem, this.$container).on('click', () => {
      this._toggleDropdown();
    });

    $(this.selectors.currencies, this.$container).on('click', this._changeCurrent.bind(this));

    Currency.format = theme.currencyFormat;
    const shopCurrency = theme.shopCurrency;
    if (typeof Currency.moneyFormats === 'undefined') {
      Currency.moneyFormats = {};
    }

    /* Sometimes merchants change their shop currency, let's tell our JavaScript file */
    Currency.moneyFormats[shopCurrency] = Currency.moneyFormats[shopCurrency] || {};
    Currency.moneyFormats[shopCurrency].money_with_currency_format = theme.moneyWithCurrencyFormat;
    Currency.moneyFormats[shopCurrency].money_format = theme.moneyFormat;

    /* Default currency */
    const defaultCurrency = theme.defaultCurrency;

    /* Cookie currency */
    const cookieCurrency = Currency.cookie.read();

    /* Saving the current price */
    $(this.selectors.money).each(function() {
      $(this).attr(`data-currency-${defaultCurrency}`, jQuery(this).html());
    });

    // If there's no cookie.
    if (cookieCurrency == null) {
      if (shopCurrency !== defaultCurrency) {
        Currency.currentCurrency = defaultCurrency;
        const event = {
          currentTarget: $(`${this.selectors.currencies}[data-value="${defaultCurrency}"]`),
        };
        this._changeCurrent(event);
      }
      else {
        Currency.currentCurrency = defaultCurrency;
      }
    }
    else if ($(`${this.selectors.currencies}[data-value="${cookieCurrency}"]`).length === 0) {
      Currency.currentCurrency = shopCurrency;
      Currency.cookie.write(shopCurrency);
    }
    else if (cookieCurrency === shopCurrency) {
      Currency.currentCurrency = shopCurrency;
    }
    else {
      Currency.currentCurrency = shopCurrency;
      const event = {
        currentTarget: $(`${this.selectors.currencies}[data-value="${cookieCurrency}"]`),
      };
      this._changeCurrent(event);
      Currency.currentCurrency = cookieCurrency;
    }
  }

  _showDropdown() {
    this.$container.addClass(this.selectors.activeClass);
    this._subscribeDocumentClick();
  }

  _hideDropdown() {
    this.$container.removeClass(this.selectors.activeClass);
    this._unsubscribeDocumentClick();
  }

  _toggleDropdown() {
    this.$container.toggleClass(this.selectors.activeClass);

    if (this.$container.hasClass(this.selectors.activeClass)) {
      this._subscribeDocumentClick();
    } else {
      this._unsubscribeDocumentClick();
    }
  }

  _changeCurrent(e) {
    const $target = $(e.currentTarget);
    const $currentItem = $(this.selectors.currentItem, this.$container);
    const newCurrency = $target.data('value');
    $currentItem.find(this.selectors.currencyIcon).html($target.find(this.selectors.currencyIcon).html());
    $currentItem.find(this.selectors.currencyValue).html($target.find(this.selectors.currencyValue).html());
    $(this.selectors.currencies, this.$container).removeClass(this.selectors.activeItemClass);
    $target.addClass(this.selectors.activeItemClass);
    Currency.convertAll(Currency.currentCurrency, newCurrency);
    this._hideDropdown();
  }

  _subscribeDocumentClick() {
    $(document).on('click', this.documentClickHandler);
  }

  _unsubscribeDocumentClick() {
    $(document).off('click', this.documentClickHandler);
  }

  _documentClick(e) {
    if (!$(e.target).closest(this.$container).length) {
      this._hideDropdown();
    }
  }
}
