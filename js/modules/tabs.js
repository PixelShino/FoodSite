import menuCardSlider from './menuCardSlider';
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
      menuCardSlider(tabsContent[index].querySelector(cardsParentItem));
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

export default tabs;
