/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/auth.js":
/*!****************************!*\
  !*** ./js/modules/auth.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ auth)
/* harmony export */ });
/* harmony import */ var _burger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./burger */ "./js/modules/burger.js");
// Файл: js/modules/auth.js
// Описание: Модуль для отображения модального окна с формами авторизации и регистрации.
// Данные пользователя сохраняются в localStorage и отправляются на сервер по адресу http://localhost:3000/users.
// При успешной авторизации (особенно для admin) обновляется текст кнопки авторизации и добавляется пункт "Личный кабинет" в навигацию.



/**
 * Основная функция модуля аутентификации и регистрации.
 * Экспортируется как функция по умолчанию.
 */
function auth() {
  // Создаем контейнер модального окна для аутентификации/регистрации
  const modal = document.createElement('div');
  modal.classList.add('modal');

  // Создаем диалог модального окна
  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal__dialog');

  // Создаем контейнер содержимого модального окна
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');

  // Кнопка закрытия модального окна
  const modalClose = document.createElement('div');
  modalClose.classList.add('modal__close');
  modalClose.setAttribute('data-close', '');
  modalClose.textContent = '×';
  modalContent.appendChild(modalClose);

  // Заголовок модального окна
  const modalTitle = document.createElement('div');
  modalTitle.classList.add('modal__title');
  modalTitle.textContent = 'Аутентификация / Регистрация';
  modalContent.appendChild(modalTitle);

  // Создаем контейнер для переключения между формами
  const tabContainer = document.createElement('div');
  tabContainer.classList.add('modal__tabs');

  // Кнопка для входа
  const loginTab = document.createElement('button');
  loginTab.textContent = 'Вход';
  loginTab.classList.add('modal__tab', 'active');

  // Кнопка для регистрации
  const registerTab = document.createElement('button');
  registerTab.textContent = 'Регистрация';
  registerTab.classList.add('modal__tab');

  tabContainer.appendChild(loginTab);
  tabContainer.appendChild(registerTab);
  modalContent.appendChild(tabContainer);

  // Контейнеры для форм
  const formsContainer = document.createElement('div');
  formsContainer.classList.add('modal__forms');

  // Форма входа
  const loginForm = document.createElement('form');
  loginForm.classList.add('modal__form');
  loginForm.setAttribute('id', 'loginForm');
  loginForm.innerHTML = `
          <input type="text" name="login" placeholder="Логин" class="modal__input" required />
          <input type="password" name="password" placeholder="Пароль" class="modal__input" required />
          <button type="submit" class="btn btn_dark btn_min">Войти</button>
        `;

  // Форма регистрации
  const registerForm = document.createElement('form');
  registerForm.classList.add('modal__form');
  registerForm.setAttribute('id', 'registerForm');
  registerForm.style.display = 'none';
  registerForm.innerHTML = `
          <input type="text" name="name" placeholder="Имя" class="modal__input" required />
          <input type="email" name="email" placeholder="Email" class="modal__input" required />
          <input type="text" name="login" placeholder="Логин" class="modal__input" required />
          <input type="password" name="password" placeholder="Пароль" class="modal__input" required />
          <input type="tel" name="phone" placeholder="Телефон" class="modal__input" required />
          <button type="submit" class="btn btn_dark btn_min">Зарегистрироваться</button>
        `;

  formsContainer.appendChild(loginForm);
  formsContainer.appendChild(registerForm);
  modalContent.appendChild(formsContainer);

  // Собираем структуру модального окна
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  document.body.appendChild(modal);

  /**
   * Функция открытия модального окна.
   */
  function openModal() {
    if (modal.classList.contains('show')) return;
    modal.classList.add('show');
  }

  /**
   * Функция закрытия модального окна.
   */
  function closeModal() {
    modal.classList.remove('show');
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Переключение между вкладками формы
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
  });

  /**
   * Функция для отображения заказов пользователя.
   * @param {Object} user - Объект пользователя, содержащий данные (например, login).
   */
  async function showUserOrders(user) {
    try {
      const response = await fetch('http://localhost:3000/order');
      const orders = await response.json();
      // Фильтруем заказы, где логин совпадает с логином пользователя
      const userOrders = orders.filter((order) => order.login == user.login);
      console.log(userOrders);
      displayOrdersModal(userOrders, user);
    } catch (error) {
      console.error('Ошибка получения заказов:', error);
      alert('Не удалось получить заказы пользователя.');
    }
  }

  /**
   * Функция для создания и отображения модального окна с заказами пользователя.
   * @param {Array} orders - Массив заказов пользователя.
   * @param {Object} user - Объект пользователя.
   */
  function displayOrdersModal(orders, user) {
    // Создаем модальное окно для отображения заказов
    const ordersModal = document.createElement('div');
    ordersModal.classList.add('modal');
    ordersModal.style.zIndex = '1000'; // Поверх остальных
    const ordersDialog = document.createElement('div');
    ordersDialog.classList.add('modal__dialog');
    const ordersContent = document.createElement('div');
    ordersContent.classList.add('modal__content');

    // Кнопка закрытия модального окна заказов
    const ordersClose = document.createElement('div');
    ordersClose.classList.add('modal__close');
    ordersClose.setAttribute('data-close', '');
    ordersClose.textContent = '×';
    ordersContent.appendChild(ordersClose);

    // Заголовок окна заказов
    const ordersTitle = document.createElement('div');
    ordersTitle.classList.add('modal__title');
    ordersTitle.textContent = 'Ваши заказы';
    ordersContent.appendChild(ordersTitle);

    // Контейнер для списка заказов
    const ordersList = document.createElement('div');
    ordersList.classList.add('orders-list');

    if (orders.length === 0) {
      ordersList.textContent = 'Заказы не найдены.';
    } else {
      const ul = document.createElement('ul');
      orders.forEach((order) => {
        const li = document.createElement('li');
        li.textContent = `Тариф: ${order['тариф']} | Дней: ${order['количество_дней']} | Итоговая цена: ${order['итоговая_стоимость']} руб.`;
        ul.appendChild(li);
      });
      ordersList.appendChild(ul);
    }
    ordersContent.appendChild(ordersList);

    ordersDialog.appendChild(ordersContent);
    ordersModal.appendChild(ordersDialog);
    document.body.appendChild(ordersModal);

    /**
     * Функция закрытия модального окна заказов.
     */
    function closeOrdersModal() {
      ordersModal.remove();
    }
    ordersClose.addEventListener('click', closeOrdersModal);
    ordersModal.addEventListener('click', (e) => {
      if (e.target === ordersModal) {
        closeOrdersModal();
      }
    });
    // Показываем окно заказов
    ordersModal.classList.add('show');
  }

  /**
   * Функция для открытия админ панели.
   * Выполняет параллельные запросы к API для получения данных.
   */
  async function openAdminPanel() {
    try {
      // Определяем перечисление API эндпоинтов для выборки данных
      const endpoints = [
        { key: 'menu', url: 'http://localhost:3000/menu' },
        { key: 'requests', url: 'http://localhost:3000/requests' },
        { key: 'reviews', url: 'http://localhost:3000/reviews' },
        { key: 'callMeBack', url: 'http://localhost:3000/callMeBack' },
        { key: 'order', url: 'http://localhost:3000/order' },
        { key: 'users', url: 'http://localhost:3000/users' },
      ];

      // Параллельно выполняем запросы
      const responses = await Promise.all(endpoints.map((ep) => fetch(ep.url)));
      const dataList = await Promise.all(responses.map((res) => res.json()));

      // Сопоставляем ключи с данными
      const data = {};
      endpoints.forEach((ep, index) => {
        data[ep.key] = dataList[index];
      });

      // Отображаем админ панель с полученными данными
      displayAdminPanel(data);
    } catch (error) {
      console.error('Ошибка получения данных для админ панели:', error);
      alert('Не удалось получить данные для админ панели.');
    }
  }

  /**
   * Функция для создания и отображения админ панели с полученными данными.
   * @param {Object} data - Объект с данными, где ключи соответствуют типам данных.
   */
  function displayAdminPanel(data) {
    // Создаем модальное окно для админ панели
    const adminModal = document.createElement('div');
    adminModal.classList.add('modal');
    adminModal.style.zIndex = '1000';
    const adminDialog = document.createElement('div');
    adminDialog.classList.add('modal__dialog');
    // Применяем стиль для админ панели: полная ширина и высота
    adminDialog.style.width = '100%';
    adminDialog.style.height = '100%';
    const adminContent = document.createElement('div');
    adminContent.classList.add('modal__content');
    // Убираем ограничения стилей: max-height и margin-top
    adminContent.style.maxHeight = 'none';
    adminContent.style.marginTop = '0';

    // Кнопка закрытия админ панели
    const adminClose = document.createElement('div');
    adminClose.classList.add('modal__close');
    adminClose.setAttribute('data-close', '');
    adminClose.textContent = '×';
    adminContent.appendChild(adminClose);

    // Заголовок админ панели
    const adminTitle = document.createElement('div');
    adminTitle.classList.add('modal__title');
    adminTitle.textContent = 'АДМИН ПАНЕЛЬ - Все Записи';
    adminContent.appendChild(adminTitle);

    // Создаем секции для каждого набора данных
    Object.keys(data).forEach((key) => {
      const section = document.createElement('section');
      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = key.toUpperCase();
      section.appendChild(sectionTitle);

      const pre = document.createElement('pre');
      pre.textContent = JSON.stringify(data[key], null, 2);
      section.appendChild(pre);

      adminContent.appendChild(section);
    });

    adminDialog.appendChild(adminContent);
    adminModal.appendChild(adminDialog);
    document.body.appendChild(adminModal);

    /**
     * Функция закрытия админ панели.
     */
    function closeAdminModal() {
      adminModal.remove();
    }

    adminClose.addEventListener('click', closeAdminModal);
    adminModal.addEventListener('click', (e) => {
      if (e.target === adminModal) {
        closeAdminModal();
      }
    });

    adminModal.classList.add('show');
  }

  /**
   * Функция для обновления пользовательского интерфейса после авторизации.
   * @param {Object} user - Объект пользователя с данными авторизации.
   */
  function updateUIForAuth(user) {
    const authBtn = document.querySelector('#authBtn');
    if (authBtn) {
      authBtn.textContent = 'Выйти';
    }
    // Если элемент personal-account еще не создан, создаем и вставляем его сразу после authBtn
    if (authBtn && !document.querySelector('.personal-account')) {
      const accountElement = document.createElement('div');
      accountElement.classList.add('personal-account');
      // Если роль пользователя admin, то текст - 'ADMIN PANEL', иначе - 'Личный кабинет'
      accountElement.textContent =
        user && user.role === 'admin' ? 'ADMIN PANEL' : 'Личный кабинет';

      // Назначаем поведение клика:
      // Для admin открываем админ панель, для обычного пользователя загружаем его заказы
      if (user && user.role === 'admin') {
        accountElement.addEventListener('click', openAdminPanel);
      } else {
        accountElement.addEventListener('click', () => {
          showUserOrders(user);
        });
      }
      authBtn.parentNode.insertBefore(accountElement, authBtn.nextSibling);
    }
  }

  /**
   * Функция для выхода пользователя (сброс состояния авторизации).
   */
  function logout() {
    localStorage.removeItem('user');
    const authBtn = document.querySelector('#authBtn');
    if (authBtn) {
      authBtn.textContent = 'Войти';
    }
    const headerNav = document.querySelector(
      'body > header > div.header__bot-block > nav',
    );
    // Удаляем элемент personal-account, если он существует
    const personalAccount = document.querySelector('.personal-account');
    if (personalAccount) {
      personalAccount.remove();
    }
  }

  // Обработчик для формы входа
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const login = formData.get('login').trim();
    const password = formData.get('password').trim();

    try {
      // Получаем список пользователей с сервера
      const response = await fetch('http://localhost:3000/users');
      const users = await response.json();

      // Ищем пользователя с совпадающими данными
      const user = users.find(
        (u) => u.login === login && u.password === password,
      );

      if (user) {
        // Сохраняем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(user));
        updateUIForAuth(user);
        closeModal();
      } else {
        alert('Неверные данные для входа');
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  });

  // Обработчик для формы регистрации
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const userData = {
      name: formData.get('name').trim(),
      email: formData.get('email').trim(),
      login: formData.get('login').trim(),
      password: formData.get('password').trim(),
      phone: formData.get('phone').trim(),
      role: 'user', // по умолчанию обычный пользователь
    };

    try {
      // Отправляем данные на сервер (POST запрос)
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        // Сохраняем нового пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
        updateUIForAuth(newUser);
        closeModal();
      } else {
        alert('Ошибка регистрации. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  });

  // Назначаем обработчик для кнопки авторизации/выхода
  const authBtn = document.querySelector('#authBtn');
  if (authBtn) {
    authBtn.addEventListener('click', () => {
      const user = localStorage.getItem('user');
      (0,_burger__WEBPACK_IMPORTED_MODULE_0__.closeBurgerMenu)();
      if (user) {
        // Если пользователь уже авторизован - выполнить выход
        logout();
      } else {
        // Если не авторизован - открыть модальное окно аутентификации
        openModal();
      }
    });
  }

  // Если пользователь уже был авторизован ранее, обновляем интерфейс
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    updateUIForAuth(JSON.parse(storedUser));
  }
}


