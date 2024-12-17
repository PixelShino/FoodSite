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
import tabsSlider from './modules/tabsSlider';
import fixedPromo from './modules/fixedPromo';

document.addEventListener('DOMContentLoaded', () => {
  console.log('its work');
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
  timer();

  SliderV2(
    '.offer__slide', // изменить на слайды вместо .offer__descr
    '.offer__slider', // изменить на родительский элемент слайдера
    '.prev',
    '.next',
    '#current',
    '#total',
  );
  tabsSlider();

  // tabsAndSlider();
  // tabsAndSlider(
  //   '.offer__slide', // Селектор для слайдов
  //   '.tabcontent', // Селектор для контента табов
  //   '.tabheader__items', // Родительский элемент табов
  //   '.prev', // Селектор кнопки предыдущего слайда
  //   '.next', // Селектор кнопки следующего слайда
  //   '#current', // Селектор текущего номера слайда
  //   '#total', // Селектор общего количества слайдов
  //   '.tabheader__item', // Селектор для табов
  //   '.tabcontent', // Селектор для контента табов
  //   '.tabheader__items' // Родительский элемент табов
  // );

  // tabsSelector,
  // contentSelector,
  // parentSelector,
  // sliderPrev,
  // sliderNext,
  // current,
  // total,
});
