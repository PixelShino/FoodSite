import bodyNoScroll from './bodyNoScroll.js';
import { modal, openModal, closeModal } from './modal.js';

/**
 * Функция toggleActive отвечает за переключение активного состояния
 * для элементов бургер-меню.
 *
 * Параметры:
 *  @param {string} parent - Селектор родительского элемента (по умолчанию ".header__burger").
 *  @param {string} item - Селектор дочерних элементов, для которых производится проверка (по умолчанию ".header__burger-item").
 *  @param {string} toggleItemSelector - Селектор элемента, у которого переключается класс "active" (по умолчанию ".burger__content").
 */
function toggleActive(
  parent = '.header__burger',
  item = '.header__burger-line',
  toggleItemSelector = '.burger__content',
) {
  // Получаем родительский элемент по заданному селектору
  const parentElement = document.querySelector(parent);
  if (!parentElement) {
    console.error(`Не найден родительский элемент по селектору "${parent}"`);
    return;
  }

  // Получаем все элементы, соответствующие селектору item
  const items = document.querySelectorAll(item);
  if (!items.length) {
    console.error(`Не найдены элементы по селектору "${item}"`);
    return;
  }

  // Получаем элемент, у которого будем переключать класс "active"
  const toggleItem = document.querySelector(toggleItemSelector);
  if (!toggleItem) {
    console.error(
      `Не найден элемент для переключения по селектору "${toggleItemSelector}"`,
    );
    return;
  }

  /**
   * Функция toggle выполняет следующие действия:
   * 1. Вызывает переключение прокрутки страницы через bodyNoScroll.
   * 2. Логгирует информацию в консоль.
   * 3. Переключает класс "active" у toggleItem.
   */
  function toggle() {
    bodyNoScroll();
    console.log('burger clicked');
    console.log(toggleItem);
    toggleItem.classList.toggle('active');
    console.log('Поменяли класс active у элемента');
  }

  // Привязываем обработчик события клика к родительскому элементу
  parentElement.addEventListener('click', toggle);
}

export default toggleActive;
