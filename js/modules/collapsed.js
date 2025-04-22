/**
 * Enable collapse/expand functionality for multiple menu fields.
 *
 * This function selects multiple elements matching the given selectors
 * for menu fields and their corresponding toggle buttons. It sets the initial
 * state (collapsed) for each menu field and attaches an event listener to
 * toggle the collapse class and update the button text.
 *
 * @param {string} sectionSelector  - CSS selector for menu field elements (default: '.menu__field')
 * @param {string} toggleSelector   - CSS selector for toggle button elements (default: '.menu .expand')
 * @param {number} rename           - Flag to indicate if button text should be updated (default: 1)
 */
function collapsed(
  sectionSelector = '.menu__field',
  toggleSelector = '.menu .expand',
  rename = 1,
) {
  // Получаем коллекцию DOM-элементов для полей меню
  const menuFields = document.querySelectorAll(sectionSelector);
  // Получаем коллекцию DOM-элементов для кнопок переключения
  const toggleButtons = document.querySelectorAll(toggleSelector);

  // Проверка наличия необходимых элементов
  if (menuFields.length === 0) {
    console.error(`Элементы с селектором "${sectionSelector}" не найдены.`);
    return;
  }
  if (toggleButtons.length === 0) {
    console.error(`Элементы с селектором "${toggleSelector}" не найдены.`);
    return;
  }
  if (menuFields.length !== toggleButtons.length) {
    console.warn(
      `Несоответствие: количество полей меню (${menuFields.length}) не совпадает с количеством кнопок (${toggleButtons.length}). Будет обработано минимальное количество совпадающих элементов.`,
    );
  }

  // Определяем количество пар для обработки
  const count = Math.min(menuFields.length, toggleButtons.length);

  // Устанавливаем первоначальное состояние для каждой пары элементов
  for (let i = 0; i < count; i++) {
    const menuField = menuFields[i];
    const toggleButton = toggleButtons[i];

    // Устанавливаем первоначальное состояние: меню свернуто
    menuField.classList.add('collapsed');
    // Устанавливаем текст кнопки, если требуется переименование
    if (rename) {
      toggleButton.textContent = 'Развернуть';
    }

    // Добавляем обработчик события клика на кнопку
    toggleButton.addEventListener('click', () => {
      // Переключаем класс 'collapsed' для изменения состояния меню
      menuField.classList.toggle('collapsed');
      // Изменяем текст кнопки в зависимости от текущего состояния меню
      if (rename) {
        toggleButton.textContent = menuField.classList.contains('collapsed')
          ? 'Развернуть'
          : 'Свернуть';
      }
    });
  }
}

// Экспортируем функцию для использования в других модулях, если требуется
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = collapsed;
} else {
  window.collapsed = collapsed;
}

// Пример инициализации, если модуль загружается напрямую
// Для использования, раскомментируйте следующую строку:
// collapsed();

// Экспортируем функцию для использования в других частях приложения
export default collapsed;
