// import { closeModal, openModal } from './modal';
// const { openModal, closeModal } = modalModule();
import tabsSlider from './tabsSlider';

function tabs(tabsItem, tabsContentItem, tabsParentItem, cardsParentItem) {
  const tabs = document.querySelectorAll(tabsItem);
  const tabsContent = document.querySelectorAll(tabsContentItem);
  const tabsParent = document.querySelector(tabsParentItem);
  const cardsParent = document.querySelector(cardsParentItem);

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

    // Call tabsSlider with the appropriate cardsParent for the current tab
    if (tabsContent[tabIndex].querySelector(cardsParentItem)) {
      tabsSlider(tabsContent[tabIndex].querySelector(cardsParentItem));
    }
  }

  function switchTab() {
    tabsParent.addEventListener('click', (event) => {
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