/***/ }),

/***/ "./js/modules/bodyNoScroll.js":
/*!************************************!*\
  !*** ./js/modules/bodyNoScroll.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * Функция bodyNoScroll
 * Назначение: переключает класс 'no-scroll' для элемента <body>.
 * Это позволяет блокировать или разрешать прокрутку страницы.
 *
 * Параметры:
 *   item   - селектор контента, управляющего состоянием (по умолчанию '.burger__content').
 *   active - селектор активного состояния (по умолчанию '.active').
 */
function bodyNoScroll(item = '.burger__content', active = '.active') {
  const body = document.querySelector('body'); // Получаем элемент <body>

  // Если указаны значения для item и active, переключаем класс 'no-scroll'
  if (item && active) {
    body.classList.toggle('no-scroll');
    console.log('bodyNoScroll work'); // Выводим сообщение для отладки
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
/* harmony export */   closeBurgerMenu: () => (/* binding */ closeBurgerMenu),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bodyNoScroll_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bodyNoScroll.js */ "./js/modules/bodyNoScroll.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");



/**
 * Функция getHeaderHeightInPx возвращает высоту хедера в пикселях,
 * корректно обработав значение CSS-переменной --header-height, которая может быть задана в vh или px.
 *
 * @returns {number} Высота хедера в пикселях.
 */
function getHeaderHeightInPx() {
  let headerHeightValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .trim();

  // Если значение задано в vh, конвертируем в пиксели
  if (headerHeightValue.endsWith('vh')) {
    const vhValue = parseFloat(headerHeightValue);
    return (vhValue / 100) * window.innerHeight;
  }

  // Если значение задано в px, возвращаем числовое значение
  if (headerHeightValue.endsWith('px')) {
    return parseFloat(headerHeightValue);
  }

  // В остальных случаях возвращаем 0
  return 0;
}

/**
 * Функция scrollWithOffset осуществляет плавную прокрутку к целевому элементу
 * с учётом отступа, равного высоте хедера (CSS-переменная --header-height).
 *
 * @param {string} targetSelector - Селектор целевого элемента (например, "#section1")
 */
function scrollWithOffset(targetSelector) {
  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) return;

  const headerHeight = getHeaderHeightInPx();
  const elementTop =
    targetElement.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementTop - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

/**
 * Функция closeBurgerMenu закрывает бургер-меню, удаляя класс "active"
 * у элемента, соответствующего селектору toggleItemSelector, и вызывая bodyNoScroll.
 *
 * @param {string} toggleItemSelector - Селектор элемента, у которого переключается класс "active" (по умолчанию ".burger__content").
 */
function closeBurgerMenu(toggleItemSelector = '.burger__content') {
  const toggleItem = document.querySelector(toggleItemSelector);
  if (toggleItem && toggleItem.classList.contains('active')) {
    toggleItem.classList.remove('active');
    (0,_bodyNoScroll_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    console.log('Burger menu closed');
  }
}

/**
 * Функция toggleActive отвечает за переключение активного состояния
 * для элементов бургер-меню.
 *
 * Параметры:
 *  @param {string} parent - Селектор родительского элемента (по умолчанию ".header__burger").
 *  @param {string} item - Селектор дочерних элементов, для которых производится проверка (по умолчанию ".header__burger-line").
 *  @param {string} toggleItemSelector - Селектор элемента, у которого переключается класс "active" (по умолчанию ".burger__content").
 */
function toggleActive(
  parent = '.header__burger',
  item = '.header__burger-line',
  toggleItemSelector = '.burger__content',
) {
  // Получаем родительский элемент (бургер-иконку)
  const parentElement = document.querySelector(parent);
  if (!parentElement) {
    console.error(`Не найден родительский элемент по селектору "${parent}"`);
    return;
  }

  // Получаем все дочерние элементы (например, линии бургер-иконки)
  const items = document.querySelectorAll(item);
  if (!items.length) {
    console.error(`Не найдены элементы по селектору "${item}"`);
    return;
  }

  // Получаем элемент, у которого будет переключаться класс "active" (само меню)
  const toggleItem = document.querySelector(toggleItemSelector);
  if (!toggleItem) {
    console.error(
      `Не найден элемент для переключения по селектору "${toggleItemSelector}"`,
    );
    return;
  }

  /**
   * Функция toggle:
   * 1. Переключает блокировку прокрутки через bodyNoScroll.
   * 2. Логгирует информацию в консоль.
   * 3. Переключает класс "active" у toggleItem.
   */
  function toggle() {
    (0,_bodyNoScroll_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
    console.log('burger clicked');
    console.log(toggleItem);
    toggleItem.classList.toggle('active');
    console.log('Поменяли класс active у элемента');
  }

  // Привязываем обработчик клика к родительскому элементу (бургер-иконке)
  parentElement.addEventListener('click', toggle);

  // Обработчик для закрытия бургер-меню при клике на пункт меню
  // Здесь предполагается, что пункты меню внутри toggleItem – это ссылки (<a>)
  toggleItem.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      event.preventDefault();

      // Извлекаем id целевого блока из атрибута href
      const targetID = event.target.getAttribute('href');
      if (targetID && targetID.startsWith('#')) {
        scrollWithOffset(targetID);
      }

      // Закрываем бургер-меню через вызов функции closeBurgerMenu
      closeBurgerMenu(toggleItemSelector);
      console.log('Burger menu closed after clicking menu item');
    }
  });
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
/* harmony import */ var _replaceImg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replaceImg.js */ "./js/modules/replaceImg.js");
// Импортируем модуль для обновления изображений при выборе параметров


/**
 * Функция calc инициализирует калькулятор показателей тела (BMI, тариф) по введённым данным.
 * Выполняет настройку значений по умолчанию, обработку кликов по статическим элементам и ввод динамических значений.
 */
