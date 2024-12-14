export default function fixedPromo() {
  document.addEventListener('scroll', function () {
    const promoElement = document.querySelector('.tabcontainer__bot-promo');
    const parent = document.querySelector('.tabcontainer'); // FIM
    const nextContainer = document.querySelector('.calculating__field');

    // Проверяем, найден ли элемент
    if (!promoElement) {
      console.error('Элемент с классом .tabcontainer__bot-promo не найден');
      return; // Завершаем выполнение функции, если элемент не найден
    }

    const promoElementPosition =
      parent.getBoundingClientRect().top + window.scrollY;
    const nextContainerPosition =
      nextContainer.getBoundingClientRect().top + window.scrollY; // Позиция элемента на странице
    const scrollPosition = window.scrollY; // Текущая позиция прокрутки

    // Если прокрутка страницы больше, чем позиция элемента
    if (scrollPosition >= promoElementPosition) {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedBot');
    } else {
      promoElement.classList.add('tabcontainer__bot-promo--fixedBot'); // Возвращаем обратно в абсолют
    }

    if (
      scrollPosition >
      promoElementPosition + promoElement.offsetHeight * 15
    ) {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedBot');
      promoElement.classList.add('tabcontainer__bot-promo--fixedTop');
    } else {
      promoElement.classList.remove('tabcontainer__bot-promo--fixedTop');
    }
  });
}
