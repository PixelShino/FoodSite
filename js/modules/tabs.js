import menuCardSlider from './menuCardSlider'; // Импортируем модуль для слайдера карточек меню

// Функция для управления табами
function tabs(
  tabsItem, // Селектор элементов табов
  tabsContentItem, // Селектор элементов контента табов
  tabsParentItem, // Селектор родительского элемента табов
  cardsParentItem, // Селектор родительского элемента карточек меню
  btnDaysItem, // Селектор кнопок выбора дней (не используется)
) {
  // Получаем элементы DOM
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

  // Индекс текущего активного таба
  let tabIndex = 0;

  // Переменные для хранения текущих значений дней и ратио калорий
  let currentDayValue = 1;
  let currentRatioValue;

  // Проверка на наличие необходимых элементов DOM. Если их нет, выводим ошибку в консоль и прекращаем выполнение функции
  if (!tabs.length || !tabsContent.length || !tabsParent || !cardsParent) {
    console.error('Не удалось найти необходимые элементы для табов');
    return;
  }

  // Функция для скрытия контента всех табов
  function hideTabsContent() {
    tabsContent.forEach((element) => {
      element.classList.add('hide');
      element.classList.remove('show', 'fade');
    });

    tabs.forEach((element) => {
      element.classList.remove('tabheader__item_active');
    });
  }

  // Функция для отображения контента выбранного таба
  function showTabContent() {
    tabsContent[tabIndex].classList.add('show', 'fade');
    tabsContent[tabIndex].classList.remove('hide');
    tabs[tabIndex].classList.add('tabheader__item_active');

    // menuTariff.textContent =
    //   tabs[tabIndex].querySelector('.tabheader__item-title').textContent || 1;

    // Инициализируем слайдер карточек меню, если он есть на текущем табе
    if (tabsContent[tabIndex].querySelector(cardsParentItem)) {
      menuCardSlider(tabsContent[tabIndex].querySelector(cardsParentItem));
    }

    const tabcaloriesChoise = tabsContent[tabIndex].querySelector(
      '.tabcalories__choise',
    );

    // Если на текущем табе есть выбор калорий, инициализируем его
    if (tabcaloriesChoise) {
      resetKcal(tabcaloriesChoise); // Сбрасываем выбор калорий на первый элемент
      resetDays(tabcaloriesChoise); // Сбрасываем выбор дней на первый элемент

      // Инициализируем currentRatioValue после resetKcal, чтобы значение было актуальным
      currentRatioValue = btnKcal.length > 0 ? btnKcal[0].dataset.ratio : 1.2;

      calcKcal(tabcaloriesChoise, tabIndex, currentDayValue);
      calcDays(tabcaloriesChoise, tabIndex, currentRatioValue);
      calcTotalPrice(tabIndex, currentDayValue, currentRatioValue); // Пересчитываем общую цену
    }
  }

  // Функция для обработки переключения табов
  function switchTab() {
    tabsParent.addEventListener('click', (event) => {
      const targetElement = event.target.closest(tabsItem);

      if (targetElement) {
        tabs.forEach((item, i) => {
          if (targetElement === item) {
            tabIndex = i;
            hideTabsContent();
            showTabContent(); // Отображаем контент нового таба
            calcTotalPrice(tabIndex, currentDayValue, currentRatioValue); //  и пересчитываем цену
          }
        });
      }
    });
  }

  // Функция для сброса выбора дней на первый элемент
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

  // Функция для сброса выбора калорий на первый элемент
  function resetKcal() {
    if (btnKcal.length > 0) {
      btnKcal.forEach((item) => {
        item.classList.remove('tabcalories__choise-btn--active');
      });
      btnKcal[0].classList.add('tabcalories__choise-btn--active');
      menuKcal.textContent = `${btnKcal[0].textContent} калорий`;
      currentRatioValue = btnKcal[0].dataset.ratio; // Обновляем currentRatioValue
    }
  }

  // Функция для обработки выбора количества дней
  function calcDays(tabcaloriesChoise, tabIndex, ratio) {
    // Удаляем предыдущий обработчик события, чтобы избежать дублирования
    choiseDays.removeEventListener('click', handleChoiseDaysClick);

    function handleChoiseDaysClick(event) {
      const target = event.target.closest('.tabdays__choise-btn');

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

        calcTotalPrice(tabIndex, currentDayValue, currentRatioValue); // Пересчитываем общую цену
      }
    }

    choiseDays.addEventListener('click', handleChoiseDaysClick);
  }
  function calculateDiscount(days) {
    if (days >= 28) {
      menuPrice;
      return 0.2; // 20% скидка для 28 дней и более
    } else if (days >= 20) {
      return 0.15; // 15% скидка для 20-27 дней
    } else if (days >= 14) {
      return 0.1; // 10% скидка для 14-19 дней
    } else if (days >= 10) {
      return 0.07; // 7% скидка для 10-13 дней
    } else if (days >= 7) {
      return 0.05; // 5% скидка для 7-9 дней
    } else if (days >= 5) {
      return 0.03; // 3% скидка для 5-6 дней
    } else if (days >= 2) {
      return 0.01; // 1% скидка для 2-4 дней
    } else {
      return 0; // Нет скидки для 1 дня
    }
  }
  // Функция для обработки выбора калорий
  function calcKcal(parentSelector = choiseKcal, tabIndex, dayValue) {
    parentSelector.removeEventListener('click', handleKcalClick); // Удаляем предыдущий обработчик

    btnKcal.forEach((item) => {
      item.classList.remove('tabcalories__choise-btn--active');
    });

    parentSelector.firstElementChild.classList.add(
      'tabcalories__choise-btn--active',
    );

    function handleKcalClick(event) {
      const target = event.target.closest('.tabcalories__choise-btn');
      if (target) {
        btnKcal.forEach((item) => {
          item.classList.remove('tabcalories__choise-btn--active');
        });
        target.classList.add('tabcalories__choise-btn--active');
        menuKcal.textContent = `${target.textContent} калорий`;
        currentRatioValue = target.dataset.ratio;
        calcTotalPrice(tabIndex, dayValue, currentRatioValue);
        resetDays(); // Пересчитываем общую цену
      }
    }

    parentSelector.addEventListener('click', handleKcalClick);
  }

  // Функция для расчета общей цены
  function calcTotalPrice(tabIndex, dayValue, ratio) {
    // Вывод данных в консоль для отладки
    console.log('Приходит в calcTotalPrice');
    console.log(`Таб индекс - ${tabIndex}`);
    console.log(`Значение дня ${dayValue}`);
    console.log(`Ратио калорий - ${ratio}`);

    let defaultPrice = 410; // Цена по умолчанию
    let price = 0;

    // Определяем цену в зависимости от выбранного таба
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

    const days = dayValue || 0; // Используем dayValue, если он определен, иначе 0
    let totalPrice = days * price * ratio;

    const discount = calculateDiscount(days); // Вычисляем скидку
    const discountedPrice = totalPrice * (1 - discount); // Применяем скидку

    // --- Добавляем логику отображения скидки ---
    let discountElement = document.querySelector('.discount-info'); // Выбираем элемент скидки
    if (!discountElement) {
      // Создаем элемент, если он не существует
      discountElement = document.createElement('div');
      discountElement.classList.add('discount-info');
      menuPrice.parentNode.insertBefore(discountElement, menuPrice); // Вставляем перед ценой
    }

    const discountPercentage = Math.round(discount * 100); // Вычисляем процент скидки
    if (discountPercentage > 0) {
      discountElement.textContent = `Скидка ${discountPercentage}%`;
      discountElement.style.display = 'flex'; // Показываем скидку
    } else {
      discountElement.style.display = 'none'; // Скрываем, если скидки нет
    }
    // --- Конец логики отображения скидки ---

    menuPrice.textContent = +discountedPrice.toFixed(0) + ' руб.';

    // menuPrice.textContent = +totalPrice.toFixed(0) + ' руб.';

    // Вывод данных в консоль для отладки
    console.log(`Цена - ${price}`);
    console.log(`Количество дней - ${dayValue}`);
    console.log(`Ратио калорий - ${ratio}`);
    console.log(`Итоговая цена - ${totalPrice}`);
    return totalPrice, discountedPrice;
  }

  // Инициализируем табы
  calcTotalPrice(tabIndex, currentDayValue, currentRatioValue); // Вычисляем начальную цену
  hideTabsContent(); // Скрываем контент всех табов, кроме первого
  showTabContent(); // Показываем контент первого таба
  switchTab(); // Инициализируем обработчик переключения табов
}
export default tabs;

//TODO : сделать расчет цены , в внимание принимается - количество дней и ратио калорий,
// скидка на первый заказ а так же скидка на больший выбор дней
