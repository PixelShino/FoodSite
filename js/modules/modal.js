//TODO: убрать засорение глобальной области видимости
let openModal;
let closeModal;
function modal(triggerSelector, modalSelector, closeSelector) {
  function initModal() {
    const trigger = document.querySelectorAll(triggerSelector); //кнопка открытия
    const modal = document.querySelector(modalSelector); // модальное окно
    const close = document.querySelector(closeSelector); // кнопка закрытия

    // Открытие модального окна и добавление обработчика `keydown`
    openModal = () => {
      modal.classList.add('show');
      document.addEventListener('keydown', onEscapePress);
      document.body.style.overflow = 'hidden';
      clearInterval(timerModal);
    };

    // Закрытие модального окна и удаление обработчика `keydown`
    closeModal = () => {
      modal.classList.remove('show');
      document.removeEventListener('keydown', onEscapePress);
      document.body.style.overflow = 'auto';
    };

    // Обработчик для закрытия модального окна по клавише Escape
    const onEscapePress = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      }
    };

    // Открытие модального окна по клику на кнопки с атрибутом data-modal
    trigger.forEach((button) => button.addEventListener('click', openModal));

    // Закрытие модального окна по клику на кнопку с атрибутом data-close
    close.addEventListener('click', closeModal);

    // Закрытие модального окна по клику вне его содержимого
    modal.addEventListener('click', (event) => {
      if (event.target === modal || event.target.getAttribute(close === '')) {
        closeModal();
      }
    });

    // Вызов modal по истечению 50с
    let timerModal = setTimeout(openModal, 50000);

    // вызов modal на конце страницы
    //TODO: Сделать запрет на повторное срабатывание в течении определенного времени
    //TODO: рефрактор с использованием Intersection Observer api
    function showModalOnEndOfPage() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      if (scrollPosition >= documentHeight) {
        openModal();
        window.removeEventListener('scroll', showModalOnEndOfPage);
      }
    }
    window.addEventListener('scroll', showModalOnEndOfPage);
  }

  initModal();
}
export default modal;
export { openModal, closeModal };
