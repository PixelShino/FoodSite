'use strict';
import '../Styles/styles.scss';
import calc from './modules/calc.js';
import cards from './modules/cards.js';
import forms from './modules/forms.js';
import modal from './modules/modal.js';
import slider from './modules/slider.js';
import tabs from './modules/tabs.js';
import timer from './modules/timer.js';
import tabsAndSlider from './modules/tabsAndSlider.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('its work');

  calc();
  cards();
  forms();
  modal('[data-modal]', '.modal', '[data-close]');
  // slider();
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items');
  timer();

  tabsAndSlider(
    '.tabheader__item',
    '.offer__slide', // изменить на слайды вместо .offer__descr
    '.offer__slider', // изменить на родительский элемент слайдера
    '.prev',
    '.next',
    '#current',
    '#total',
  );

  // tabsSelector,
  // contentSelector,
  // parentSelector,
  // sliderPrev,
  // sliderNext,
  // current,
  // total,
});
