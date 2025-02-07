// Файл: js/modules/auth.js
// Описание: Модуль для отображения модального окна с формами авторизации и регистрации.
// Данные пользователя сохраняются в localStorage и отправляются на сервер по адресу http://localhost:3000/users.
// При успешной авторизации (особенно для admin) обновляется текст кнопки авторизации и добавляется пункт "Личный кабинет" в навигацию.
'use strict';
import toggleActive, { closeBurgerMenu } from './burger';

/**
 * Основная функция модуля аутентификации и регистрации.
 * Экспортируется как функция по умолчанию.
 */
export default function auth() {
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
      closeBurgerMenu();
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
