import bodyNoScroll from './bodyNoScroll.js';
import { modal, openModal, closeModal } from './modal.js';

/**
 * Функция getHeaderHeightInPx возвращает высоту хедера в пикселях,
 * корректно обработав значение CSS-переменной --header-height, которая может быть задана в vh или px.
 *
 * @returns {number} Высота хедера в пикселях.
 */
function getHeaderHeightInPx() {
  let headerHeightValue = getComputedStyle(document.documentElement)
    .getPropertyValue('--header-height')
    .trim();

  // Если значение задано в vh, конвертируем в пиксели
  if (headerHeightValue.endsWith('vh')) {
    const vhValue = parseFloat(headerHeightValue);
    return (vhValue / 100) * window.innerHeight;
  }

  // Если значение задано в px, возвращаем числовое значение
  if (headerHeightValue.endsWith('px')) {
    return parseFloat(headerHeightValue);
  }

  // В остальных случаях возвращаем 0
  return 0;
}

/**
 * Функция scrollWithOffset осуществляет плавную прокрутку к целевому элементу
 * с учётом отступа, равного высоте хедера (CSS-переменная --header-height).
 *
 * @param {string} targetSelector - Селектор целевого элемента (например, "#section1")
 */
function scrollWithOffset(targetSelector) {
  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) return;

  const headerHeight = getHeaderHeightInPx();
  const elementTop =
    targetElement.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementTop - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
}

/**
 * Функция closeBurgerMenu закрывает бургер-меню, удаляя класс "active"
 * у элемента, соответствующего селектору toggleItemSelector, и вызывая bodyNoScroll.
 *
 * @param {string} toggleItemSelector - Селектор элемента, у которого переключается класс "active" (по умолчанию ".burger__content").
 */
export function closeBurgerMenu(toggleItemSelector = '.burger__content') {
  const toggleItem = document.querySelector(toggleItemSelector);
  if (toggleItem && toggleItem.classList.contains('active')) {
    toggleItem.classList.remove('active');
    bodyNoScroll();
    console.log('Burger menu closed');
  }
}

/**
 * Функция toggleActive отвечает за переключение активного состояния
 * для элементов бургер-меню.
 *
 * Параметры:
 *  @param {string} parent - Селектор родительского элемента (по умолчанию ".header__burger").
 *  @param {string} item - Селектор дочерних элементов, для которых производится проверка (по умолчанию ".header__burger-line").
 *  @param {string} toggleItemSelector - Селектор элемента, у которого переключается класс "active" (по умолчанию ".burger__content").
 */
function toggleActive(
  parent = '.header__burger',
  item = '.header__burger-line',
  toggleItemSelector = '.burger__content',
) {
  // Получаем родительский элемент (бургер-иконку)
  const parentElement = document.querySelector(parent);
  if (!parentElement) {
    console.error(`Не найден родительский элемент по селектору "${parent}"`);
    return;
  }

  // Получаем все дочерние элементы (например, линии бургер-иконки)
  const items = document.querySelectorAll(item);
  if (!items.length) {
    console.error(`Не найдены элементы по селектору "${item}"`);
    return;
  }

  // Получаем элемент, у которого будет переключаться класс "active" (само меню)
  const toggleItem = document.querySelector(toggleItemSelector);
  if (!toggleItem) {
    console.error(
      `Не найден элемент для переключения по селектору "${toggleItemSelector}"`,
    );
    return;
  }

  /**
   * Функция toggle:
   * 1. Переключает блокировку прокрутки через bodyNoScroll.
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

  // Привязываем обработчик клика к родительскому элементу (бургер-иконке)
  parentElement.addEventListener('click', toggle);

  // Обработчик для закрытия бургер-меню при клике на пункт меню
  // Здесь предполагается, что пункты меню внутри toggleItem – это ссылки (<a>)
  toggleItem.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      event.preventDefault();

      // Извлекаем id целевого блока из атрибута href
      const targetID = event.target.getAttribute('href');
      if (targetID && targetID.startsWith('#')) {
        scrollWithOffset(targetID);
      }

      // Закрываем бургер-меню через вызов функции closeBurgerMenu
      closeBurgerMenu(toggleItemSelector);
      console.log('Burger menu closed after clicking menu item');
    }
  });
}

export default toggleActive;
