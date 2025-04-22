/**
 * Функция для перемещения контента между элементами в зависимости от разрешения окна.
 *
 * @param {number} slideIndex - Индекс слайда для формирования селекторов элементов.
 * @param {string} elementBase - Базовый селектор для элемента-источника контента (по умолчанию '.offer__descr-right').
 * @param {string} wrapperBase - Базовый селектор для целевого элемента заполнения контентом (по умолчанию '.offer__descr-left').
 * @param {number} breakpoint - Точка останова (в пикселях), при которой происходит перенос контента (по умолчанию 768).
 */
export default function insertContent(
  slideIndex,
  elementBase = '.offer__descr-right',
  wrapperBase = '.offer__descr-left',
  breakpoint = 768,
) {
  // Формирование селекторов для поиска элементов по индексам
  const elementSelector = `${elementBase}--${slideIndex}`;
  const wrapperSelector = `${wrapperBase}--${slideIndex}`;

  // Поиск оригинального и целевого элементов в DOM
  const originalParent = document.querySelector(elementSelector);
  const targetParent = document.querySelector(wrapperSelector);

  // Массив для хранения изначального содержимого оригинального элемента
  const originalContent = [];

  // Сохраняем все дочерние узлы оригинального элемента для последующего восстановления
  if (originalParent) {
    originalContent.push(...originalParent.childNodes);
  }

  /**
   * Функция перемещения контента для мобильного разрешения.
   * При ширине окна <= breakpoint переносит все дочерние элементы из оригинального блока в целевой.
   * При увеличении окна восстанавливает исходное содержимое.
   */
  function moveContentForMobile() {
    // Обращаемся к DOM-элементам по сформированным селекторам
    const descrLeft = document.querySelector(wrapperSelector);
    const descrRight = document.querySelector(elementSelector);

    // Если экран имеет ширину меньше или равную breakpoint, переносим контент из правого блока в левый
    if (window.matchMedia(`(max-width: ${breakpoint}px)`).matches) {
      if (descrRight && descrLeft) {
        // Перенос всех дочерних элементов из descrRight в descrLeft
        while (descrRight.firstChild) {
          descrLeft.appendChild(descrRight.firstChild);
        }
      }
    } else {
      // При увеличении окна возвращаем исходное содержимое обратно в оригинальный блок
      if (descrRight && originalContent.length > 0) {
        originalContent.forEach((node) => {
          descrRight.appendChild(node);
        });
      }
    }
  }

  // Первоначальный вызов функции для корректной инициализации содержимого
  moveContentForMobile();

  /**
   * Функция-обертка debounce для ограничения частоты вызова функции.
   * @param {Function} func - Функция, которую требуется ограничить.
   * @param {number} wait - Задержка в миллисекундах.
   * @returns {Function} - Обёрнутая функция с механизмом debounce.
   */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Добавляем обработчик события изменения размера окна с использованием debounce
  window.addEventListener('resize', debounce(moveContentForMobile, 100));
}
