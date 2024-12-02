// import { closeModal, openModal } from './modal';
// const { openModal, closeModal } = modalModule();
function tabs(tabsItem, tabsContentItem, tabsParentItem) {
  //TABS

  const tabs = document.querySelectorAll(`${tabsItem}`); // элемент переключения
  const tabsContent = document.querySelectorAll(`${tabsContentItem}`); // сам контент
  const tabsParent = document.querySelector(`${tabsParentItem}`); // родитель

  // const tabs = document.querySelectorAll('.tabheader__item');
  // const tabsContent = document.querySelectorAll('.tabcontent');
  // const tabsParent = document.querySelector('.tabheader__items');

  if (!tabs.length || !tabsContent.length || !tabsParent) {
    console.error('Не удалось найти необходимые элементы для табов');
    return;
  } else {
    console.log('Табы найдены :');
    console.log(`${tabs}`);
    console.log(`${tabsContent}`);
    console.log(`${tabsParent}`);
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
  }

  function switchTab() {
    tabsParent.addEventListener('click', (event) => {
      console.log(event.target);
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
          if (target === item) {
            hideTabsContent();
            showTabContent(i);
          }
        });
      }
    });
  }
  hideTabsContent();
  showTabContent();
  switchTab();
}

export default tabs;
