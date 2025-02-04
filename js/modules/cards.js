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

export default cards;
