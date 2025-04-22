// tabsAndSlider.js
import insertContent from './moveContent';
/**
 * Функция SliderV2 - реализует слайдер с поддержкой навигации по клику, клавиатуре,
 * touch-событиями и перетаскиванием мышью.
 *
 * @param {string} contentSelector - CSS селектор для элементов слайдов.
 * @param {string} parentSelector - CSS селектор для родительского элемента слайдов.
 * @param {string} sliderPrev - CSS селектор для кнопки переключения на предыдущий слайд.
 * @param {string} sliderNext - CSS селектор для кнопки переключения на следующий слайд.
 * @param {string} current - CSS селектор для элемента отображения текущего номера слайда.
 * @param {string} total - CSS селектор для элемента отображения общего количества слайдов.
 */
function SliderV2(
  contentSelector,
  parentSelector,
  sliderPrev,
  sliderNext,
  current,
  total,
) {
  // Получение DOM элементов для слайдера
  const tabsContent = document.querySelectorAll(contentSelector);
  const tabsParent = document.querySelector(parentSelector);
  const prev = document.querySelector(sliderPrev);
  const next = document.querySelector(sliderNext);
  const currentCounter = document.querySelector(current);
  const totalCounter = document.querySelector(total);

  // Локальное состояние слайдера
  let slideIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Проверяем наличие всех необходимых элементов
  if (
    !tabsContent.length ||
    !tabsParent ||
    !prev ||
    !next ||
    !currentCounter ||
    !totalCounter
  ) {
    console.error('Required elements not found');
    return;
  }

  /**
   * Скрывает все слайды.
   */
  function hideContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show');
    });
  }

  /**
   * Показывает слайд по заданному индексу.
   * @param {number} [index=0] - Индекс слайда для отображения.
   */
  function showContent(index = 0) {
    tabsContent[index].classList.add('show');
    tabsContent[index].classList.remove('hide');
    updateCounter(index);
    // Вызов функции вставки контента для текущего слайда
    insertContent(index);
  }

  /**
   * Обновляет счетчик текущего слайда и общего количества слайдов.
   * @param {number} index - Индекс текущего слайда.
   */
  function updateCounter(index) {
    currentCounter.textContent = getZero(index + 1);
    totalCounter.textContent = getZero(tabsContent.length);
  }

  /**
   * Добавляет ведущий ноль к числу, если оно меньше 10.
   * @param {number} num - Число для форматирования.
   * @returns {string|number} - Строка с ведущим нулем или число, если оно больше или равно 10.
   */
  function getZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
  }

  /**
   * Изменяет слайд в зависимости от направления.
   * @param {string} direction - Направление ('prev' для предыдущего, 'next' для следующего).
   */
  function changeSlide(direction) {
    console.log(`Changing slide: ${direction}`);
    if (direction === 'prev') {
      slideIndex = slideIndex === 0 ? tabsContent.length - 1 : slideIndex - 1;
    } else {
      slideIndex = slideIndex === tabsContent.length - 1 ? 0 : slideIndex + 1;
    }
    console.log(`New slide index: ${slideIndex}`);
    hideContent();
    showContent(slideIndex);

    // Вызов функции для вставки контента после смены слайда
    insertContent(slideIndex);
  }

  /**
   * Обработчик нажатия клавиш для переключения слайдера.
   * @param {KeyboardEvent} event - Событие нажатия клавиши.
   */
  function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
      changeSlide('prev');
    } else if (event.key === 'ArrowRight') {
      changeSlide('next');
    }
  }

  /**
   * Обработчик начала касания экрана.
   * @param {TouchEvent} event - Событие касания.
   */
  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchEndX = touchStartX;
  }

  /**
   * Обработчик движения пальца по экрану.
   * @param {TouchEvent} event - Событие перемещения касания.
   */
  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }

  /**
   * Обработчик окончания касания, вычисляет направление свайпа.
   */
  function handleTouchEnd() {
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      changeSlide(swipeDistance < 0 ? 'next' : 'prev');
    }
  }

  // Переменные для обработки перетаскивания мышью
  let isDragging = false;
  let startX;

  /**
   * Обработчик нажатия кнопки мыши.
   * @param {MouseEvent} event - Событие нажатия мыши.
   */
  function handleMouseDown(event) {
    isDragging = true;
    startX = event.pageX;
    tabsParent.style.cursor = 'grabbing';
  }

  /**
   * Обработчик движения мыши при зажатой кнопке.
   * @param {MouseEvent} event - Событие перемещения мыши.
   */
  function handleMouseMove(event) {
    if (!isDragging) return;

    const x = event.pageX;
    const distance = startX - x;

    if (Math.abs(distance) > 50) {
      changeSlide(distance > 0 ? 'next' : 'prev');
      isDragging = false;
      tabsParent.style.cursor = 'grab';
    }
  }

  /**
   * Обработчик отпускания кнопки мыши.
   */
  function handleMouseUp() {
    isDragging = false;
    tabsParent.style.cursor = 'grab';
  }

  // Назначение обработчиков для кнопок и событий
  prev.addEventListener('click', () => changeSlide('prev'));
  next.addEventListener('click', () => changeSlide('next'));
  document.addEventListener('keydown', handleKeyPress);

  tabsParent.addEventListener('touchstart', handleTouchStart);
  tabsParent.addEventListener('touchmove', handleTouchMove);
  tabsParent.addEventListener('touchend', handleTouchEnd);

  tabsParent.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  // Установка начального стиля курсора
  tabsParent.style.cursor = 'grab';

  // Инициализация слайдера: скрываем все слайды и показываем первый
  hideContent();
  showContent();

  /**
   * Функция для очистки (удаления) обработчиков событий.
   * Возвращает функцию, вызывая которую, можно отменить регистрацию событий.
   * @returns {Function} Функция очистки обработчиков событий.
   */
  return function cleanup() {
    document.removeEventListener('keydown', handleKeyPress);
    tabsParent.removeEventListener('touchstart', handleTouchStart);
    tabsParent.removeEventListener('touchmove', handleTouchMove);
    tabsParent.removeEventListener('touchend', handleTouchEnd);
    tabsParent.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
}

export default SliderV2;
