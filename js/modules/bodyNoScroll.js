/*
 * Функция bodyNoScroll
 * Назначение: переключает класс 'no-scroll' для элемента <body>.
 * Это позволяет блокировать или разрешать прокрутку страницы.
 *
 * Параметры:
 *   item   - селектор контента, управляющего состоянием (по умолчанию '.burger__content').
 *   active - селектор активного состояния (по умолчанию '.active').
 */
function bodyNoScroll(item = '.burger__content', active = '.active') {
  const body = document.querySelector('body'); // Получаем элемент <body>

  // Если указаны значения для item и active, переключаем класс 'no-scroll'
  if (item && active) {
    body.classList.toggle('no-scroll');
    console.log('bodyNoScroll work'); // Выводим сообщение для отладки
  }
}
export default bodyNoScroll;
