/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/bodyNoScroll.js":
/*!************************************!*\
  !*** ./js/modules/bodyNoScroll.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function bodyNoScroll(item = '.burger__content', active = '.active') {
  const body = document.querySelector('body');
  if (item && active) {
    body.classList.toggle('no-scroll');
    console.log('bodyNoScroll work');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bodyNoScroll);


/***/ }),

/***/ "./js/modules/burger.js":
/*!******************************!*\
  !*** ./js/modules/burger.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bodyNoScroll_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bodyNoScroll.js */ "./js/modules/bodyNoScroll.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");



function toggleActive(
  parent = '.header__burger',
  item = '.header__burger-item',
  toggleItemSelector = '.burger__content',
) {
  const parentElement = document.querySelector(parent);
  const items = document.querySelectorAll(item);
  const toggleItem = document.querySelector(toggleItemSelector);
  const body = document.querySelector('body');

  if (!parentElement) {
    console.error(`Parent element with selector "${parent}" not found.`);
    return;
  } else if (!items) {
    console.error(`Items with selector "${item}" not found.`);
    return;
  } else if (!toggleItem) {
    console.error(
      `Toggle element with selector "${toggleItemSelector}" not found.`,
    );
    return;
  } else {
    function toggle() {
      (0,_bodyNoScroll_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
      console.log('burger clicked');
      console.log(toggleItem);
      toggleItem.classList.toggle('active');

      console.log('else work');
    }

    parentElement.addEventListener('click', toggle);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleActive);


/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  //Calc
  function calc() {
    let sex, height, weight, age, ratio;
    const result = document.querySelector('.calculating__result span');
    const index = document.querySelector('.calculating__result.bmi span');
    const indexInfo = document.querySelector(
      '.calculating__total.bmi.info span',
    );

    if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
    } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
    } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach((elem) => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')) {
          elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
          elem.classList.add(activeClass);
        }
      });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings(
      '.calculating__choose_big div',
      'calculating__choose-item_active',
    );

    function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
      }

      if (sex === 'female') {
        result.textContent = Math.round(
          (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio,
        );
      } else {
        result.textContent = Math.round(
          (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio,
        );
      }
      if (
        isNaN(result.textContent) ||
        !/^-?\d+(\.\d+)?$/.test(result.textContent)
      ) {
        result.textContent = '____';
      }
    }

    //TODO: вывести информацию о подходящем плане питания
    function calcIndex() {
      console.log('Height:', height, 'Weight:', weight);
      let indexValueContainer = document.querySelector(
        '.calculating__total.bmi.info',
      ); // Добавьте это для отладки
      if (!height || !weight) {
        index.textContent = '____';
        console.log('index = ____');
        console.log(indexValueContainer);
        indexValueContainer.style.display = 'none';
        return;
      } else {
        console.log('index find');
        indexValueContainer.style.display = 'grid';
        let indexValue = +((10000 * weight) / (height * height)).toFixed(1);
        index.textContent = indexValue;
        console.log((10000 * weight) / (height * height));

        if (indexValue <= 16) {
          indexInfo.textContent = 'Выраженный дефицит массы тела';
        } else if (indexValue >= 16 && indexValue <= 18.4) {
          indexInfo.textContent = 'Недостаточная (дефицит) масса тела';
        } else if (indexValue >= 18.5 && indexValue <= 24.9) {
          indexInfo.textContent = 'Норма';
        } else if (indexValue >= 25 && indexValue <= 29.9) {
          indexInfo.textContent = 'Избыточная масса тела';
        } else if (indexValue >= 30 && indexValue <= 34.9) {
          indexInfo.textContent = 'Ожирение первой степени';
        } else if (indexValue >= 35 && indexValue <= 39.9) {
          indexInfo.textContent = 'Ожирение второй степени';
        } else if (indexValue >= 40) {
          indexInfo.textContent = 'Ожирение третьей степени (морбидное)';
        }
      }
    }

    calcTotal();
    calcIndex();

    function getStaticInformation(parentSelector, activeClass) {
      const elements = document.querySelectorAll(`${parentSelector} div`);

      document
        .querySelector(parentSelector)
        .addEventListener('click', (event) => {
          if (event.target.getAttribute('data-ratio')) {
            ratio = +event.target.getAttribute('data-ratio');
            localStorage.setItem(
              'ratio',
              +event.target.getAttribute('data-ratio'),
            );
          } else if (
            event.target.id === 'female' ||
            event.target.id === 'male'
          ) {
            sex = event.target.getAttribute('id');
            localStorage.setItem('sex', event.target.getAttribute('id'));
          }

          elements.forEach((elem) => {
            elem.classList.remove(activeClass);
          });

          if (event.target.classList.contains('calculating__choose-item')) {
            event.target.classList.add(activeClass);
          }

          calcTotal();
          calcIndex();
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation(
      '.calculating__choose_big',
      'calculating__choose-item_active',
    );

    function getDynamicInformation(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {
        if (input.value.match(/\D/g)) {
          input.classList.add('invalid');
        } else {
          input.classList.remove('invalid');
        }
        switch (input.getAttribute('id')) {
          case 'height':
            height = +input.value;
            break;
          case 'weight':
            weight = +input.value;
            break;
          case 'age':
            age = +input.value;
            break;
        }
        calcTotal();
        calcIndex();
      });
    }
    console.log(index);
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
  }

  calc();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);
console.log('webpack test');


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs */ "./js/modules/tabs.js");