function calc() {
  // Объявляем переменные для хранения выбранных параметров и введённых данных
  let sex, height, weight, age, ratio;

  // Элементы для вывода результата и информации об индексе
  const result = document.querySelector('.calculating__result span');
  const index = document.querySelector('.calculating__result.bmi span');
  const indexInfo = document.querySelector('.calculating__total.bmi.info span');
  const tariffInfo = document.querySelector(
    '.calculating__total.bmi.tariff span',
  );
  const tariffImg = document.querySelector('.tariff--img'); // не используется, но оставлено для возможного использования

  // Инициализация значений по умолчанию для пола и коэффициента активности из localStorage
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = parseFloat(localStorage.getItem('ratio'));
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', '1.375');
  }

  /**
   * Функция initLocalSettings устанавливает активный класс для элементов выбора (пол, коэффициент),
   * основываясь на значениях, сохраненных в localStorage.
   * @param {string} selector - CSS-селектор для выбора элементов.
   * @param {string} activeClass - CSS-класс для активного состояния.
   */
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

  // Инициализируем активные состояния для выбора пола и коэффициента активности
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings(
    '.calculating__choose_big div',
    'calculating__choose-item_active',
  );

  /**
   * Функция calcTotal рассчитывает общий результат (калории или другой показатель)
   * в зависимости от выбранного пола, уровня активности и введённых данных.
   */
  function calcTotal() {
    // Если не все данные введены, выводим заглушку
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    // Вычисляем результат по разным формулам для женского и мужского пола
    if (sex === 'female') {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio,
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio,
      );
    }

    // Если результат не является числом, очищаем вывод
    if (
      isNaN(result.textContent) ||
      !/^-?\d+(\.\d+)?$/.test(result.textContent)
    ) {
      result.textContent = '____';
    }
  }

  /**
   * Функция calcIndex вычисляет индекс массы тела (BMI) и отображает информацию об интерпретации результата.
   */
  function calcIndex() {
    // Элементы контейнеров для вывода дополнительной информации
    const indexValueContainer = document.querySelector(
      '.calculating__total.bmi.info',
    );
    const tariffInfoContainer = document.querySelector(
      '.calculating__total.bmi.tariff',
    );

    // Объект с URL-ами изображений для разных диапазонов BMI
    const imageUrls = {
      underweight: '../img/food/slider_food1.png',
      normal: '../img/food/slider__food2.png',
      overweight: '../img/food/slider__food3.png',
      obesity: '../img/food/slider__food4.png',
    };

    // Если рост или вес не заданы, скрываем информацию и выводим заглушку
    if (!height || !weight) {
      index.textContent = '____';
      indexValueContainer.style.display = 'none';
      tariffInfoContainer.style.display = 'none';
      return;
    } else {
      // Отображаем блоки с информацией
      indexValueContainer.style.display = 'flex';
      tariffInfoContainer.style.display = 'flex';

      // Расчет BMI с округлением до одного знака после запятой
      const indexValue = +((10000 * weight) / (height * height)).toFixed(1);
      index.textContent = indexValue;

      // Определяем текстовое описание и тариф в зависимости от значения BMI
      if (indexValue <= 16) {
        indexInfo.textContent = 'Выраженный дефицит массы тела';
        tariffInfo.textContent = 'Набор веса';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.underweight})`;
      } else if (indexValue > 16 && indexValue <= 18.4) {
        indexInfo.textContent = 'Недостаточная (дефицит) масса тела';
        tariffInfo.textContent = 'Набор веса';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.underweight})`;
      } else if (indexValue >= 18.5 && indexValue <= 24.9) {
        indexInfo.textContent = 'Норма';
        tariffInfo.textContent = 'Баланс';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.normal})`;
      } else if (indexValue >= 25 && indexValue <= 29.9) {
        indexInfo.textContent = 'Избыточная масса тела';
        tariffInfo.textContent = 'Похудение';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
      } else if (indexValue >= 30 && indexValue <= 34.9) {
        indexInfo.textContent = 'Ожирение первой степени';
        tariffInfo.textContent = 'Похудение';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
      } else if (indexValue >= 35 && indexValue <= 39.9) {
        indexInfo.textContent = 'Ожирение второй степени';
        tariffInfo.textContent = 'Похудение';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.obesity})`;
      } else if (indexValue >= 40) {
        indexInfo.textContent = 'Ожирение третьей степени (морбидное)';
        tariffInfo.textContent = 'Похудение';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.obesity})`;
      }
    }
  }

  // Вызываем функции расчёта после инициализации
  calcTotal();
  calcIndex();

  /**
   * Функция getStaticInformation обрабатывает клики по статическим элементам выбора (пол, коэффициент).
   * При клике обновляются соответствующие переменные, сохраняются в localStorage и пересчитываются показатели.
   * @param {string} parentSelector - CSS-селектор родительского контейнера.
   * @param {string} activeClass - CSS-класс для активного состояния.
   */
  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    const parent = document.querySelector(parentSelector);

    parent.addEventListener('click', (event) => {
      const elementWithRatio = event.target.closest('[data-ratio]');
      if (elementWithRatio) {
        // Обработка выбора коэффициента активности
        const ratioValue = elementWithRatio.getAttribute('data-ratio');
        ratio = parseFloat(ratioValue);
        if (!isNaN(ratio)) {
          localStorage.setItem('ratio', ratioValue);
        }
      } else if (event.target.id === 'female' || event.target.id === 'male') {
        // Обработка выбора пола
        sex = event.target.getAttribute('id');
        localStorage.setItem('sex', sex);
      }
      // Удаляем активный класс у всех элементов
      elements.forEach((elem) => {
        elem.classList.remove(activeClass);
      });
      // Если клик был по нужному элементу, добавляем активный класс и обновляем изображения
      if (
        event.target.matches(
          '.calculating__choose-item, .calculating__choose-item *',
        )
      ) {
        const targetElement =
          event.target.closest('.calculating__choose-item') || event.target;
        targetElement.classList.add(activeClass);
        (0,_replaceImg_js__WEBPACK_IMPORTED_MODULE_0__["default"])(parentSelector, 'calculating__choose-item', activeClass);
      }
      // Пересчитываем показатели после обновления выбора
      calcTotal();
      calcIndex();
    });
  }

  // Привязываем обработчики кликов для элементов выбора пола и коэффициента
  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation(
    '.calculating__choose_big',
    'calculating__choose-item_active',
  );

  /**
   * Функция getDynamicInformation обрабатывает ввод динамических данных (рост, вес, возраст),
   * добавляет подсветку при ошибке ввода и пересчитывает показатели.
   * @param {string} selector - CSS-селектор поля ввода.
   */
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      // Если введены нечисловые символы, добавляем класс invalid для визуальной подсветки ошибки
      if (input.value.match(/\D/g)) {
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
      // Назначаем введенное значение соответствующей переменной
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
      // Пересчитываем показатели при каждом изменении значения
      calcTotal();
      calcIndex();
    });
  }

  // Привязываем обработчики ввода для полей: рост, вес, возраст
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

// Запускаем калькулятор после загрузки DOM
document.addEventListener('DOMContentLoaded', calc);

// Экспорт функции calc можно добавить, если требуется её использование в других модулях
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);


/***/ }),

/***/ "./js/modules/callMeBack.js":
/*!**********************************!*\
  !*** ./js/modules/callMeBack.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Функция для инициализации обработки формы обратного звонка.
 * Находит необходимые элементы, устанавливает обработчики событий
 * и выполняет валидацию, сбор данных, получение геолокации и отправку данных на сервер.
 */
function callMeBack() {
  // Получение элементов формы
  const nameInput = document.querySelector('.order__input.order__input--name');
  const numberInput = document.querySelector(
    '.order__input.order__input--number',
  );
  const callBtn = document.querySelector('.order__btn');

  // Регулярное выражение для валидации телефонного номера
  const phoneRegex = /^\+?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  /**
   * Валидация заполнения формы.
   * @returns {boolean} isValid - true, если поля заполнены корректно.
   */
  function validateForm() {
    let isValid = true;

    // Очистка предыдущих сообщений об ошибке
    nameInput.classList.remove('invalid');
    numberInput.classList.remove('invalid');

    // Проверка на пустое значение поля имени
    if (!nameInput.value.trim()) {
      nameInput.classList.add('invalid');
      isValid = false;
    }

    // Проверка телефонного номера по регулярному выражению
    if (!phoneRegex.test(numberInput.value.trim())) {
      numberInput.classList.add('invalid');
      isValid = false;
    }

    return isValid;
  }

  /**
   * Получение текущего времени в формате ISO.
   * @returns {string} Текущее время в формате ISO.
   */
  function getCurrentTime() {
    const now = new Date();
    return now.toISOString();
  }

  /**
   * Получение координат пользователя через Geolocation API.
   * @returns {Promise<Object>} Промис, который разрешается с объектом { latitude, longitude }.
   */
  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(new Error(`Geolocation error: ${error.message}`));
          },
        );
      }
    });
  }

  /**
   * Преобразование координат (latitude, longitude) в город и страну с использованием OpenCage API.
   * @param {Object} coords - Объект с широтой и долготой.
   * @returns {Promise<Object>} Промис, который разрешается с объектом { city, country }.
   */
  async function getCityAndCountry({ latitude, longitude }) {
    const apiKey = 'e6956a4aa92240e2ad6c176774e3c2d7'; // API ключ для OpenCage
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      // Извлекаем город и страну из первого результата или устанавливаем null
      const { city, country } = data.results[0]?.components || {
        city: null,
        country: null,
      };
      return { city, country };
    } catch (error) {
      console.warn('Error fetching city and country:', error.message);
      return { city: null, country: null };
    }
  }

  /**
   * Отображение индикатора загрузки.
   * @returns {HTMLElement} Элемент индикатора загрузки.
   */
  function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    document.body.appendChild(spinner);
    return spinner;
  }

  /**
   * Удаление индикатора загрузки после отправки данных.
   * @param {HTMLElement} statusMessage - Элемент индикатора загрузки.
   */
  function cleanupAfterSubmission(statusMessage) {
    if (statusMessage && statusMessage.parentNode) {
      statusMessage.parentNode.removeChild(statusMessage);
    }
  }

  /**
   * Отображение сообщения пользователю после отправки формы.
   * @param {string} message - Сообщение для отображения.
   */
  function showThanksModal(message) {
    // В дальнейшем можно заменить стандартный alert на кастомное модальное окно.
    alert(message);
  }

  /**
   * Основная обработка отправки формы.
   * Здесь происходит валидация, сбор данных формы, получение времени,
   * геолокации, преобразование координат в адрес и отправка данных на сервер.
   * @param {Event} e - Событие отправки.
   */
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Валидация формы; если не прошла, прекращаем выполнение функции
    if (!validateForm()) return;

    // Отображаем индикатор загрузки
    const statusMessage = showLoadingSpinner();

    try {
      // Получение текущего времени
      const currentTime = getCurrentTime();

      // Получение геолокации пользователя с обработкой возможного отказа
      let location = null;
      try {
        location = await getUserLocation();
      } catch (locationError) {
        console.warn(locationError.message);
        location = { latitude: null, longitude: null };
      }

      // Получение города и страны на основе координат
      const { city, country } = await getCityAndCountry(location);

      // Формирование данных для отправки на сервер
      const formData = {
        name: nameInput.value.trim(),
        phone: numberInput.value.trim(),
        time: currentTime,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          city: city,
          country: country,
        },
      };

      // Отправка данных на сервер методом POST
      const response = await fetch('http://localhost:3000/callMeBack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Проверка статуса ответа от сервера
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Чтение ответа сервера
      const text = await response.text();
      console.log('Server response:', text);

      // Парсинг ответа в JSON-формат
      const data = JSON.parse(text);

      // Валидация структуры ответа от сервера
      if (!data || typeof data.success !== 'boolean') {
        throw new Error('Invalid server response format');
      }

      if (!data.success) {
        throw new Error('Failed to send request');
      }

      // Если все прошло успешно, выводим сообщение для пользователя
      showThanksModal('Спасибо! Мы скоро свяжемся с вами.');
    } catch (error) {
      // Обработка ошибок при отправке данных
      console.error('Form submission error:', error.message);
      showThanksModal('Что-то пошло не так...');
    } finally {
      // Удаление индикатора загрузки в любом случае
      cleanupAfterSubmission(statusMessage);
    }
  }

  // Привязываем событие клика к обработчику отправки формы
  callBtn.addEventListener('click', handleFormSubmit);
}

// Инициализация модуля после загрузки DOM
document.addEventListener('DOMContentLoaded', callMeBack);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (callMeBack);


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
/*
  Данный модуль отвечает за создание карточек меню и реализацию функционала переключения табов.
  Используется для получения данных с сервера, создания карточек (MenuCard) и обработки событий
  переключения табов по нажатию на соответствующие кнопки.
*/

function cards() {
  // Класс MenuCard предназначен для создания карточек меню
  class MenuCard {
    /**
     * Конструктор класса MenuCard.
     * @param {string} imgSrc - Путь к изображению.
     * @param {string} alt - Альтернативный текст изображения.
     * @param {string} title - Заголовок карточки.
     * @param {string} description - Описание карточки.
     * @param {number} price - Цена в исходной валюте.
     * @param {string} parentSelector - Селектор родительского элемента для вставки карточки.
     * @param {number|string} tab - Идентификатор таба для переключения.
     * @param  {...string} classes - Дополнительные классы для карточки.
     */
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
      // Получаем родительский элемент по селектору
      this.parent = document.querySelector(parentSelector);
      this.imgSrc = imgSrc;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.transfer = 50; // Коэффициент для конвертации цены
      this.changeTo(); // Конвертируем цену
      this.classes = classes;
      this.tab = tab;
    }

    // Метод для преобразования цены
    changeTo() {
      this.price = this.price * this.transfer;
    }

    /**
     * Метод для отрисовки карточки в DOM.
     * Создает элемент, добавляет необходимые классы и наполняет его HTML содержимым.
     */
    render() {
      const element = document.createElement('div');

      // Если дополнительные классы не указаны, присваиваем класс по умолчанию
      if (this.classes.length === 0) {
        // Можно использовать локальную переменную вместо this.element, так как она не используется вне метода
        element.classList.add('menu__item');
      } else {
        // Если классы переданы, добавляем их ко всем элементу
        this.classes.forEach((className) => element.classList.add(className));
      }

      // Формируем внутреннее содержимое карточки
      element.innerHTML = `
        <img src="${this.imgSrc}" alt="${this.alt}" />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
        <a href="#preview">
          <div class="menu__item-select" data-tab="tab-${this.tab}">Перейти</div>
        </a>
      `;

      // Добавляем карточку в указанный родительский элемент
      this.parent.append(element);
    }
  }

  /**
   * Асинхронная функция для получения ресурсов с сервера.
   * @param {string} url - Ссылка для запроса.
   * @returns {Promise<any>} - Возвращаем JSON данные.
   */
  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      // Генерируем ошибку если запрос завершился неудачно
      throw new Error(
        `Не удалось получить данные с ${url}, статус: ${res.status}`,
      );
    }
    return await res.json();
  };

  // Получаем данные меню с сервера и создаем карточки
  getResource('http://localhost:3000/menu')
    .then((data) => {
      console.log(data);

      // Для каждого элемента данных создаем карточку и отрисовываем её
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

      // Функция для организации переключения табов
      function menuTabSwitch() {
        // Получаем все кнопки для переключения и родительский контейнер табов
        const selectBtn = document.querySelectorAll('.menu__item-select');
        const tabsParent = document.querySelector('.tabheader__items');

        /**
         * Обработчик переключения табов.
         * Генерирует событие 'tabswitch' с данными выбранного таба.
         * @param {HTMLElement} btn - Элемент кнопки, по которому кликнули.
         */
        function handleTabSwitch(btn) {
          const dataTab = btn.dataset.tab;
          console.log(dataTab);
          // Генерация кастомного события для переключения табов
          tabsParent.dispatchEvent(
            new CustomEvent('tabswitch', { detail: { dataTab } }),
          );
        }

        // Назначаем обработчик для каждой кнопки выбора
        selectBtn.forEach((btn) => {
          btn.addEventListener('click', () => {
            handleTabSwitch(btn);
          });
        });
      }

      // Вызываем функцию для настройки переключения табов
      menuTabSwitch();

      // Вызываем функцию переключения табов.
      // Замечание: функция tabs должна быть определена в другом модуле и импортирована в проект.
      tabs(
        '.tabheader__item',
        '.tabcontent',
        '.tabheader__items',
        '.tabcontent__bot-cards',
        '.tabdays__choise-btn',
      );
    })
    .catch((error) => {
      console.error('Ошибка получения данных меню:', error);
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/modules/collapsed.js":
/*!*********************************!*\
  !*** ./js/modules/collapsed.js ***!
  \*********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
/**
 * Enable collapse/expand functionality for multiple menu fields.
 *
 * This function selects multiple elements matching the given selectors
 * for menu fields and their corresponding toggle buttons. It sets the initial
 * state (collapsed) for each menu field and attaches an event listener to
 * toggle the collapse class and update the button text.
 *
 * @param {string} sectionSelector  - CSS selector for menu field elements (default: '.menu__field')
 * @param {string} toggleSelector   - CSS selector for toggle button elements (default: '.menu .expand')
 * @param {number} rename           - Flag to indicate if button text should be updated (default: 1)
 */
function collapsed(
  sectionSelector = '.menu__field',
  toggleSelector = '.menu .expand',
  rename = 1,
) {
  // Получаем коллекцию DOM-элементов для полей меню
  const menuFields = document.querySelectorAll(sectionSelector);
  // Получаем коллекцию DOM-элементов для кнопок переключения
  const toggleButtons = document.querySelectorAll(toggleSelector);

  // Проверка наличия необходимых элементов
  if (menuFields.length === 0) {
    console.error(`Элементы с селектором "${sectionSelector}" не найдены.`);
    return;
  }
  if (toggleButtons.length === 0) {
    console.error(`Элементы с селектором "${toggleSelector}" не найдены.`);
    return;
  }
  if (menuFields.length !== toggleButtons.length) {
    console.warn(
      `Несоответствие: количество полей меню (${menuFields.length}) не совпадает с количеством кнопок (${toggleButtons.length}). Будет обработано минимальное количество совпадающих элементов.`,
    );
  }

  // Определяем количество пар для обработки
  const count = Math.min(menuFields.length, toggleButtons.length);

  // Устанавливаем первоначальное состояние для каждой пары элементов
  for (let i = 0; i < count; i++) {
    const menuField = menuFields[i];
    const toggleButton = toggleButtons[i];

    // Устанавливаем первоначальное состояние: меню свернуто
    menuField.classList.add('collapsed');
    // Устанавливаем текст кнопки, если требуется переименование
    if (rename) {
      toggleButton.textContent = 'Развернуть';
    }

    // Добавляем обработчик события клика на кнопку
    toggleButton.addEventListener('click', () => {
      // Переключаем класс 'collapsed' для изменения состояния меню
      menuField.classList.toggle('collapsed');
      // Изменяем текст кнопки в зависимости от текущего состояния меню
      if (rename) {
        toggleButton.textContent = menuField.classList.contains('collapsed')
          ? 'Развернуть'
          : 'Свернуть';
      }
    });
  }
}

// Экспортируем функцию для использования в других модулях, если требуется
if ( true && typeof module.exports !== 'undefined') {
  module.exports = collapsed;
} else {
  window.collapsed = collapsed;
}

// Пример инициализации, если модуль загружается напрямую
// Для использования, раскомментируйте следующую строку:
// collapsed();

// Экспортируем функцию для использования в других частях приложения
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
/**
 * Функция для настройки поведения фиксированной промо-блокировки,
 * которая меняет классы элемента в зависимости от положения прокрутки.
 */
function fixedPromo() {
  /**
   * Обработчик события прокрутки страницы.
   * Проверяет позицию прокрутки и обновляет классы рекламного блока.
   */
  function handleScroll() {
    // Получаем рекламный блок и родительский контейнер
    const promoElement = document.querySelector('.tabcontainer__bot-promo');
    const parent = document.querySelector('.tabcontainer');

    // Проверяем наличие обязательных элементов
    if (!promoElement) {
      console.error('Элемент с классом .tabcontainer__bot-promo не найден');
      return; // Прерываем выполнение, если рекламный блок не найден
    }
    if (!parent) {
      console.error('Элемент с классом .tabcontainer не найден');
      return; // Прерываем выполнение, если родительский контейнер не найден
    }

    // Вычисляем вертикальную позицию родительского контейнера относительно начала документа
    const promoElementPosition =
      parent.getBoundingClientRect().top + window.scrollY;
    // Текущая позиция прокрутки страницы
    const scrollPosition = window.scrollY;

    // Если страница прокручена ниже или равна началу рекламного блока:
    // Убираем класс фиксированного нижнего позиционирования,
    // иначе добавляем его для возврата к абсолютному позиционированию.
    if (scrollPosition >= promoElementPosition) {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedBot');
    } else {
      promoElement.classList.add('tabcontainer__bot-promo--fixedBot');
    }

    // Если прокрутка значительно превышает начальную позицию рекламного блока
    // (расчетный порог: высота элемента, умноженная на 15),
    // переключаем фиксированное верхнее позиционирование.
    if (
      scrollPosition >
      promoElementPosition + promoElement.offsetHeight * 15
    ) {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedBot');
      promoElement.classList.add('tabcontainer__bot-promo--fixedTop');
    } else {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedTop');
    }
  }

  // Добавляем обработчик события скролла к документу.
  document.addEventListener('scroll', handleScroll);
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
  const forms = document.querySelectorAll('.modalForm');
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

/***/ "./js/modules/location.js":
/*!********************************!*\
  !*** ./js/modules/location.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Модуль для отображения модального окна выбора города России.
 *
 * После выбора города, значение сохраняется в Local Storage,
 * а также обновляется отображение выбранного города на странице.
 *
 * Структура модального окна соответствует готовым стилям:
 * - Основной контейнер: класс "modal"
 * - При открытии модалки добавляется класс "show"
 * - Внутри модалки: "modal__dialog"
 * - Внутри диалога: "modal__content"
 * - Элемент для закрытия: <div data-close="" class="modal__close">×</div>
 * - Заголовок модального окна: <div class="modal__title">Выберите город</div>
 *
 * Использование:
 * Импортируйте модуль и вызовите функцию initCityModal().
 *
 * Пример:
 * import initCityModal from './location.js';
 * initCityModal();
 */ // Файл: js/modules/auth.js
// Описание: Модуль для управления модальным окном авторизации/регистрации.
// Исправлена проблема двойного открытия модалки за счет предотвращения повторной инициализации и контроля автооткрытия.
function initCityModal() {
  // Элемент для отображения выбранного города (например, в header)
  const locationText = document.querySelector('#location-text');

  // Если город уже выбран (сохранён в localStorage), обновляем его отображение
  const savedCity = localStorage.getItem('selectedCity');
  if (savedCity && locationText) {
    locationText.textContent = savedCity;
  }

  // Элемент, при клике на который открывается модальное окно выбора города.
  // В данном примере предполагается, что у него id="city"
  const cityButton = document.getElementById('city');
  if (!cityButton) {
    console.error('Элемент для выбора города (#city) не найден!');
    return;
  }

  // Создаём модальное окно, если оно ещё не добавлено в документ.
  // Добавляем дополнительный класс "city-modal" для удобной идентификации.
  let modal = document.querySelector('.city-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.classList.add('modal', 'city-modal');
    modal.innerHTML = `
      <div class="modal__dialog">
        <div class="modal__content">
          <div data-close class="modal__close">×</div>
          <div class="modal__title">Выберите город</div>
          <ul class="city-list">
            <li class="city-item">Москва</li>
            <li class="city-item">Санкт-Петербург</li>
            <li class="city-item">Новосибирск</li>
            <li class="city-item">Екатеринбург</li>
            <li class="city-item">Казань</li>
            <li class="city-item">Нижний Новгород</li>
            <li class="city-item">Челябинск</li>
            <li class="city-item">Омск</li>
            <li class="city-item">Самара</li>
            <li class="city-item">Воронеж</li>
            <li class="city-item">Ростов-на-Дону</li>
          </ul>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Функция для открытия модального окна
  const openModal = () => modal.classList.add('show');

  // Функция для закрытия модального окна
  const closeModal = () => modal.classList.remove('show');

  // При клике на кнопку выбора города открываем модальное окно
  cityButton.addEventListener('click', openModal);

  // Обработчик закрытия модального окна:
  // - При клике на элемент с атрибутом data-close (иконка закрытия)
  // - Или при клике вне области диалога (на сам контейнер модального окна)
  modal.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-close') || event.target === modal) {
      closeModal();
    }
  });

  // Назначаем обработчики клика для каждого элемента списка городов.
  // При выборе города:
  // 1. Сохраняем выбранный город в localStorage.
  // 2. Обновляем отображение выбранного города в элементе locationText.
  // 3. Закрываем модальное окно.
  const cityItems = modal.querySelectorAll('.city-item');
  cityItems.forEach((item) => {
    item.addEventListener('click', () => {
      const selectedCity = item.textContent.trim();
      localStorage.setItem('selectedCity', selectedCity);
      if (locationText) {
        locationText.textContent = selectedCity;
      }
      closeModal();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initCityModal);


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
/*
 * Функция menuCardSlider отвечает за создание горизонтального слайдера для карточек.
 * При этом реализована инерционная прокрутка и обработка событий мыши и касаний для мобильных устройств.
 */
function menuCardSlider(cardContainerOpt) {
  // Определяем элемент контейнера карточек. Если передан аргумент, используем его, иначе ищем элемент с классом.
  let cardContainer =
    cardContainerOpt || document.querySelector('.tabcontent__bot-cards');

  // Если контейнер не найден, прекращаем выполнение.
  if (!cardContainer) return;

  // Переменные для работы с мышью
  let isDown = false; // Флаг удержания кнопки мыши
  let startX; // Начальная позиция по X при нажатии мыши
  let scrollLeft; // Начальная позиция скролла контейнера
  let velocity = 0; // Переменная для хранения скорости при инерционной прокрутке

  // Обработчик нажатия мыши
  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - cardContainer.offsetLeft; // Запоминаем относительную позицию курсора
    scrollLeft = cardContainer.scrollLeft; // Сохраняем начальное положение прокрутки
    velocity = 0; // Сброс скорости при новом начале перетаскивания
    cardContainer.style.cursor = 'grabbing'; // Изменяем курсор для визуальной обратной связи
  };

  // Обработчик движения мыши
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault(); // Отменяем стандартное поведение для предотвращения выделения текста
    const x = e.pageX - cardContainer.offsetLeft;
    const walk = (x - startX) * 2; // Вычисляем пройденное расстояние с коэффициентом для усиления эффекта
    velocity = walk; // Обновляем скорость перетаскивания
    cardContainer.scrollLeft = scrollLeft - walk; // Обновление скролла контейнера на основании пройденного расстояния
  };

  // Обработчик завершения работы с мышью (отпускание кнопки или уход курсора за окно)
  const handleMouseUpOrLeave = () => {
    isDown = false;
    cardContainer.style.cursor = 'grab'; // Возвращаем курсор к исходному виду
    beginScrollDeceleration(); // Запускаем инерционную прокрутку после отпуска мыши
  };

  // Функция инерционной прокрутки для мыши
  const beginScrollDeceleration = () => {
    if (Math.abs(velocity) < 0.5) return; // Если скорость мала, прекращаем анимацию
    velocity *= 0.95; // Замедляем скорость (коэффициент замедления)
    cardContainer.scrollLeft -= velocity; // Продолжаем сдвигать контейнер
    requestAnimationFrame(beginScrollDeceleration); // Рекурсивно вызываем функцию для плавной анимации
  };

  // Добавляем события мыши к контейнеру и окну
  cardContainer.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUpOrLeave);
  window.addEventListener('mouseleave', handleMouseUpOrLeave);
  cardContainer.style.cursor = 'grab'; // Изначальный стиль курсора

  // Переменные для обработки событий касания (touch)
  let isTouching = false; // Флаг активации касания
  let touchStartX; // Начальная координата X для касания
  let touchStartY; // Начальная координата Y для касания
  let touchScrollLeft; // Начальное положение прокрутки для касания
  let touchVelocity = 0; // Скорость движения при касании
  let isScrolling; // Флаг для определения, идет вертикальная прокрутка (true) или горизонтальная (false)

  // Обработчик начала касания
  const handleTouchStart = (e) => {
    isTouching = true;
    isScrolling = undefined; // Сброс определения направления движения
    touchStartX = e.touches[0].pageX - cardContainer.offsetLeft; // Сохраняем относительную координату X
    touchStartY = e.touches[0].pageY; // Сохраняем координату Y
    touchScrollLeft = cardContainer.scrollLeft; // Запоминаем начальный скролл
    touchVelocity = 0; // Сброс скорости
  };

  // Обработчик движения при касании
  const handleTouchMove = (e) => {
    if (!isTouching) return;
    const currentX = e.touches[0].pageX - cardContainer.offsetLeft;
    const currentY = e.touches[0].pageY;
    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;

    // Определяем направление движения при первом событии touchmove,
    // сравнивая смещения по вертикали и горизонтали
    if (typeof isScrolling === 'undefined') {
      isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
    }

    // Если определено, что пользователь свайпает вертикально,
    // не перехватываем событие, чтобы дать возможность прокрутить страницу.
    if (isScrolling) {
      return;
    }

    // Если движение горизонтальное, предотвращаем стандартное поведение и обрабатываем свайп.
    e.preventDefault();
    const walk = deltaX * 2; // Расчет расстояния с усилителем
    touchVelocity = walk; // Обновляем скорость касания
    cardContainer.scrollLeft = touchScrollLeft - walk; // Обновляем положение скролла
  };

  // Обработчик завершения касания
  const handleTouchEnd = () => {
    isTouching = false;
    beginTouchDeceleration(); // Запускаем инерционную прокрутку для касания
  };

  // Функция инерционной прокрутки для касания
  const beginTouchDeceleration = () => {
    if (Math.abs(touchVelocity) < 0.5) return; // Если скорость мала, прекращаем анимацию
    touchVelocity *= 0.95; // Замедляем скорость
    cardContainer.scrollLeft -= touchVelocity; // Обновляем позицию скролла
    requestAnimationFrame(beginTouchDeceleration); // Рекурсивный вызов для плавной анимации
  };

  // Добавляем события касания к контейнеру с указанием passive: false, чтобы можно было вызвать e.preventDefault()
  cardContainer.addEventListener('touchstart', handleTouchStart);
  cardContainer.addEventListener('touchmove', handleTouchMove, {
    passive: false,
  });
  cardContainer.addEventListener('touchend', handleTouchEnd);

  // Возвращаем функцию для удаления всех обработчиков событий при необходимости очистки
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

/***/ "./js/modules/moveContent.js":
/*!***********************************!*\
  !*** ./js/modules/moveContent.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ insertContent)
/* harmony export */ });
/**
 * Функция для перемещения контента между элементами в зависимости от разрешения окна.
 *
 * @param {number} slideIndex - Индекс слайда для формирования селекторов элементов.
 * @param {string} elementBase - Базовый селектор для элемента-источника контента (по умолчанию '.offer__descr-right').
 * @param {string} wrapperBase - Базовый селектор для целевого элемента заполнения контентом (по умолчанию '.offer__descr-left').
 * @param {number} breakpoint - Точка останова (в пикселях), при которой происходит перенос контента (по умолчанию 768).
 */
