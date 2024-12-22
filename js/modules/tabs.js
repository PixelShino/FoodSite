// import { closeModal, openModal } from './modal';
// const { openModal, closeModal } = modalModule();
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
  const menuPrice = document.querySelector('.tabcontainer__bot-price');
  const menuKcal = document.querySelector('.tabcontainer__bot-calories');

  const choiseDays = document.querySelector('.tabdays__choise');
  const btnDays = document.querySelectorAll('.tabdays__choise-btn');

  const choiseKcal = document.querySelector('.tabcalories__choise');
  const btnKcal = document.querySelectorAll('.tabcalories__choise-btn');
  const tabcalories = document.querySelector('.tabcalories');
  let tabIndex = 0;
  let price = 0;

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

  function showTabContent() {
    tabsContent[tabIndex].classList.add('show', 'fade');
    tabsContent[tabIndex].classList.remove('hide');
    tabs[tabIndex].classList.add('tabheader__item_active');

    menuTariff.textContent = tabs[tabIndex].querySelector(
      '.tabheader__item-title',
    ).textContent;

    // menuKcal.textContent = btnKcal[tabIndex].querySelector(
    //   '.tabcalories__choise-btn',
    // ).textContent;

    // Вызов tabsSlider в соответсвтии с текущей вкладкой
    if (tabsContent[tabIndex].querySelector(cardsParentItem)) {
      menuCardSlider(tabsContent[tabIndex].querySelector(cardsParentItem));
    }

    const tabcaloriesChoise = tabsContent[tabIndex].querySelector(
      '.tabcalories__choise',
    );

    // проверка содержит ли текущий таб поле с выборм калорий
    if (tabcaloriesChoise) {
      console.log(`tabs  contains Kcal`); // true
      calcKcal(tabcaloriesChoise);
      console.log(choiseKcal);
      // choiseKcal.forEach((btn) => {
      //   if
      // })
    } else {
      console.log(`tabs not contains Kcal`);
    }

    // //проверка содержит ли поле калорий активную кнопку
    // const tabcaloriesActive = choiseKcal.closest(
    //   '.tabcalories__choise-btn--active',
    // );

    // if (!tabcaloriesActive) {
    //   console.log('НЕТУ АКТИВНОЙ КНОПКИ');
    //   console.log(btnKcal);
    //   btnKcal[0].classList.add('tabcalories__choise-btn--active');

    //   // item[0].classList.add('tabcalories__choise-btn--active');
    //   // menuKcal.textContent = `${item.textContent} калорий`;

    //   // calcKcal(tabcaloriesChoise);
    // } else {
    //   console.log(tabcaloriesActive);
    // }

    // if (tabsContent[tabIndex].querySelector(tabcalories)) {
    //   calcDays(tabsContent[tabIndex].querySelector(tabcalories));
    // }
  }

  // function switchTab() {
  //   tabsParent.addEventListener('click', (event) => {
  //     const target = event.target;
  //     if (target && target.classList.contains('tabheader__item')) {
  //       tabs.forEach((item, i) => {
  //         if (target === item) {
  //           hideTabsContent();
  //           showTabContent(i);
  //         }
  //       });
  //     }

  //   });
  // }
  function switchTab() {
    tabsParent.addEventListener('click', (event) => {
      // Ищем ближайший родительский элемент с нужным классом/селектором
      const targetElement = event.target.closest(tabsItem);

      // Проверяем, нашёлся ли элемент
      if (targetElement) {
        tabs.forEach((item, i) => {
          if (targetElement === item) {
            tabIndex = i;
            hideTabsContent();
            showTabContent(tabIndex);
            calcDays(tabIndex);
            calcTotalPrice(tabIndex);
          }
        });
      }
    });
  }
  function calcDays(btnIndex = 0) {
    // Обработчик для выбора дней

    choiseDays.addEventListener('click', (event) => {
      const target = event.target.closest('.tabdays__choise-btn');
      if (target) {
        btnDays.forEach((item) => {
          // console.log(target);
          item.classList.remove('tabdays__choise-btn--active');
        });
        target.classList.add('tabdays__choise-btn--active');

        // Изменение текста в зависимости от количества дней
        const daysCount = parseInt(target.textContent, 10);
        if (daysCount === 1) {
          menuDays.textContent = `${daysCount} день`;
        } else if (daysCount > 1 && daysCount <= 4) {
          menuDays.textContent = `${daysCount} дня`;
        } else {
          menuDays.textContent = `${daysCount} дней`;
        }
      }
    });

    // Обработчик для выбора калорий
  }
  function calcKcal(parentSelector = choiseKcal, tabIndex) {
    // console.log(typeof choiseKcal);
    // console.log(parentSelector);

    // btnKcal.forEach((item) => {
    //   // console.log(target);
    //   // item[0].classList.add('tabcalories__choise-btn--active');
    //   // menuKcal.textContent = `${item.textContent} калорий`;
    // });
    btnKcal.forEach((item) => {
      // console.log(target);
      item.classList.remove('tabcalories__choise-btn--active');
      menuKcal.textContent = `${parentSelector.firstElementChild.textContent} калорий`;
    });

    console.log(parentSelector);
    parentSelector.firstElementChild.classList.add(
      'tabcalories__choise-btn--active',
    );

    parentSelector.addEventListener('click', () => {
      const target = event.target.closest('.tabcalories__choise-btn');

      if (target) {
        console.log(`target for kCal find ,is ${target.classList} in func`);
        btnKcal.forEach((item) => {
          // console.log(target);
          item.classList.remove('tabcalories__choise-btn--active');

          target.classList.add('tabcalories__choise-btn--active');
          menuKcal.textContent = `${target.textContent} калорий`;
          // console.log(choiseKcal);
        });
      } else {
        console.log(btnKcal[0]);
        btnKcal[0].textContent = `??? калорий`;
        console.log(`target forKcal NOT FIND`);
      }
    });
  }

  //TODO: нужно вывод цены на экран бокового меню,
  // на цену вляет - тариф( выбраннеы калории) ,
  // количество выбранных дней ( скидка от 5 дней ),
  // персональная скидка на первй заказ 15%,
  function calcTotalPrice(tabIndex) {
    switch (tabIndex) {
      case 0:
        price = 100;
        break;
      case 1:
        price = 125;
        break;
      case 2:
        price = 150;
        break;
      default:
        price = 0;
    }

    // const price = {
    //   950: 980,
    //   1350: 1260,
    //   1525: 1360,
    //   2025: 1510,
    //   2500: 1600,
    //   3000: 1800,
    // };
    // const discount = {
    //   5: 150,
    //   7: 320,
    //   10: 800,
    //   14: 1390,
    //   20: 2400,
    //   28: 3880,
    // };
    // const firstBuyDiscount = 15%
    // Проверяем, есть ли цена для указанных калорий
    // if (!dsdf[dsas]) {
    //   throw new Error("Неизвестное количество калорий");
    // }

    const daysMatch = menuDays.textContent.match(/\d+/);
    const days = daysMatch ? parseInt(daysMatch[0], 10) : 0;
    let totalPrice = days * price;
    menuPrice.textContent = +totalPrice.toFixed(2) + ' руб.';

    console.log(`Цена - ${price}`);
    console.log(`Количество дней - ${days}`);
    console.log(`Итоговая цена - ${totalPrice}`);
    return totalPrice;
  }

  calcTotalPrice();

  hideTabsContent();
  showTabContent();
  // calcKcal();
  switchTab();
  calcDays();
}

export default tabs;