function cards() {
  class MenuCard {
    constructor(
      imgSrc,
      alt,
      title,
      description,
      price,
      parentSelector,
      tab,
      ...classes
    ) {
      this.parent = document.querySelector(parentSelector);
      this.imgSrc = imgSrc;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.transfer = 50;
      this.changeToUAH();
      this.classes = classes;
      this.tab = tab;
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.imgSrc} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
        <a href="#preview"><div class="menu__item-select" data-tab="tab-${this.tab}">Перейти</div></a>
      `;

      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    return await res.json();
  };

  getResource('http://localhost:3000/menu').then((data) => {
    console.log(data);
    data.forEach(({ img, altimg, title, descr, price, tab }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container',
        tab,
      ).render();
    });

    function menuTabSwitch() {
      const selectBtn = document.querySelectorAll('.menu__item-select');
      const tabsParent = document.querySelector('.tabheader__items');

      function handleTabSwitch(btn) {
        const dataTab = btn.dataset.tab;
        console.log(dataTab);
        tabsParent.dispatchEvent(
          new CustomEvent('tabswitch', { detail: { dataTab } }),
        );
      }

      selectBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          handleTabSwitch(btn);
        });
      });
    }
    menuTabSwitch();
    (0,_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
      '.tabheader__item',
      '.tabcontent',
      '.tabheader__items',
      '.tabcontent__bot-cards',
      '.tabdays__choise-btn',
    );
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/collapsed.js":
/*!*********************************!*\
  !*** ./js/modules/collapsed.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function collapsed(Section = '.menu__field', toggleBtn = '.menu .expand') {
  const menuField = document.querySelector(Section);
  const toggleButton = document.querySelector(toggleBtn);

  // Initial state: collapsed
  menuField.classList.add('collapsed');
  toggleButton.textContent = 'Развернуть';

  toggleButton.addEventListener('click', () => {
    menuField.classList.toggle('collapsed');
    toggleButton.textContent = menuField.classList.contains('collapsed')
      ? 'Развернуть'
      : 'Свернуть';
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (collapsed);


/***/ }),

/***/ "./js/modules/fixedPromo.js":
/*!**********************************!*\
  !*** ./js/modules/fixedPromo.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fixedPromo)
/* harmony export */ });
function fixedPromo() {
  document.addEventListener('scroll', function () {
    const promoElement = document.querySelector('.tabcontainer__bot-promo');
    const parent = document.querySelector('.tabcontainer'); // FIM
    const nextContainer = document.querySelector('.calculating__field');

    // Проверяем, найден ли элемент
    if (!promoElement) {
      console.error('Элемент с классом .tabcontainer__bot-promo не найден');
      return; // Завершаем выполнение функции, если элемент не найден
    }

    const promoElementPosition =
      parent.getBoundingClientRect().top + window.scrollY;
    const nextContainerPosition =
      nextContainer.getBoundingClientRect().top + window.scrollY; // Позиция элемента на странице
    const scrollPosition = window.scrollY; // Текущая позиция прокрутки

    // Если прокрутка страницы больше, чем позиция элемента
    if (scrollPosition >= promoElementPosition) {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedBot');
    } else {
      promoElement.classList.add('tabcontainer__bot-promo--fixedBot'); // Возвращаем обратно в абсолют
    }

    if (
      scrollPosition >
      promoElementPosition + promoElement.offsetHeight * 15
    ) {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedBot');
      promoElement.classList.add('tabcontainer__bot-promo--fixedTop');
    } else {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedTop');
    }
  });
}


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");


function forms() {
  //FORM
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: data,
    });
    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `display: block; margin: 0 auto;`; //TODO: вынести в отдельый класс css
      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);

      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });

      // fetch('index.php', {
      //   method: 'POST',
      //   headers: { 'Content-type': 'application/json; charset=utf-8' },
      //   body: JSON.stringify(object),
      // });
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData('http://localhost:3000/requests', json)
        // .then((data) => data.text())
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finnaly(() => {
          form.reset();
        });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.openModal)();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
          <div class="modal__close" data-close>&times;</div>
          <div class="modal__title">${message}</div>
        </div>
        `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then((data) => data.json())
    .then((res) => console.log(res));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/menuCardSlider.js":
/*!**************************************!*\
  !*** ./js/modules/menuCardSlider.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// js/modules/tabsSlider.js           tabsSlider
//TODO: нужно сделать плавнее , так же продумать на разных экранах,
function menuCardSlider(cardContainerOpt) {
  let cardContainer =
    cardContainerOpt || document.querySelector('.tabcontent__bot-cards');

  if (!cardContainer) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0; // Store the velocity for inertial scrolling

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - cardContainer.offsetLeft;
    scrollLeft = cardContainer.scrollLeft;
    velocity = 0; //reset velocity on new scroll
    cardContainer.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - cardContainer.offsetLeft;
    const walk = (x - startX) * 2;
    velocity = walk; // set velocity to current scroll delta
    cardContainer.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDown = false;
    cardContainer.style.cursor = 'grab';
    beginScrollDeceleration(); // Start decelerating after mouseup
  };

  const beginScrollDeceleration = () => {
    if (Math.abs(velocity) < 0.5) return; // Stop if velocity is too small

    velocity *= 0.95; // Deceleration factor - adjust as needed
    cardContainer.scrollLeft -= velocity;

    requestAnimationFrame(beginScrollDeceleration); // Loop for smooth deceleration
  };

  cardContainer.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUpOrLeave);
  window.addEventListener('mouseleave', handleMouseUpOrLeave);
  cardContainer.style.cursor = 'grab'; // Initial cursor state

  // Touch Events
  let isTouching = false;
  let touchStartX;
  let touchScrollLeft;
  let touchVelocity = 0;

  const handleTouchStart = (e) => {
    isTouching = true;
    touchStartX = e.touches[0].pageX - cardContainer.offsetLeft;
    touchScrollLeft = cardContainer.scrollLeft;
    touchVelocity = 0;
  };

  const handleTouchMove = (e) => {
    if (!isTouching) return;
    e.preventDefault();
    const x = e.touches[0].pageX - cardContainer.offsetLeft;
    const walk = (x - touchStartX) * 2;
    touchVelocity = walk;
    cardContainer.scrollLeft = touchScrollLeft - walk;
  };

  const handleTouchEnd = () => {
    isTouching = false;
    beginTouchDeceleration();
  };

  const beginTouchDeceleration = () => {
    if (Math.abs(touchVelocity) < 0.5) return;

    touchVelocity *= 0.95;
    cardContainer.scrollLeft -= touchVelocity;

    requestAnimationFrame(beginTouchDeceleration);
  };

  cardContainer.addEventListener('touchstart', handleTouchStart);
  cardContainer.addEventListener('touchmove', handleTouchMove);
  cardContainer.addEventListener('touchend', handleTouchEnd);

  return () => {
    cardContainer.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUpOrLeave);
    window.removeEventListener('mouseleave', handleMouseUpOrLeave);

    cardContainer.removeEventListener('touchstart', handleTouchStart);
    cardContainer.removeEventListener('touchmove', handleTouchMove);
    cardContainer.removeEventListener('touchend', handleTouchEnd);
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menuCardSlider);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   modal: () => (/* binding */ modal),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
//TODO: убрать засорение глобальной области видимости
let openModal;
let closeModal;
function modal(triggerSelector, modalSelector, closeSelector) {
  function initModal() {
    const trigger = document.querySelectorAll(triggerSelector); //кнопка открытия
    const modal = document.querySelector(modalSelector); // модальное окно
    const close = document.querySelector(closeSelector); // кнопка закрытия

    // Открытие модального окна и добавление обработчика `keydown`
    openModal = () => {
      if (document.body.classList.contains('no-scroll')) {
        return;
      } else {
        modal.classList.add('show');
        document.addEventListener('keydown', onEscapePress);
        document.body.classList.add('no-scroll');
        clearInterval(timerModal);
      }
    };

    // Закрытие модального окна и удаление обработчика `keydown`
    closeModal = () => {
      modal.classList.remove('show');
      document.removeEventListener('keydown', onEscapePress);
      document.body.classList.remove('no-scroll');
    };

    // Обработчик для закрытия модального окна по клавише Escape
    const onEscapePress = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      }
    };

    // Открытие модального окна по клику на кнопки с атрибутом data-modal
    trigger.forEach((button) => button.addEventListener('click', openModal));

    // Закрытие модального окна по клику на кнопку с атрибутом data-close
    close.addEventListener('click', closeModal);

    // Закрытие модального окна по клику вне его содержимого
    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.getAttribute(close === '')) {
        closeModal();
      }
    });

    // Вызов modal по истечению 50с
    let timerModal = setTimeout(openModal, 40000);

    // вызов modal на конце страницы
    //TODO: Сделать запрет на повторное срабатывание в течении определенного времени
    //TODO: рефрактор с использованием Intersection Observer api
    function showModalOnEndOfPage() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      if (scrollPosition >= documentHeight) {
        openModal();
        window.removeEventListener('scroll', showModalOnEndOfPage);
      }
    }
    window.addEventListener('scroll', showModalOnEndOfPage);
  }

  initModal();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
  // Простой слайдер // Для рабоыт удалить offer__slider-inner
  // function initSlider() {
  //   const slides = document.querySelectorAll('.offer__slide'),
  //     prev = document.querySelector('.offer__slider-prev'),
  //     next = document.querySelector('.offer__slider-next'),
  //     totalSlides = document.querySelector('#total'),
  //     current = document.querySelector('#current');
  //   let slideIndex = 1;

  //   if (slides.length < 10) {
  //     totalSlides.textContent = `0${slides.length}`;
  //   } else {
  //     totalSlides.textContent = slides.length;
  //   }

  //   function showSlides(n) {
  //     if (n > slides.length) {
  //       slideIndex = 1;
  //     }
  //     if (n < 1) {
  //       slideIndex = slides.length;
  //     }

  //     slides.forEach((slide) => {
  //       slide.style.display = 'none';
  //     });
  //     slides[slideIndex - 1].style.display = 'block';

  //     if (slides.length < 10) {
  //       current.textContent = `0${slideIndex}`;
  //     } else {
  //       current.textContent = slideIndex;
  //     }
  //   }

  //   function plusSlides(n) {
  //     showSlides((slideIndex += n));
  //   }

  //   prev.addEventListener('click', () => {
  //     plusSlides(-1);
  //   });
  //   next.addEventListener('click', () => {
  //     plusSlides(1);
  //   });

  //   showSlides(slideIndex);
  // }

  // initSlider();

  //Carousel

  function initCarousel() {
    const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      totalSlides = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slideField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width,
      slider = document.querySelector('.offer__slider');

    function deleteNotDigits(str) {
      return +str.replace(/\D/g, '');
    }

    function setSlideIndex(slide) {
      if (slides.length < 10) {
        current.textContent = `0${slide}`;
      } else {
        current.textContent = slide;
      }
    }

    function setDotsOpacity() {
      dots.forEach((dot) => {
        dot.style.opacity = '.5';
      });
      dots[slideIndex - 1].style.opacity = 1;
    }

    function setSlideFieldStyle() {
      slideField.style.transform = `translateX(-${offset}px)`;
    }

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
      totalSlides.textContent = `0${slides.length}`;
      setSlideIndex(slideIndex);
    } else {
      totalSlides.textContent = slides.length;
      setSlideIndex(slideIndex);
    }

    slideField.style.width = `${100 * slides.length}%`;
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach((slide) => {
      slide.style.width = width;
    });

    slider.style.position = 'relative';
    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
      if (i == 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
    }

    next.addEventListener('click', () => {
      if (offset == deleteNotDigits(width) * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += deleteNotDigits(width);
      }
      setSlideFieldStyle();
      if (slideIndex == slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
      setSlideIndex(slideIndex);
      setDotsOpacity();
    });

    prev.addEventListener('click', () => {
      if (offset == 0) {
        offset = deleteNotDigits(width) * (slides.length - 1);
      } else {
        offset -= deleteNotDigits(width);
      }
      setSlideFieldStyle();
      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }
      setSlideIndex(slideIndex);
      setDotsOpacity();
    });

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset = deleteNotDigits(width) * (slideTo - 1);
        setSlideFieldStyle();
        setSlideIndex(slideIndex);
        setDotsOpacity();
      });
    });
  }

  initCarousel();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _menuCardSlider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menuCardSlider */ "./js/modules/menuCardSlider.js");