function insertContent(
  slideIndex,
  elementBase = '.offer__descr-right',
  wrapperBase = '.offer__descr-left',
  breakpoint = 768,
) {
  // Формирование селекторов для поиска элементов по индексам
  const elementSelector = `${elementBase}--${slideIndex}`;
  const wrapperSelector = `${wrapperBase}--${slideIndex}`;

  // Поиск оригинального и целевого элементов в DOM
  const originalParent = document.querySelector(elementSelector);
  const targetParent = document.querySelector(wrapperSelector);

  // Массив для хранения изначального содержимого оригинального элемента
  const originalContent = [];

  // Сохраняем все дочерние узлы оригинального элемента для последующего восстановления
  if (originalParent) {
    originalContent.push(...originalParent.childNodes);
  }

  /**
   * Функция перемещения контента для мобильного разрешения.
   * При ширине окна <= breakpoint переносит все дочерние элементы из оригинального блока в целевой.
   * При увеличении окна восстанавливает исходное содержимое.
   */
  function moveContentForMobile() {
    // Обращаемся к DOM-элементам по сформированным селекторам
    const descrLeft = document.querySelector(wrapperSelector);
    const descrRight = document.querySelector(elementSelector);

    // Если экран имеет ширину меньше или равную breakpoint, переносим контент из правого блока в левый
    if (window.matchMedia(`(max-width: ${breakpoint}px)`).matches) {
      if (descrRight && descrLeft) {
        // Перенос всех дочерних элементов из descrRight в descrLeft
        while (descrRight.firstChild) {
          descrLeft.appendChild(descrRight.firstChild);
        }
      }
    } else {
      // При увеличении окна возвращаем исходное содержимое обратно в оригинальный блок
      if (descrRight && originalContent.length > 0) {
        originalContent.forEach((node) => {
          descrRight.appendChild(node);
        });
      }
    }
  }

  // Первоначальный вызов функции для корректной инициализации содержимого
  moveContentForMobile();

  /**
   * Функция-обертка debounce для ограничения частоты вызова функции.
   * @param {Function} func - Функция, которую требуется ограничить.
   * @param {number} wait - Задержка в миллисекундах.
   * @returns {Function} - Обёрнутая функция с механизмом debounce.
   */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Добавляем обработчик события изменения размера окна с использованием debounce
  window.addEventListener('resize', debounce(moveContentForMobile, 100));
}


