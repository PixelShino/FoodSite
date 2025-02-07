// replaceImg.js

/**
 * Функция для замены изображения в элементе в зависимости от его активного состояния.
 *
 * @param {string} containerSelector - Селектор родительского контейнера.
 * @param {string} itemClass - Класс элемента, содержащего изображение.
 * @param {string} activeClass - Класс, обозначающий активное состояние элемента.
 */
function replaceImg(containerSelector, itemClass, activeClass) {
  // Выбираем родительский контейнер по селектору
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.error(`Контейнер с селектором "${containerSelector}" не найден.`);
    return;
  }

  /**
   * Функция для обновления изображений в элементах внутри контейнера.
   * Если элемент содержит класс activeClass, используется активное изображение,
   * иначе подставляется стандартное изображение.
   */
  function updateImages() {
    // Выбираем все элементы с указанным классом внутри контейнера
    const items = container.querySelectorAll(`.${itemClass}`);
    items.forEach((item) => {
      const img = item.querySelector('img');
      if (img) {
        // Получаем пути к изображениям из data-атрибутов
        const newSrc = item.dataset.img;
        const activeSrc = item.dataset.activeImg;
        // Определяем, имеет ли элемент активное состояние
        const isActive = item.classList.contains(activeClass);
        // Устанавливаем src изображения в зависимости от состояния элемента
        img.src = isActive ? activeSrc : newSrc;
      }
    });
  }

  // Здесь можно добавить обработчик события на родительский контейнер, если требуется:
  // Например, при клике обновлять изображения для элементов,
  // убедившись, что клик произошёл по элементу с нужным классом:
  //
  // container.addEventListener('click', (event) => {
  //   if (event.target.closest(`.${itemClass}`)) {
  //     updateImages();
  //   }
  // });

  // Обновляем изображения для всех элементов сразу
  updateImages();
}

export default replaceImg;