function tabs(
  tabsItem,
  tabsContentItem,
  tabsParentItem,
  cardsParentItem,
  btnDaysItem,
) {
  const tabs = document.querySelectorAll(tabsItem);
  const tabsContent = document.querySelectorAll(tabsContentItem);
  const tabsParent = document.querySelector(tabsParentItem);
  const cardsParent = document.querySelector(cardsParentItem);
  const menuTariff = document.querySelector('.tabcontainer__bot-tariff');
  const menuDays = document.querySelector('.tabcontainer__bot-day');
  const menuPrice = document.querySelector('.price-info');
  const menuKcal = document.querySelector('.tabcontainer__bot-calories');
  const choiseDays = document.querySelector('.tabdays__choise');
  const btnDays = document.querySelectorAll('.tabdays__choise-btn');
  const choiseKcal = document.querySelector('.tabcalories__choise');
  const btnKcal = document.querySelectorAll('.tabcalories__choise-btn');
  const selectBtn = document.querySelectorAll('.menu__item-select');
  console.log(selectBtn);

  let tabIndex = 0;
  let currentDayValue = 1;
  let currentRatioValue;

  if (!tabs.length || !tabsContent.length || !tabsParent || !cardsParent) {
    console.error('Не удалось найти необходимые элементы для табов');
    return;
  }

  function hideTabsContent() {
    tabsContent.forEach((element) => {
      element.classList.add('hide');
      element.classList.remove('show', 'fade');
    });
    tabs.forEach((element) => {
      element.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add('tabheader__item_active');

    if (tabsContent[index].querySelector(cardsParentItem)) {
      (0,_menuCardSlider__WEBPACK_IMPORTED_MODULE_0__["default"])(tabsContent[index].querySelector(cardsParentItem));
    }

    const tabcaloriesChoise = tabsContent[index].querySelector(
      '.tabcalories__choise',
    );
    if (tabcaloriesChoise) {
      resetKcal(tabcaloriesChoise);
      resetDays(tabcaloriesChoise);
      currentRatioValue = btnKcal.length > 0 ? btnKcal[0].dataset.ratio : 1.2;
      calcKcal(tabcaloriesChoise, index, currentDayValue);
      calcDays(tabcaloriesChoise, index, currentRatioValue);
      calcTotalPrice(index, currentDayValue, currentRatioValue);
    }
  }

  hideTabsContent();
  showTabContent();

  tabsParent.addEventListener('tabswitch', (event) => {
    const { dataTab } = event.detail;
    const tabNumber = parseInt(dataTab.replace(/[^0-9]/g, ''), 10);
    tabIndex = tabNumber;
    hideTabsContent();
    showTabContent(tabNumber);
    // calcKcal(choiseKcal, tabNumber);
  });

  function switchTab() {
    tabsParent.addEventListener('click', (event) => {
      const targetElement = event.target.closest(tabsItem);
      if (targetElement) {
        tabs.forEach((item, i) => {
          if (targetElement === item) {
            tabIndex = i;
            hideTabsContent();
            showTabContent(i);
          }
        });
      }
    });
  }

  function resetDays() {
    if (btnDays.length > 0) {
      btnDays.forEach((item) => {
        item.classList.remove('tabdays__choise-btn--active');
      });
      btnDays[0].classList.add('tabdays__choise-btn--active');
      currentDayValue = parseInt(btnDays[0].textContent, 10);
      menuDays.textContent =
        currentDayValue === 1
          ? `${currentDayValue} день`
          : currentDayValue <= 4
            ? `${currentDayValue} дня`
            : `${currentDayValue} дней`;
    }
  }

  function resetKcal() {
    if (btnKcal.length > 0) {
      btnKcal.forEach((item) => {
        item.classList.remove('tabcalories__choise-btn--active');
      });
      btnKcal[0].classList.add('tabcalories__choise-btn--active');
      menuKcal.textContent = `${btnKcal[0].textContent} калорий`;
      currentRatioValue = btnKcal[0].dataset.ratio;
    }
  }

  function calcDays(tabcaloriesChoise, tabIndex, ratio) {
    choiseDays.removeEventListener('click', handleChoiseDaysClick);
    function handleChoiseDaysClick(e) {
      const target = e.target.closest('.tabdays__choise-btn');
      if (target) {
        btnDays.forEach((item) => {
          item.classList.remove('tabdays__choise-btn--active');
        });
        target.classList.add('tabdays__choise-btn--active');
        currentDayValue = parseInt(target.textContent, 10);
        menuDays.textContent =
          currentDayValue === 1
            ? `${currentDayValue} день`
            : currentDayValue <= 4
              ? `${currentDayValue} дня`
              : `${currentDayValue} дней`;
        calcTotalPrice(tabIndex, currentDayValue, currentRatioValue);
      }
    }
    choiseDays.addEventListener('click', handleChoiseDaysClick);
  }

  function calculateDiscount(days) {
    if (days >= 28) {
      menuPrice;
      return 0.2;
    } else if (days >= 20) {
      return 0.15;
    } else if (days >= 14) {
      return 0.1;
    } else if (days >= 10) {
      return 0.07;
    } else if (days >= 7) {
      return 0.05;
    } else if (days >= 5) {
      return 0.03;
    } else if (days >= 2) {
      return 0.01;
    } else {
      return 0;
    }
  }

  // ... (other code)

  function calcKcal(parentSelector, tabIndex, dayValue) {
    // Remove the event listener to prevent multiple handlers
    parentSelector.removeEventListener('click', handleKcalClick);

    function handleKcalClick(e) {
      const target = e.target.closest('.tabcalories__choise-btn');

      if (target) {
        // Reset active classes for ALL calorie buttons within the CURRENT tab
        parentSelector
          .querySelectorAll('.tabcalories__choise-btn')
          .forEach((item) => {
            item.classList.remove('tabcalories__choise-btn--active');
          });

        target.classList.add('tabcalories__choise-btn--active');
        menuKcal.textContent = `${target.textContent} калорий`;
        currentRatioValue = target.dataset.ratio;
        calcTotalPrice(tabIndex, dayValue, currentRatioValue);
        resetDays(); // Reset days when calories change
      }
    }

    parentSelector.addEventListener('click', handleKcalClick);

    // Initial setup: Set the first button as active and update values
    const firstKcalButton = parentSelector.querySelector(
      '.tabcalories__choise-btn',
    );
    if (firstKcalButton) {
      firstKcalButton.classList.add('tabcalories__choise-btn--active');
      currentRatioValue = firstKcalButton.dataset.ratio;
      menuKcal.textContent = `${firstKcalButton.textContent} калорий`;
      calcTotalPrice(tabIndex, dayValue, currentRatioValue); // Calculate initial price
    }
  }

  // ... (other code)

  function calcTotalPrice(tabIndex, dayValue, ratio) {
    console.log('Приходит в calcTotalPrice');
    console.log(`Таб индекс - ${tabIndex}`);
    console.log(`Значение дня ${dayValue}`);
    console.log(`Ратио калорий - ${ratio}`);
    let defaultPrice = 410;
    let price = 0;
    switch (tabIndex) {
      case 0:
        price = defaultPrice;
        break;
      case 1:
        price = 360;
        break;
      case 2:
        price = 320;
        break;
      default:
        price = defaultPrice;
    }
    const days = dayValue || 0;
    let totalPrice = days * price * ratio;
    const discount = calculateDiscount(days);
    const discountedPrice = totalPrice * (1 - discount);
    let discountElement = document.querySelector('.discount-info');
    if (!discountElement) {
      discountElement = document.createElement('div');
      discountElement.classList.add('discount-info');
      menuPrice.parentNode.insertBefore(discountElement, menuPrice);
    }
    const discountPercentage = Math.round(discount * 100);
    if (discountPercentage > 0) {
      discountElement.textContent = `Скидка ${discountPercentage}%`;
      discountElement.style.display = 'flex';
    } else {
      discountElement.style.display = 'none';
    }
    menuPrice.textContent = +discountedPrice.toFixed(0) + ' руб.';
    console.log(`Цена - ${price}`);
    console.log(`Количество дней - ${dayValue}`);
    console.log(`Ратио калорий - ${ratio}`);
    console.log(`Итоговая цена - ${totalPrice}`);
    return totalPrice, discountedPrice;
  }

  calcTotalPrice(tabIndex, currentDayValue, currentRatioValue);
  hideTabsContent();
  showTabContent();
  switchTab();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/tabsAndSlider.js":
/*!*************************************!*\
  !*** ./js/modules/tabsAndSlider.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function SliderV2(
  contentSelector,
  parentSelector,
  sliderPrev,
  sliderNext,
  current,
  total,
  // tabsSelector,
) {
  // const tabs = document.querySelectorAll(tabsSelector);
  const tabsContent = document.querySelectorAll(contentSelector);
  const tabsParent = document.querySelector(parentSelector);
  const prev = document.querySelector(sliderPrev);
  const next = document.querySelector(sliderNext);
  const currentCounter = document.querySelector(current);
  const totalCounter = document.querySelector(total);

  let slideIndex = 0;
  let startX = 0;
  let endX = 0;

  // if (!tabs.length || !tabsContent.length || !tabsParent) {
  //   console.error('Элементы не найдены');
  //   return;
  // }

  function hideContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    // tabs.forEach((tab) => {
    //   tab.classList.remove('tabheader__item_active');
    // });
  }

  function showContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    // tabs[i].classList.add('tabheader__item_active');

    // Обновляем счетчик
    currentCounter.textContent = getZero(i + 1);
    totalCounter.textContent = getZero(tabsContent.length);
  }

  function getZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
  }

  // Обработчик для табов
  // tabsParent.addEventListener('click', (event) => {
  //   const target = event.target;

  //   if (target && target.classList.contains(tabsSelector.replace('.', ''))) {
  //     tabs.forEach((item, i) => {
  //       if (target === item) {
  //         slideIndex = i;
  //         hideContent();
  //         showContent(slideIndex);
  //       }
  //     });
  //   }
  // });

  // Обработчики для стрелок
  prev.addEventListener('click', () => {
    slideIndex = slideIndex === 0 ? tabsContent.length - 1 : slideIndex - 1;
    hideContent();
    showContent(slideIndex);
  });

  next.addEventListener('click', () => {
    slideIndex = slideIndex === tabsContent.length - 1 ? 0 : slideIndex + 1;
    hideContent();
    showContent(slideIndex);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      // Обработка нажатия стрелки влево
      slideIndex = slideIndex === 0 ? tabsContent.length - 1 : slideIndex - 1;
      hideContent();
      showContent(slideIndex);
    } else if (event.key === 'ArrowRight') {
      // Обработка нажатия стрелки вправо
      slideIndex = slideIndex === tabsContent.length - 1 ? 0 : slideIndex + 1;
      hideContent();
      showContent(slideIndex);
    }
  });

  // Обработчики для свайпа
  tabsParent.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    endX = startX;
  });

  tabsParent.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX;
  });

  tabsParent.addEventListener('touchend', () => {
    const swipeDistance = endX - startX;
    const swipeThreshold = 50; // минимальная дистанция

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance < 0) {
        // Swipe left
        slideIndex = slideIndex === tabsContent.length - 1 ? 0 : slideIndex + 1;
      } else {
        // Swipe right
        slideIndex = slideIndex === 0 ? tabsContent.length - 1 : slideIndex - 1;
      }
      hideContent();
      showContent(slideIndex);
    }
  });

  // Инициализация
  hideContent();
  showContent();
}
// // Использование в script.js:
// document.addEventListener('DOMContentLoaded', () => {
//   combinedTabsSlider(
//     '.tabheader__item',
//     '.tabcontent',
//     '.tabheader__items',
//     '.offer__slider-prev',
//     '.offer__slider-next',
//     '#current',
//     '#total',
//   );
// });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SliderV2);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  // TIMER

  const deadline = '2024-12-31';

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60) % 60;
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    let timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  function getZero(number) {
    if (number >= 0 && number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  setClock('.timer', deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./Styles/styles.scss":
/*!****************************!*\
  !*** ./Styles/styles.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Styles_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Styles/styles.scss */ "./Styles/styles.scss");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc.js */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards.js */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms.js */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal.js */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider.js */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs.js */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer.js */ "./js/modules/timer.js");
/* harmony import */ var _modules_tabsAndSlider_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/tabsAndSlider.js */ "./js/modules/tabsAndSlider.js");
/* harmony import */ var _modules_menuCardSlider_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/menuCardSlider.js */ "./js/modules/menuCardSlider.js");
/* harmony import */ var _modules_fixedPromo__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/fixedPromo */ "./js/modules/fixedPromo.js");
/* harmony import */ var _modules_burger_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/burger.js */ "./js/modules/burger.js");
/* harmony import */ var _modules_bodyNoScroll_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/bodyNoScroll.js */ "./js/modules/bodyNoScroll.js");
/* harmony import */ var _modules_collapsed_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/collapsed.js */ "./js/modules/collapsed.js");

















document.addEventListener('DOMContentLoaded', () => {
  console.log('script js  work');
  // fixedPromo();
  (0,_modules_calc_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_cards_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_modal_js__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', '[data-close]');
  // slider();
  (0,_modules_tabs_js__WEBPACK_IMPORTED_MODULE_6__["default"])(
    '.tabheader__item',
    '.tabcontent',
    '.tabheader__items',
    '.tabcontent__bot-cards',
    '.tabdays__choise-btn',
  );
  //TODO:перенести таймер в promo вниз экрана
  //или переделать таймер в отдельное окно
  (0,_modules_timer_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
  (0,_modules_tabsAndSlider_js__WEBPACK_IMPORTED_MODULE_8__["default"])(
    '.offer__slide', // изменить на слайды вместо .offer__descr
    '.offer__slider', // изменить на родительский элемент слайдера
    '.prev',
    '.next',
    '#current',
    '#total',
  );
  (0,_modules_menuCardSlider_js__WEBPACK_IMPORTED_MODULE_9__["default"])();
  (0,_modules_burger_js__WEBPACK_IMPORTED_MODULE_11__["default"])();
  (0,_modules_collapsed_js__WEBPACK_IMPORTED_MODULE_13__["default"])();
  // bodyNoScroll();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map