/***/ }),

/***/ "./js/modules/replaceImg.js":
/*!**********************************!*\
  !*** ./js/modules/replaceImg.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// replaceImg.js

/**
 * Функция для замены изображения в элементе в зависимости от его активного состояния.
 *
 * @param {string} containerSelector - Селектор родительского контейнера.
 * @param {string} itemClass - Класс элемента, содержащего изображение.
 * @param {string} activeClass - Класс, обозначающий активное состояние элемента.
 */
function replaceImg(containerSelector, itemClass, activeClass) {
  // Выбираем родительский контейнер по селектору
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.error(`Контейнер с селектором "${containerSelector}" не найден.`);
    return;
  }

  /**
   * Функция для обновления изображений в элементах внутри контейнера.
   * Если элемент содержит класс activeClass, используется активное изображение,
   * иначе подставляется стандартное изображение.
   */
  function updateImages() {
    // Выбираем все элементы с указанным классом внутри контейнера
    const items = container.querySelectorAll(`.${itemClass}`);
    items.forEach((item) => {
      const img = item.querySelector('img');
      if (img) {
        // Получаем пути к изображениям из data-атрибутов
        const newSrc = item.dataset.img;
        const activeSrc = item.dataset.activeImg;
        // Определяем, имеет ли элемент активное состояние
        const isActive = item.classList.contains(activeClass);
        // Устанавливаем src изображения в зависимости от состояния элемента
        img.src = isActive ? activeSrc : newSrc;
      }
    });
  }

  // Здесь можно добавить обработчик события на родительский контейнер, если требуется:
  // Например, при клике обновлять изображения для элементов,
  // убедившись, что клик произошёл по элементу с нужным классом:
  //
  // container.addEventListener('click', (event) => {
  //   if (event.target.closest(`.${itemClass}`)) {
  //     updateImages();
  //   }
  // });

  // Обновляем изображения для всех элементов сразу
  updateImages();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (replaceImg);


