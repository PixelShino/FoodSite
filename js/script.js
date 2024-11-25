'use strict';
import calc from './modules/calc.js';
import cards from './modules/cards.js';
import forms from './modules/forms.js';
import modal from './modules/modal.js';
import slider from './modules/slider.js';
import tabs from './modules/tabs.js';
import timer from './modules/timer.js';
document.addEventListener('DOMContentLoaded', () => {
  console.log('its work');

  calc();
  cards();
  forms();
  modal('[data-modal]', '.modal', '[data-close]');
  slider();
  tabs();
  timer();
});
