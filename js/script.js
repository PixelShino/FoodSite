'use strict';
import '../Styles/styles.scss';
import calc from './modules/calc.js';
import cards from './modules/cards.js';
import forms from './modules/forms.js';
import modal from './modules/modal.js';
import slider from './modules/slider.js';
import tabs from './modules/tabs.js';
import timer from './modules/timer.js';

import SliderV2 from './modules/tabsAndSlider.js';
import menuCardSlider from './modules/menuCardSlider.js';
import fixedPromo from './modules/fixedPromo';
import burger from './modules/burger.js';
import bodyNoScroll from './modules/bodyNoScroll.js';
import collapsed from './modules/collapsed.js';
import insertContent from './modules/moveContent';
import replaceImg from './modules/replaceImg';
import reviews from './modules/reviews';

document.addEventListener('DOMContentLoaded', () => {
  console.log('script js  work');

  // fixedPromo();
  calc();
  cards();
  forms();
  modal('[data-modal]', '.modal', '[data-close]');
  // slider();
  tabs(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    '.tabcontent__bot-cards',
    '.tabdays__choise-btn',
  );
  //TODO:перенести таймер в promo вниз экрана
  //или переделать таймер в отдельное окно
  timer();
  SliderV2(
    '.offer__slide', // изменить на слайды вместо .offer__descr
    '.offer__slider', // изменить на родительский элемент слайдера
    '.prev',
    '.next',
    '#current',
    '#total',
  );
  insertContent();
  // menuCardSlider('.offer__slider-inner');
  menuCardSlider();
  burger();
  collapsed();
  insertContent();
  replaceImg(
    '.calculating__choose_big',
    'calculating__choose-item',
    'calculating__choose-item_active',
  );
  replaceImg(
    '#gender',
    'calculating__choose-item',
    'calculating__choose-item_active',
  );
  reviews();
  // bodyNoScroll();
});