/***/ }),

/***/ "./js/modules/reviews.js":
/*!*******************************!*\
  !*** ./js/modules/reviews.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./js/modules/modal.js");


/**
 * Функция для работы с отзывами.
 * Управляет рейтингом, загрузкой фото, валидацией формы и отправкой данных отзыва.
 *
 * @returns {object} Объект с методом cleanup для удаления обработчиков событий.
 */
function reviews() {
  const elements = {
    ratingContainer: document.getElementById('ratingStars'),
    fileInput: document.getElementById('userPhoto'),
    form: document.getElementById('reviewForm'),
    nameInput: document.querySelector('#userName'),
    reviewText: document.querySelector('#reviewText'),
  };

  if (!elements.ratingContainer || !elements.fileInput || !elements.form) {
    console.warn('Не найдены необходимые элементы');
    return;
  }

  let selectedRating = 0;
  const MAX_REVIEW_LENGTH = 500;

  // Инициализация обработчиков событий
  initializeEventListeners();

  /**
   * Инициализирует обработчики событий для элементов формы отзыва.
   */
  function initializeEventListeners() {
    // Обработчик клика по звездам рейтинга
    elements.ratingContainer.addEventListener('click', handleRatingClick);
    // Обработчик наведения мыши на звезды рейтинга
    elements.ratingContainer.addEventListener('mouseover', handleRatingHover);
    // Обработчик ухода мыши с контейнера рейтинга: возвращает звезды в состояние выбранного рейтинга
    elements.ratingContainer.addEventListener('mouseleave', () =>
      updateStars(selectedRating),
    );

    // Обработчик изменения файла в поле загрузки фото
    elements.fileInput.addEventListener('change', (e) =>
      handleFile(e.target.files[0]),
    );

    // Обработчик отправки формы
    elements.form.addEventListener('submit', handleFormSubmit);
  }

  /**
   * Обработчик клика по звездам рейтинга.
   *
   * @param {MouseEvent} e - Событие клика.
   */
  function handleRatingClick(e) {
    if (e.target.matches('i')) {
      selectedRating = parseInt(e.target.dataset.rating);
      updateStars(selectedRating);
    }
  }

  /**
   * Обработчик наведения мыши на звезды рейтинга.
   *
   * @param {MouseEvent} e - Событие наведения.
   */
  function handleRatingHover(e) {
    if (e.target.matches('i')) {
      updateStars(parseInt(e.target.dataset.rating));
    }
  }

  /**
   * Обновляет отображение звезд рейтинга.
   *
   * @param {number} rating - Текущий рейтинг.
   */
  function updateStars(rating) {
    const stars = elements.ratingContainer.querySelectorAll('i');
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < rating);
    });
  }

  /**
   * Инициализирует зону перетаскивания для загрузки изображения.
   */
  function initializeDropZone() {
    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    dropZone.innerHTML = '<p>Перетащите изображение сюда или выберите файл</p>';
    elements.fileInput.parentElement.appendChild(dropZone);

    // Обработчик события dragover для зоны перетаскивания
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drop-zone--over');
    });

    // Обработчик события dragleave для зоны перетаскивания
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drop-zone--over');
    });

    // Обработчик события drop для зоны перетаскивания
    dropZone.addEventListener('drop', handleDrop);
  }
  // Инициализация зоны перетаскивания
  initializeDropZone();

  /**
   * Обрабатывает событие drop (перетаскивание файла) в зоне загрузки.
   *
   * @param {DragEvent} e - Событие перетаскивания.
   */
  function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drop-zone--over');

    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (isValidImageFile(file)) {
        updateFileInput(file);
        handleFile(file);
      }
    }
  }

  /**
   * Проверяет, является ли переданный файл допустимым изображением.
   *
   * @param {File} file - Файл для проверки.
   * @returns {boolean} Истина, если файл является изображением.
   */
  function isValidImageFile(file) {
    return file && file.type.startsWith('image/');
  }

  /**
   * Обновляет значение input для файла с использованием DataTransfer.
   *
   * @param {File} file - Файл для установки.
   */
  function updateFileInput(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    elements.fileInput.files = dataTransfer.files;
  }

  /**
   * Создает предпросмотр изображения.
   *
   * @param {HTMLElement} container - Контейнер для предпросмотра.
   * @param {string} imageUrl - URL изображения для предпросмотра.
   * @returns {HTMLElement} Элемент предпросмотра.
   */
  function createImagePreview(container, imageUrl) {
    const fragment = document.createDocumentFragment();
    const preview = document.createElement('div');
    preview.className = 'form__preview';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Предпросмотр';

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'form__preview-remove';
    removeButton.textContent = '×';

    preview.appendChild(img);
    preview.appendChild(removeButton);
    fragment.appendChild(preview);

    // Если уже существует предпросмотр, удаляем его
    const existingPreview = container.querySelector('.form__preview');
    if (existingPreview) existingPreview.remove();

    // Обработчик удаления предпросмотра
    removeButton.addEventListener('click', () => {
      preview.remove();
      elements.fileInput.value = '';
    });

    container.appendChild(fragment);
    return preview;
  }

  /**
   * Обрабатывает выбранный файл, создавая предпросмотр изображения.
   *
   * @param {File} file - Выбранный файл.
   */
  function handleFile(file) {
    if (!isValidImageFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      createImagePreview(elements.fileInput.parentElement, e.target.result);
    };
    reader.readAsDataURL(file);
  }

  /**
   * Обрабатывает отправку формы отзыва.
   *
   * @param {Event} e - Событие отправки формы.
   */
  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const statusMessage = showLoadingSpinner();

    try {
      const reviewData = {
        name: elements.nameInput.value,
        text: elements.reviewText.value,
        rating: selectedRating,
      };

      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ошибка! статус: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error('Не удалось отправить отзыв');
      }

      showThanksModal('Спасибо! Ваш отзыв отправлен');
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      showThanksModal('Что-то пошло не так...');
    } finally {
      cleanupAfterSubmission(statusMessage);
    }
  }

  /**
   * Проверяет корректность заполнения формы.
   *
   * @returns {boolean} Истина, если форма заполнена корректно.
   */
  function validateForm() {
    const { nameInput, reviewText, fileInput } = elements;

    if (
      !nameInput.value.trim() ||
      !reviewText.value.trim() ||
      !fileInput.files[0]
    ) {
      alert('Пожалуйста, заполните все обязательные поля');
      return false;
    }

    if (reviewText.value.length > MAX_REVIEW_LENGTH) {
      alert(`Максимальное количество символов: ${MAX_REVIEW_LENGTH}`);
      return false;
    }

    return true;
  }

  /**
   * Показывает индикатор загрузки.
   *
   * @returns {HTMLElement} Элемент индикатора загрузки.
   */
  function showLoadingSpinner() {
    const statusMessage = document.createElement('img');
    statusMessage.src = 'img/form/spinner.svg';
    statusMessage.style.cssText = 'display: block; margin: 0 auto;';
    elements.form.insertAdjacentElement('afterend', statusMessage);
    return statusMessage;
  }

  /**
   * Создает объект с данными формы.
   *
   * @returns {object} Объект с данными формы.
   */
  function createFormData() {
    return {
      name: elements.nameInput.value,
      text: elements.reviewText.value,
      rating: selectedRating,
      photo: elements.fileInput.files[0].name,
    };
  }

  /**
   * Очищает форму и сбрасывает состояние после отправки.
   *
   * @param {HTMLElement} statusMessage - Элемент индикатора загрузки.
   */
  function cleanupAfterSubmission(statusMessage) {
    statusMessage.remove();
    elements.form.reset();
    selectedRating = 0;
    updateStars(0);
    const preview = elements.form.querySelector('.form__preview');
    if (preview) preview.remove();
  }

  /**
   * Отправляет данные методом POST.
   *
   * @param {string} url - URL для отправки данных.
   * @param {object} data - Данные для отправки.
   * @returns {Promise<object>} Ответ сервера в формате JSON.
   */
  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  /**
   * Показывает модальное окно с сообщением благодарности.
   *
   * @param {string} message - Сообщение для отображения в модальном окне.
   */
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

    const closeButton = thanksModal.querySelector('[data-close]');
    closeButton.addEventListener('click', _modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal);

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
    }, 4000);
  }

  /**
   * Функция для удаления обработчиков событий.
   */
  const cleanup = () => {
    elements.ratingContainer.removeEventListener('click', handleRatingClick);
    elements.ratingContainer.removeEventListener(
      'mouseover',
      handleRatingHover,
    );
    elements.ratingContainer.removeEventListener('mouseleave', () =>
      updateStars(selectedRating),
    );
    elements.fileInput.removeEventListener('change', handleFile);
    elements.form.removeEventListener('submit', handleFormSubmit);
  };

  return {
    cleanup,
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reviews);


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

