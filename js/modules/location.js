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

export default function auth() {
  // Если модальное окно уже существует, прекращаем инициализацию
  if (document.querySelector('.modal')) return;

  let autoOpenTimeout = null;

  // Создаем контейнер модального окна
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
        <button type="submit">Войти</button>
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
        <button type="submit">Зарегистрироваться</button>
      `;

  formsContainer.appendChild(loginForm);
  formsContainer.appendChild(registerForm);
  modalContent.appendChild(formsContainer);

  // Собираем структуру модального окна
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  document.body.appendChild(modal);

  // Функции для открытия и закрытия модального окна
  function openModal() {
    // Если модалка уже открыта, не делаем ничего.
    if (modal.classList.contains('show')) return;
    modal.classList.add('show');
    if (autoOpenTimeout) {
      clearTimeout(autoOpenTimeout);
      autoOpenTimeout = null;
    }
  }

  function closeModal() {
    modal.classList.remove('show');
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Переключение между вкладками
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

  // Функция обновления состояния UI после авторизации
  function updateUIForAuth(user) {
    const authButtons = document.querySelectorAll('#authBtn');
    authButtons.forEach((btn) => {
      btn.textContent = 'Выйти';
    });

    // Обновляем путь к нужному элементу навигации
    const headerNav = document.querySelector(
      'body > header > div.header__bot-block > nav',
    );
    if (headerNav && !headerNav.querySelector('.personal-account')) {
      const li = document.createElement('li');
      li.classList.add('personal-account');
      li.textContent = 'Личный кабинет';
      li.addEventListener('click', openModal);
      headerNav.appendChild(li);
    }
  }

  // Функция для сброса состояния (выход)
  function logout() {
    localStorage.removeItem('user');
    const authButtons = document.querySelectorAll('#authBtn');
    authButtons.forEach((btn) => {
      btn.textContent = 'Войти';
    });
    const headerNav = document.querySelector(
      'body > header > div.header__bot-block > nav',
    );
    const personalAccount =
      headerNav && headerNav.querySelector('.personal-account');
    if (personalAccount) {
      headerNav.removeChild(personalAccount);
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

  // Назначаем обработчик для кнопок авторизации/выхода
  const authButtons = document.querySelectorAll('#authBtn');
  authButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const user = localStorage.getItem('user');
      if (user) {
        // Если пользователь уже авторизован - выполнить выход
        logout();
      } else {
        // Если не авторизован - открыть модальное окно
        openModal();
      }
    });
  });

  // Если пользователь уже был авторизован ранее, обновляем интерфейс
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    updateUIForAuth(JSON.parse(storedUser));
  } else {
    // Автоматическое открытие окна через 15 сек.
    autoOpenTimeout = setTimeout(() => {
      if (!modal.classList.contains('show')) {
        openModal();
      }
    }, 15000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  auth();
});
