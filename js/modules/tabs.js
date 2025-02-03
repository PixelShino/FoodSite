import menuCardSlider from './menuCardSlider';

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

  const orderButton = document.querySelector('.tabcontainer__bot-action');
  console.log(selectBtn);

  let tabIndex = 0;
  let currentDayValue = 1;
  let currentRatioValue;
  let latestOrderData = null;
  let cooldownInterval = null;

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
      menuCardSlider(tabsContent[index].querySelector(cardsParentItem));
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

  let lastSendTime = 0; // Stores the timestamp of the last successful send

  function sendOrderData(tabIndex, dayValue, ratio) {
    const currentTime = Date.now();

    // Check if 10 seconds have passed since the last send
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

    // Reset button text
    if (orderButton) {
      orderButton.textContent = 'Оформить заказ';
      clearInterval(cooldownInterval);
    }

    // Check if 10 seconds have passed since the last send
    if (currentTime - lastSendTime < 10000) {
      alert.log('Отправка данных слишком часто. Подождите 10 секунд.');
      return;
    }

    console.log('Отправка данных:', latestOrderData);
    if (!latestOrderData) return; // Если данных нет, не отправляем

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
        lastSendTime = Date.now(); // Update the last send time
      })
      .catch((error) => {
        console.error('Ошибка отправки:', error);
        // Reset lastSendTime if send failed
        lastSendTime = Date.now();
      });
  }
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

  // Функция для обработки клика на кнопку заказа
  function setupOrderButton() {
    // const orderButton = document.querySelector('.tabcontainer__bot-action');

    if (orderButton) {
      orderButton.removeEventListener('click', sendOrderData); // Убираем старый обработчик
      orderButton.addEventListener('click', sendOrderData); // Добавляем новый
    }
  }

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

    setupOrderButton(); // Настраиваем кнопку с актуальными данными
  }

  // calcTotalPrice(tabIndex, currentDayValue, currentRatioValue);
  hideTabsContent();
  showTabContent();
  switchTab();
}

export default tabs;