/**
 * Функция для инициализации табов.
 * @param {string} tabsItem - CSS селектор для элементов табов.
 * @param {string} tabsContentItem - CSS селектор для содержимого табов.
 * @param {string} tabsParentItem - CSS селектор для родительского элемента табов.
 * @param {string} cardsParentItem - CSS селектор для родительского элемента карточек.
 * @param {string} btnDaysItem - CSS селектор для кнопок выбора дней.
 */
function tabs(
  tabsItem,
  tabsContentItem,
  tabsParentItem,
  cardsParentItem,
  btnDaysItem,
) {
  // Получаем необходимые элементы из DOM
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

  const orderButton = document.querySelector('.tabcontainer__bot-action');
  console.log(selectBtn);

  let tabIndex = 0;
  let currentDayValue = 1;
  let currentRatioValue;
  let latestOrderData = null;
  let cooldownInterval = null;
  let orderAlertShown = false;

  if (!tabs.length || !tabsContent.length || !tabsParent || !cardsParent) {
    console.error('Не удалось найти необходимые элементы для табов');
    return;
  }

  /**
   * Скрыть содержимое всех табов и сбросить активное состояние элементов.
   */
  function hideTabsContent() {
    tabsContent.forEach((element) => {
      element.classList.add('hide');
      element.classList.remove('show', 'fade');
    });
    tabs.forEach((element) => {
      element.classList.remove('tabheader__item_active');
    });
  }

  /**
   * Показать содержимое таба по индексу.
   * @param {number} [index=0] - Индекс таба, который нужно отобразить.
   */
  function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add('tabheader__item_active');

    // Инициализируем слайдер для карточек, если элемент найден
    if (tabsContent[index].querySelector(cardsParentItem)) {
      (0,_menuCardSlider__WEBPACK_IMPORTED_MODULE_0__["default"])(tabsContent[index].querySelector(cardsParentItem));
    }

    // Если в контенте таба присутствует выбор калорий, выполняем сброс и пересчёт
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

  // Начальная инициализация табов
  hideTabsContent();
  showTabContent();

  // Слушатель кастомного события для переключения таба
  tabsParent.addEventListener('tabswitch', (event) => {
    const { dataTab } = event.detail;
    const tabNumber = parseInt(dataTab.replace(/[^0-9]/g, ''), 10);
    tabIndex = tabNumber;
    hideTabsContent();
    showTabContent(tabNumber);
    // calcKcal(choiseKcal, tabNumber);
  });

  /**
   * Устанавливает обработчик клика для переключения табов.
   */
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

  /**
   * Сброс активного состояния кнопок выбора дней к начальному.
   */
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

  /**
   * Сброс активного состояния кнопок выбора калорий к начальному.
   */
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

  /**
   * Функция для расчёта дней и обновления цены при выборе дня.
   * @param {Element} tabcaloriesChoise - Элемент выбора калорий.
   * @param {number} tabIndex - Индекс выбранного таба.
   * @param {number} ratio - Текущее соотношение калорий.
   */
  function calcDays(tabcaloriesChoise, tabIndex, ratio) {
    choiseDays.removeEventListener('click', handleChoiseDaysClick);
    /**
     * Обработчик клика по кнопкам выбора дней.
     * @param {MouseEvent} e - Событие клика.
     */
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

  /**
   * Функция для вычисления скидки в зависимости от количества дней.
   * @param {number} days - Количество дней.
   * @returns {number} - Скидка в виде десятичной дроби.
   */
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

  /**
   * Функция для расчёта калорий и обновления цены при выборе калорий.
   * @param {Element} parentSelector - Родительский элемент с выбором калорий.
   * @param {number} tabIndex - Индекс выбранного таба.
   * @param {number} dayValue - Значение выбранного дня.
   */
  function calcKcal(parentSelector, tabIndex, dayValue) {
    // Удаляем предыдущий обработчик для избежания повторных привязок
    parentSelector.removeEventListener('click', handleKcalClick);

    /**
     * Обработчик клика по кнопкам выбора калорий.
     * @param {MouseEvent} e - Событие клика.
     */
    function handleKcalClick(e) {
      const target = e.target.closest('.tabcalories__choise-btn');

      if (target) {
        // Сброс активного состояния для всех кнопок выбора калорий внутри текущего таба
        parentSelector
          .querySelectorAll('.tabcalories__choise-btn')
          .forEach((item) => {
            item.classList.remove('tabcalories__choise-btn--active');
          });

        target.classList.add('tabcalories__choise-btn--active');
        menuKcal.textContent = `${target.textContent} калорий`;
        currentRatioValue = target.dataset.ratio;
        calcTotalPrice(tabIndex, dayValue, currentRatioValue);
        resetDays(); // Сброс выбора дней при изменении калорий
      }
    }

    parentSelector.addEventListener('click', handleKcalClick);

    // Первоначальная настройка: активируем первую кнопку и обновляем значения
    const firstKcalButton = parentSelector.querySelector(
      '.tabcalories__choise-btn',
    );
    if (firstKcalButton) {
      firstKcalButton.classList.add('tabcalories__choise-btn--active');
      currentRatioValue = firstKcalButton.dataset.ratio;
      menuKcal.textContent = `${firstKcalButton.textContent} калорий`;
      calcTotalPrice(tabIndex, dayValue, currentRatioValue); // Начальный расчёт цены
    }
  }

  let lastSendTime = 0; // Хранит время последней успешной отправки

  /**
   * Функция для отправки данных заказа на сервер.
   * @param {number} tabIndex - Индекс выбранного таба.
   * @param {number} dayValue - Значение выбранного дня.
   * @param {number} ratio - Соотношение калорий.
   */
  function sendOrderData(tabIndex, dayValue, ratio) {
    const currentTime = Date.now();

    // Проверка, прошло ли 10 секунд с момента последней отправки
    if (currentTime - lastSendTime < 10000) {
      const remainingTime = 10000 - (currentTime - lastSendTime);
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);

      if (orderButton) {
        orderButton.textContent = `Ожидайте: ${minutes} минут${minutes !== 1 ? 'ы' : ''} ${seconds} секунд${seconds !== 1 ? 'ы' : ''}`;
        cooldownInterval = setInterval(updateCountdown, 1000, remainingTime);
      }
      return;
    }

    // Сброс текста кнопки
    if (orderButton) {
      orderButton.textContent = 'Оформить заказ';
      clearInterval(cooldownInterval);
    }

    // Повторная проверка времени отправки
    if (currentTime - lastSendTime < 10000) {
      alert.log('Отправка данных слишком часто. Подождите 10 секунд.');
      return;
    }

    console.log('Отправка данных:', latestOrderData);
    if (!latestOrderData) return; // Если нет данных, отправка не производится

    fetch('http://localhost:3000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(latestOrderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Ответ сервера:', data);
        lastSendTime = Date.now(); // Обновляем время последней отправки
      })
      .catch((error) => {
        console.error('Ошибка отправки:', error);
        // Если отправка не удалась, обновляем время отправки
        lastSendTime = Date.now();
      });
  }

  /**
   * Обновляет обратный отсчёт до возможности следующей отправки заказа.
   * @param {number} remainingTime - Оставшееся время в миллисекундах.
   */
  function updateCountdown(remainingTime) {
    const currentTime = Date.now();
    const timeLeft = remainingTime - (currentTime - lastSendTime);

    if (timeLeft <= 0) {
      clearInterval(cooldownInterval);
      if (orderButton) {
        orderButton.textContent = 'Оформить заказ';
      }
      return;
    }

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    if (orderButton) {
      orderButton.textContent = `Ожидайте: ${minutes} минут${minutes !== 1 ? 'ы' : ''} ${seconds} секунд${seconds !== 1 ? 'ы' : ''}`;
    }
  }

  /**
   * Обработчик клика по кнопке заказа.
   */
  function handleOrderButton() {
    const user = localStorage.getItem('user');
    if (!user) {
      // Если предупреждение ещё не было показано, выводим его и устанавливаем флаг
      if (!orderAlertShown) {
        alert('Перед заказом, пожалуйста зарегестрируйтесь');
        orderAlertShown = true;
        // Сбрасываем флаг через 1 секунду для возможности повторного предупреждения
        setTimeout(() => {
          orderAlertShown = false;
        }, 1000);
      }
      return;
    }
    // Если пользователь авторизован, отправляем данные заказа.
    sendOrderData(tabIndex, currentDayValue, currentRatioValue);
  }

  /**
   * Устанавливает обработчик клика для кнопки заказа с актуальными данными.
   */
  function setupOrderButton() {
    if (orderButton) {
      // Удаляем предыдущий обработчик, если он есть, и добавляем новый
      orderButton.removeEventListener('click', handleOrderButton);
      orderButton.addEventListener('click', handleOrderButton);
    }
  }

  /**
   * Функция для расчета итоговой стоимости заказа с учетом выбранного тарифа, дней и скидок.
   * @param {number} tabIndex - Индекс выбранного таба.
   * @param {number} dayValue - Значение выбранного дня.
   * @param {number} ratio - Соотношение калорий.
   */
  function calcTotalPrice(tabIndex, dayValue, ratio) {
    console.log('Приходит в calcTotalPrice');
    console.log(`Таб индекс - ${tabIndex}`);
    console.log(`Значение дня ${dayValue}`);
    console.log(`Ратио калорий - ${ratio}`);

    const tariffs = ['набор веса', 'баланс', 'похудение'];
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
    const discountPercentage = Math.round(discount * 100);

    let discountElement = document.querySelector('.discount-info');
    if (!discountElement) {
      discountElement = document.createElement('div');
      discountElement.classList.add('discount-info');
      menuPrice.parentNode.insertBefore(discountElement, menuPrice);
    }

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

    // Обновляем глобальную переменную с последними данными заказа
    latestOrderData = {
      тариф: tariffs[tabIndex] || 'неизвестный',
      количество_дней: days,
      цена_без_скидки: totalPrice.toFixed(2),
      размер_скидки: `${discountPercentage}%`,
      итоговая_стоимость: discountedPrice.toFixed(2),
    };
    const userData = localStorage.getItem('user');
    if (userData) {
      const { name, login, email, phone } = JSON.parse(userData);
      latestOrderData = {
        ...latestOrderData,
        name: name,
        login: login,
        email: email,
        phone: phone,
      };
    }

    setupOrderButton(); // Настраиваем кнопку с актуальными данными
  }

  // Инициализируем интерфейс табов
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
/* harmony import */ var _moveContent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./moveContent */ "./js/modules/moveContent.js");
// tabsAndSlider.js

