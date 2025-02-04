/**
 * Функция для настройки поведения фиксированной промо-блокировки,
 * которая меняет классы элемента в зависимости от положения прокрутки.
 */
export default function fixedPromo() {
  /**
   * Обработчик события прокрутки страницы.
   * Проверяет позицию прокрутки и обновляет классы рекламного блока.
   */
  function handleScroll() {
    // Получаем рекламный блок и родительский контейнер
    const promoElement = document.querySelector('.tabcontainer__bot-promo');
    const parent = document.querySelector('.tabcontainer');

    // Проверяем наличие обязательных элементов
    if (!promoElement) {
      console.error('Элемент с классом .tabcontainer__bot-promo не найден');
      return; // Прерываем выполнение, если рекламный блок не найден
    }
    if (!parent) {
      console.error('Элемент с классом .tabcontainer не найден');
      return; // Прерываем выполнение, если родительский контейнер не найден
    }

    // Вычисляем вертикальную позицию родительского контейнера относительно начала документа
    const promoElementPosition =
      parent.getBoundingClientRect().top + window.scrollY;
    // Текущая позиция прокрутки страницы
    const scrollPosition = window.scrollY;

    // Если страница прокручена ниже или равна началу рекламного блока:
    // Убираем класс фиксированного нижнего позиционирования,
    // иначе добавляем его для возврата к абсолютному позиционированию.
    if (scrollPosition >= promoElementPosition) {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedBot');
    } else {
      promoElement.classList.add('tabcontainer__bot-promo--fixedBot');
    }

    // Если прокрутка значительно превышает начальную позицию рекламного блока
    // (расчетный порог: высота элемента, умноженная на 15),
    // переключаем фиксированное верхнее позиционирование.
    if (
      scrollPosition >
      promoElementPosition + promoElement.offsetHeight * 15
    ) {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedBot');
      promoElement.classList.add('tabcontainer__bot-promo--fixedTop');
    } else {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedTop');
    }
  }

  // Добавляем обработчик события скролла к документу.
  document.addEventListener('scroll', handleScroll);
}
