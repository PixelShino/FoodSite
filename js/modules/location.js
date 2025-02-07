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

export default initCityModal;
