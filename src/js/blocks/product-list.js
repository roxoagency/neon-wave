import { Product } from "../theme/product";

export class ProductListBlock {
  constructor(id, type, $container) {
    this.$container = $container;
    this.type = type;
    this.id = id;
    this.selectors = {
      product: {
        form: '.js--product-card-form',
        quickBuyGroup: '.js--quick-buy-group',
        quickBuyButton: '.js--quick-buy',
        productOption: '.js--product-option',
        quantity: '.js--product-quantity',
        productOptionColor: '.js--color-option',
        colorGroup: '.js--color-option-group',
      },
    };

    this.init();
  }

  init() {
    this._initQuickBuy();
    this.checkUnavailableProducts();

    $(document).on('bcsf-list-refresh', (e, data) => {
      this._initQuickBuy();
      this.checkUnavailableProducts();
    });
  }

  checkUnavailableProducts() {
    $(this.selectors.product.form).each((index, productForm) => {
      this.checkUnavailableVariants($(productForm));
    });
  }

  checkUnavailableVariants(form) {
    const product = Product.get(parseInt(form.data('product-id')));
    const selectedValues = [];
    const sizeOptions = $('.product-card__form-group--size', form);

    sizeOptions.find('.option').attr('disabled', false);

    if (product) {
      const selectedColor = $(this.selectors.product.productOptionColor, form).filter('.selected');
      let colorOption = {
        value: selectedColor.data('value'),
        index: selectedColor.closest(this.selectors.product.colorGroup).data('index'),
      };
      selectedValues.push(colorOption);

      $(this.selectors.product.productOption, form).each((index, productOption) => {
        const variantOption = {
          index: $(productOption).data('index'),
          value: $(productOption).val(),
        };

        selectedValues.push(variantOption);
      });

      $.each(product.variants, (index, variant) => {
        const isCheckedVariant = selectedValues.every((values) => {
          return variant[values.index] == values.value;
        });

        if (isCheckedVariant && !variant.available) {
          const option = sizeOptions.find(`.option[data-value="${variant[sizeOptions.data('index')]}"]`);
          option.attr('disabled', true);
        }
      });
    }
  }

  colorChanged(data) {
    const colorOption = $(this.selectors.product.productOptionColor, data.product).filter('.selected');
    const color = colorOption.data('value');
    const index = colorOption.closest(this.selectors.product.colorGroup).data('index');
    const form = $(this.selectors.product.form, data.product);

    const firstVariant = this.getFirstVariant(form, {
      index: index,
      value: color,
    });

    this.checkUnavailableVariants(form);

    if (!firstVariant) return;

    if (data.default) {
      $('.js--default-image', data.product).show();
      $('.js--variant-image', data.product).hide();
    } else if (firstVariant.featured_image || firstVariant.image) {
      $('.js--default-image', data.product).hide();
      $('.js--variant-image', data.product).filter(`[data-variant="${firstVariant.id}"]`).show();
    }
  }

  getFirstVariant(form, option) {

    const product = Product.get(parseInt(form.data('product-id')));

    const variants = product.variants;
    let variant = null;

    $.each(variants, (index, productVariant) => {
      if (
        !variant &&
        productVariant.available &&
        productVariant[option.index].toLowerCase() === option.value.toLowerCase()
      ) {
        variant = productVariant;
      }
    });

    return variant;
  }

  _initQuickBuy() {
    $(this.selectors.product.quickBuyButton, this.$container).on('click', (e) => {
      const form = $(e.target).closest(this.selectors.product.form);
      const option = {
        index: $(e.target).closest(this.selectors.product.quickBuyGroup).data('index'),
        value: $(e.target).data('value'),
      };

      this._quickBuy(form, option);
    });

    $(this.selectors.product.productOptionColor, this.$container).on('click', (e) => {
      $(this.selectors.product.productOptionColor, this.$container).not(e.currentTarget).removeClass('selected');
      $(e.currentTarget).addClass('selected');
      const product = $(e.currentTarget).closest('[data-section-type="product-card"]');

      this.colorChanged({
        default: $(e.currentTarget).hasClass('default'),
        product: product,
      });
    });
  }

  _quickBuy(form, option) {
    const product = Product.get(parseInt(form.data('product-id')));
    const selectedValues = [option];

    if ($(this.selectors.product.productOptionColor, form).length) {
      const selectedColor = $(this.selectors.product.productOptionColor, form).filter('.selected');
      let colorOption = {
        value: selectedColor.data('value'),
        index: selectedColor.closest(this.selectors.product.colorGroup).data('index'),
      };
      selectedValues.push(colorOption);
    }

    $(this.selectors.product.productOption, form).each((index, productOption) => {
      const variantOption = {
        index: $(productOption).data('index'),
        value: $(productOption).val(),
      };

      selectedValues.push(variantOption);
    });

    const variants = product.variants;
    const found = variants.find((variant) => {
      return selectedValues.every((values) => {
        return variant[values.index] == values.value;
      });
    });

    Product.addToCart({
      quantity: $(this.selectors.product.quantity, form).val() || 1,
      id: found.id,
    });
  }
}
