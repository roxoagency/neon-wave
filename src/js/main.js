import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/tab';
import { Theme } from './theme';
import { HeaderBlock } from './blocks/header';
import { HeroBlock } from './blocks/hero';
import { CoordinatesBlock } from './blocks/coordinates';
import { ProgressBarBlock } from './blocks/progress-bar';
import { MenuSliderBlock } from './blocks/menu-slider';
import { FeaturedCollectionBlock } from './blocks/featured-collection';
import { ProductListBlock } from './blocks/product-list';
import { CurrencySwitcherBlock } from './blocks/currency-switcher';
import {CollectionBlock} from "./blocks/collection";
import './blocks/quantity';
import {RelatedProductsBlock} from "./blocks/related-products";


const theme = new Theme();
theme.register('hero', HeroBlock);
theme.register('coordinates-block', CoordinatesBlock);
theme.register('header-block', HeaderBlock);
theme.register('progress-bar', ProgressBarBlock);
theme.register('menu-slides', MenuSliderBlock);
theme.register('featured-collection', FeaturedCollectionBlock);
theme.register('product-list', ProductListBlock);
theme.register('currency-switcher', CurrencySwitcherBlock);
theme.register('collection', CollectionBlock);
theme.register('related-products', RelatedProductsBlock);
import {load} from '@shopify/theme-sections';
import './sections/product';
import './blocks/goTo';
import './blocks/shipping-select';
import './blocks/account';
import './blocks/addresses';
import './blocks/mailchimp-form';
import './blocks/faq';
import './sections/about-location';
load('*');



