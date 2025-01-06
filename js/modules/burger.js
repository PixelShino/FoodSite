import bodyNoScroll from './bodyNoScroll.js';
import { modal, openModal, closeModal } from './modal.js';

function toggleActive(
  parent = '.header__burger',
  item = '.header__burger-item',
  toggleItemSelector = '.burger__content',
) {
  const parentElement = document.querySelector(parent);
  const items = document.querySelectorAll(item);
  const toggleItem = document.querySelector(toggleItemSelector);
  const body = document.querySelector('body');

  if (!parentElement) {
    console.error(`Parent element with selector "${parent}" not found.`);
    return;
  } else if (!items) {
    console.error(`Items with selector "${item}" not found.`);
    return;
  } else if (!toggleItem) {
    console.error(
      `Toggle element with selector "${toggleItemSelector}" not found.`,
    );
    return;
  } else {
    function toggle() {
      bodyNoScroll();
      console.log('burger clicked');
      console.log(toggleItem);
      toggleItem.classList.toggle('active');

      console.log('else work');
    }

    parentElement.addEventListener('click', toggle);
  }
}
export default toggleActive;
