/*
 * Функция menuCardSlider отвечает за создание горизонтального слайдера для карточек.
 * При этом реализована инерционная прокрутка и обработка событий мыши и касаний для мобильных устройств.
 */
function menuCardSlider(cardContainerOpt) {
  // Определяем элемент контейнера карточек. Если передан аргумент, используем его, иначе ищем элемент с классом.
  let cardContainer =
    cardContainerOpt || document.querySelector('.tabcontent__bot-cards');

  // Если контейнер не найден, прекращаем выполнение.
  if (!cardContainer) return;

  // Переменные для работы с мышью
  let isDown = false; // Флаг удержания кнопки мыши
  let startX; // Начальная позиция по X при нажатии мыши
  let scrollLeft; // Начальная позиция скролла контейнера
  let velocity = 0; // Переменная для хранения скорости при инерционной прокрутке

  // Обработчик нажатия мыши
  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - cardContainer.offsetLeft; // Запоминаем относительную позицию курсора
    scrollLeft = cardContainer.scrollLeft; // Сохраняем начальное положение прокрутки
    velocity = 0; // Сброс скорости при новом начале перетаскивания
    cardContainer.style.cursor = 'grabbing'; // Изменяем курсор для визуальной обратной связи
  };

  // Обработчик движения мыши
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault(); // Отменяем стандартное поведение для предотвращения выделения текста
    const x = e.pageX - cardContainer.offsetLeft;
    const walk = (x - startX) * 2; // Вычисляем пройденное расстояние с коэффициентом для усиления эффекта
    velocity = walk; // Обновляем скорость перетаскивания
    cardContainer.scrollLeft = scrollLeft - walk; // Обновление скролла контейнера на основании пройденного расстояния
  };

  // Обработчик завершения работы с мышью (отпускание кнопки или уход курсора за окно)
  const handleMouseUpOrLeave = () => {
    isDown = false;
    cardContainer.style.cursor = 'grab'; // Возвращаем курсор к исходному виду
    beginScrollDeceleration(); // Запускаем инерционную прокрутку после отпуска мыши
  };

  // Функция инерционной прокрутки для мыши
  const beginScrollDeceleration = () => {
    if (Math.abs(velocity) < 0.5) return; // Если скорость мала, прекращаем анимацию
    velocity *= 0.95; // Замедляем скорость (коэффициент замедления)
    cardContainer.scrollLeft -= velocity; // Продолжаем сдвигать контейнер
    requestAnimationFrame(beginScrollDeceleration); // Рекурсивно вызываем функцию для плавной анимации
  };

  // Добавляем события мыши к контейнеру и окну
  cardContainer.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUpOrLeave);
  window.addEventListener('mouseleave', handleMouseUpOrLeave);
  cardContainer.style.cursor = 'grab'; // Изначальный стиль курсора

  // Переменные для обработки событий касания (touch)
  let isTouching = false; // Флаг активации касания
  let touchStartX; // Начальная координата X для касания
  let touchStartY; // Начальная координата Y для касания
  let touchScrollLeft; // Начальное положение прокрутки для касания
  let touchVelocity = 0; // Скорость движения при касании
  let isScrolling; // Флаг для определения, идет вертикальная прокрутка (true) или горизонтальная (false)

  // Обработчик начала касания
  const handleTouchStart = (e) => {
    isTouching = true;
    isScrolling = undefined; // Сброс определения направления движения
    touchStartX = e.touches[0].pageX - cardContainer.offsetLeft; // Сохраняем относительную координату X
    touchStartY = e.touches[0].pageY; // Сохраняем координату Y
    touchScrollLeft = cardContainer.scrollLeft; // Запоминаем начальный скролл
    touchVelocity = 0; // Сброс скорости
  };

  // Обработчик движения при касании
  const handleTouchMove = (e) => {
    if (!isTouching) return;
    const currentX = e.touches[0].pageX - cardContainer.offsetLeft;
    const currentY = e.touches[0].pageY;
    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;

    // Определяем направление движения при первом событии touchmove,
    // сравнивая смещения по вертикали и горизонтали
    if (typeof isScrolling === 'undefined') {
      isScrolling = Math.abs(deltaY) > Math.abs(deltaX);
    }

    // Если определено, что пользователь свайпает вертикально,
    // не перехватываем событие, чтобы дать возможность прокрутить страницу.
    if (isScrolling) {
      return;
    }

    // Если движение горизонтальное, предотвращаем стандартное поведение и обрабатываем свайп.
    e.preventDefault();
    const walk = deltaX * 2; // Расчет расстояния с усилителем
    touchVelocity = walk; // Обновляем скорость касания
    cardContainer.scrollLeft = touchScrollLeft - walk; // Обновляем положение скролла
  };

  // Обработчик завершения касания
  const handleTouchEnd = () => {
    isTouching = false;
    beginTouchDeceleration(); // Запускаем инерционную прокрутку для касания
  };

  // Функция инерционной прокрутки для касания
  const beginTouchDeceleration = () => {
    if (Math.abs(touchVelocity) < 0.5) return; // Если скорость мала, прекращаем анимацию
    touchVelocity *= 0.95; // Замедляем скорость
    cardContainer.scrollLeft -= touchVelocity; // Обновляем позицию скролла
    requestAnimationFrame(beginTouchDeceleration); // Рекурсивный вызов для плавной анимации
  };

  // Добавляем события касания к контейнеру с указанием passive: false, чтобы можно было вызвать e.preventDefault()
  cardContainer.addEventListener('touchstart', handleTouchStart);
  cardContainer.addEventListener('touchmove', handleTouchMove, {
    passive: false,
  });
  cardContainer.addEventListener('touchend', handleTouchEnd);

  // Возвращаем функцию для удаления всех обработчиков событий при необходимости очистки
  return () => {
    cardContainer.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUpOrLeave);
    window.removeEventListener('mouseleave', handleMouseUpOrLeave);

    cardContainer.removeEventListener('touchstart', handleTouchStart);
    cardContainer.removeEventListener('touchmove', handleTouchMove);
    cardContainer.removeEventListener('touchend', handleTouchEnd);
  };
}

export default menuCardSlider;
