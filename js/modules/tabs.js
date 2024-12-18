// import { closeModal, openModal } from './modal';
// const { openModal, closeModal } = modalModule();
import tabsSlider from './tabsSlider';

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

  function showTabContent(tabIndex = 0) {
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
      tabsSlider(tabsContent[tabIndex].querySelector(cardsParentItem));
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
    //   calcPriceAndDays(tabsContent[tabIndex].querySelector(tabcalories));
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
            hideTabsContent();
            showTabContent(i);
            calcPriceAndDays(i);
          }
        });
      }
    });
  }
  function calcPriceAndDays(btnIndex = 0) {
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
    //FIXME: сделать работоспособными при переключении вкладок
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
          console.log(choiseKcal);
        });
      } else {
        console.log(btnKcal[0]);
        btnKcal[0].textContent = `??? калорий`;
        console.log(`target forKcal NOT FIND`);
      }
    });
  }

  function calcPrice() {}

  hideTabsContent();
  showTabContent();
  // calcKcal();
  switchTab();
  calcPriceAndDays();
}

export default tabs;
//TODO: сделать расчет калорий