/**
 * Функция SliderV2 - реализует слайдер с поддержкой навигации по клику, клавиатуре,
 * touch-событиями и перетаскиванием мышью.
 *
 * @param {string} contentSelector - CSS селектор для элементов слайдов.
 * @param {string} parentSelector - CSS селектор для родительского элемента слайдов.
 * @param {string} sliderPrev - CSS селектор для кнопки переключения на предыдущий слайд.
 * @param {string} sliderNext - CSS селектор для кнопки переключения на следующий слайд.
 * @param {string} current - CSS селектор для элемента отображения текущего номера слайда.
 * @param {string} total - CSS селектор для элемента отображения общего количества слайдов.
 */
function SliderV2(
  contentSelector,
  parentSelector,
  sliderPrev,
  sliderNext,
  current,
  total,
) {
  // Получение DOM элементов для слайдера
  const tabsContent = document.querySelectorAll(contentSelector);
  const tabsParent = document.querySelector(parentSelector);
  const prev = document.querySelector(sliderPrev);
  const next = document.querySelector(sliderNext);
  const currentCounter = document.querySelector(current);
  const totalCounter = document.querySelector(total);

  // Локальное состояние слайдера
  let slideIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Проверяем наличие всех необходимых элементов
  if (
    !tabsContent.length ||
    !tabsParent ||
    !prev ||
    !next ||
    !currentCounter ||
    !totalCounter
  ) {
    console.error('Required elements not found');
    return;
  }

  /**
   * Скрывает все слайды.
   */
  function hideContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show');
    });
  }

  /**
   * Показывает слайд по заданному индексу.
   * @param {number} [index=0] - Индекс слайда для отображения.
   */
  function showContent(index = 0) {
    tabsContent[index].classList.add('show');
    tabsContent[index].classList.remove('hide');
    updateCounter(index);
    // Вызов функции вставки контента для текущего слайда
    (0,_moveContent__WEBPACK_IMPORTED_MODULE_0__["default"])(index);
  }

  /**
   * Обновляет счетчик текущего слайда и общего количества слайдов.
   * @param {number} index - Индекс текущего слайда.
   */
  function updateCounter(index) {
    currentCounter.textContent = getZero(index + 1);
    totalCounter.textContent = getZero(tabsContent.length);
  }

  /**
   * Добавляет ведущий ноль к числу, если оно меньше 10.
   * @param {number} num - Число для форматирования.
   * @returns {string|number} - Строка с ведущим нулем или число, если оно больше или равно 10.
   */
  function getZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
  }

  /**
   * Изменяет слайд в зависимости от направления.
   * @param {string} direction - Направление ('prev' для предыдущего, 'next' для следующего).
   */
  function changeSlide(direction) {
    console.log(`Changing slide: ${direction}`);
    if (direction === 'prev') {
      slideIndex = slideIndex === 0 ? tabsContent.length - 1 : slideIndex - 1;
    } else {
      slideIndex = slideIndex === tabsContent.length - 1 ? 0 : slideIndex + 1;
    }
    console.log(`New slide index: ${slideIndex}`);
    hideContent();
    showContent(slideIndex);

    // Вызов функции для вставки контента после смены слайда
    (0,_moveContent__WEBPACK_IMPORTED_MODULE_0__["default"])(slideIndex);
  }

  /**
   * Обработчик нажатия клавиш для переключения слайдера.
   * @param {KeyboardEvent} event - Событие нажатия клавиши.
   */
  function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
      changeSlide('prev');
    } else if (event.key === 'ArrowRight') {
      changeSlide('next');
    }
  }

  /**
   * Обработчик начала касания экрана.
   * @param {TouchEvent} event - Событие касания.
   */
  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchEndX = touchStartX;
  }

  /**
   * Обработчик движения пальца по экрану.
   * @param {TouchEvent} event - Событие перемещения касания.
   */
  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }

  /**
   * Обработчик окончания касания, вычисляет направление свайпа.
   */
  function handleTouchEnd() {
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      changeSlide(swipeDistance < 0 ? 'next' : 'prev');
    }
  }

  // Переменные для обработки перетаскивания мышью
  let isDragging = false;
  let startX;

  /**
   * Обработчик нажатия кнопки мыши.
   * @param {MouseEvent} event - Событие нажатия мыши.
   */
  function handleMouseDown(event) {
    isDragging = true;
    startX = event.pageX;
    tabsParent.style.cursor = 'grabbing';
  }

  /**
   * Обработчик движения мыши при зажатой кнопке.
   * @param {MouseEvent} event - Событие перемещения мыши.
   */
  function handleMouseMove(event) {
    if (!isDragging) return;

    const x = event.pageX;
    const distance = startX - x;

    if (Math.abs(distance) > 50) {
      changeSlide(distance > 0 ? 'next' : 'prev');
      isDragging = false;
      tabsParent.style.cursor = 'grab';
    }
  }

  /**
   * Обработчик отпускания кнопки мыши.
   */
  function handleMouseUp() {
    isDragging = false;
    tabsParent.style.cursor = 'grab';
  }

  // Назначение обработчиков для кнопок и событий
  prev.addEventListener('click', () => changeSlide('prev'));
  next.addEventListener('click', () => changeSlide('next'));
  document.addEventListener('keydown', handleKeyPress);

  tabsParent.addEventListener('touchstart', handleTouchStart);
  tabsParent.addEventListener('touchmove', handleTouchMove);
  tabsParent.addEventListener('touchend', handleTouchEnd);

  tabsParent.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  // Установка начального стиля курсора
  tabsParent.style.cursor = 'grab';

  // Инициализация слайдера: скрываем все слайды и показываем первый
  hideContent();
  showContent();

  /**
   * Функция для очистки (удаления) обработчиков событий.
   * Возвращает функцию, вызывая которую, можно отменить регистрацию событий.
   * @returns {Function} Функция очистки обработчиков событий.
   */
  return function cleanup() {
    document.removeEventListener('keydown', handleKeyPress);
    tabsParent.removeEventListener('touchstart', handleTouchStart);
    tabsParent.removeEventListener('touchmove', handleTouchMove);
    tabsParent.removeEventListener('touchend', handleTouchEnd);
    tabsParent.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
}

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
/**
 * Модуль таймера. Инициирует отсчет времени до заданной даты.
 * @function timer
 */
function timer() {
  // TIMER

  const deadline = '2026-01-01';

  /**
   * Вычисляет оставшееся время до заданного конечного времени.
   * @param {string} endtime - Конечное время в формате, распознаваемом Date.parse.
   * @returns {Object} Объект с оставшимся временем:
   *                   total - общее количество миллисекунд,
   *                   days - количество дней,
   *                   hours - количество часов,
   *                   minutes - количество минут,
   *                   seconds - количество секунд.
   */
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

  /**
   * Устанавливает и обновляет счетчики таймера на странице.
   * @param {string} selector - CSS селектор элемента таймера.
   * @param {string} endtime - Конечное время для отсчета.
   */
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    let timeInterval = setInterval(updateClock, 1000);
    updateClock();

    /**
     * Функция обновления счетчиков таймера.
     */
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
  /**
   * Форматирует число, добавляя ведущий ноль, если число меньше 10.
   * @param {number} number - Число для форматирования.
   * @returns {string|number} Строка с числом, дополненным нулем, или число.
   */
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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
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
/* harmony import */ var _modules_moveContent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/moveContent */ "./js/modules/moveContent.js");
/* harmony import */ var _modules_replaceImg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/replaceImg */ "./js/modules/replaceImg.js");
/* harmony import */ var _modules_reviews__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/reviews */ "./js/modules/reviews.js");
/* harmony import */ var _modules_callMeBack__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/callMeBack */ "./js/modules/callMeBack.js");
/* harmony import */ var _modules_location__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/location */ "./js/modules/location.js");
/* harmony import */ var _modules_auth__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/auth */ "./js/modules/auth.js");
























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
  (0,_modules_moveContent__WEBPACK_IMPORTED_MODULE_14__["default"])();
  // menuCardSlider('.offer__slider-inner');
  (0,_modules_menuCardSlider_js__WEBPACK_IMPORTED_MODULE_9__["default"])();
  (0,_modules_burger_js__WEBPACK_IMPORTED_MODULE_11__["default"])();
  (0,_modules_collapsed_js__WEBPACK_IMPORTED_MODULE_13__["default"])();
  (0,_modules_collapsed_js__WEBPACK_IMPORTED_MODULE_13__["default"])('.reviews__list', '.reviews .expand');
  (0,_modules_collapsed_js__WEBPACK_IMPORTED_MODULE_13__["default"])('.questions .questions__item-content', '.questionsExpand', 0);
  (0,_modules_moveContent__WEBPACK_IMPORTED_MODULE_14__["default"])();
  (0,_modules_moveContent__WEBPACK_IMPORTED_MODULE_14__["default"])(0, '.cityMoveElement', '.cityToMoveElement', 425);
  (0,_modules_moveContent__WEBPACK_IMPORTED_MODULE_14__["default"])(0, '.authBtnHeader', '.authBtnBurger', 425);
  (0,_modules_replaceImg__WEBPACK_IMPORTED_MODULE_15__["default"])(
    '.calculating__choose_big',
    'calculating__choose-item',
    'calculating__choose-item_active',
  );
  (0,_modules_replaceImg__WEBPACK_IMPORTED_MODULE_15__["default"])(
    '#gender',
    'calculating__choose-item',
    'calculating__choose-item_active',
  );
  (0,_modules_reviews__WEBPACK_IMPORTED_MODULE_16__["default"])();
  (0,_modules_callMeBack__WEBPACK_IMPORTED_MODULE_17__["default"])();
  // request();
  (0,_modules_location__WEBPACK_IMPORTED_MODULE_18__["default"])();
  (0,_modules_auth__WEBPACK_IMPORTED_MODULE_19__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map