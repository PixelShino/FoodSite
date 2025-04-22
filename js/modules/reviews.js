import { openModal, closeModal } from './modal.js';

/**
 * Функция для работы с отзывами.
 * Управляет рейтингом, загрузкой фото, валидацией формы и отправкой данных отзыва.
 *
 * @returns {object} Объект с методом cleanup для удаления обработчиков событий.
 */
function reviews() {
  const elements = {
    ratingContainer: document.getElementById('ratingStars'),
    fileInput: document.getElementById('userPhoto'),
    form: document.getElementById('reviewForm'),
    nameInput: document.querySelector('#userName'),
    reviewText: document.querySelector('#reviewText'),
  };

  if (!elements.ratingContainer || !elements.fileInput || !elements.form) {
    console.warn('Не найдены необходимые элементы');
    return;
  }

  let selectedRating = 0;
  const MAX_REVIEW_LENGTH = 500;

  // Инициализация обработчиков событий
  initializeEventListeners();

  /**
   * Инициализирует обработчики событий для элементов формы отзыва.
   */
  function initializeEventListeners() {
    // Обработчик клика по звездам рейтинга
    elements.ratingContainer.addEventListener('click', handleRatingClick);
    // Обработчик наведения мыши на звезды рейтинга
    elements.ratingContainer.addEventListener('mouseover', handleRatingHover);
    // Обработчик ухода мыши с контейнера рейтинга: возвращает звезды в состояние выбранного рейтинга
    elements.ratingContainer.addEventListener('mouseleave', () =>
      updateStars(selectedRating),
    );

    // Обработчик изменения файла в поле загрузки фото
    elements.fileInput.addEventListener('change', (e) =>
      handleFile(e.target.files[0]),
    );

    // Обработчик отправки формы
    elements.form.addEventListener('submit', handleFormSubmit);
  }

  /**
   * Обработчик клика по звездам рейтинга.
   *
   * @param {MouseEvent} e - Событие клика.
   */
  function handleRatingClick(e) {
    if (e.target.matches('i')) {
      selectedRating = parseInt(e.target.dataset.rating);
      updateStars(selectedRating);
    }
  }

  /**
   * Обработчик наведения мыши на звезды рейтинга.
   *
   * @param {MouseEvent} e - Событие наведения.
   */
  function handleRatingHover(e) {
    if (e.target.matches('i')) {
      updateStars(parseInt(e.target.dataset.rating));
    }
  }

  /**
   * Обновляет отображение звезд рейтинга.
   *
   * @param {number} rating - Текущий рейтинг.
   */
  function updateStars(rating) {
    const stars = elements.ratingContainer.querySelectorAll('i');
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < rating);
    });
  }

  /**
   * Инициализирует зону перетаскивания для загрузки изображения.
   */
  function initializeDropZone() {
    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    dropZone.innerHTML = '<p>Перетащите изображение сюда или выберите файл</p>';
    elements.fileInput.parentElement.appendChild(dropZone);

    // Обработчик события dragover для зоны перетаскивания
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drop-zone--over');
    });

    // Обработчик события dragleave для зоны перетаскивания
    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drop-zone--over');
    });

    // Обработчик события drop для зоны перетаскивания
    dropZone.addEventListener('drop', handleDrop);
  }
  // Инициализация зоны перетаскивания
  initializeDropZone();

  /**
   * Обрабатывает событие drop (перетаскивание файла) в зоне загрузки.
   *
   * @param {DragEvent} e - Событие перетаскивания.
   */
  function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drop-zone--over');

    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (isValidImageFile(file)) {
        updateFileInput(file);
        handleFile(file);
      }
    }
  }

  /**
   * Проверяет, является ли переданный файл допустимым изображением.
   *
   * @param {File} file - Файл для проверки.
   * @returns {boolean} Истина, если файл является изображением.
   */
  function isValidImageFile(file) {
    return file && file.type.startsWith('image/');
  }

  /**
   * Обновляет значение input для файла с использованием DataTransfer.
   *
   * @param {File} file - Файл для установки.
   */
  function updateFileInput(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    elements.fileInput.files = dataTransfer.files;
  }

  /**
   * Создает предпросмотр изображения.
   *
   * @param {HTMLElement} container - Контейнер для предпросмотра.
   * @param {string} imageUrl - URL изображения для предпросмотра.
   * @returns {HTMLElement} Элемент предпросмотра.
   */
  function createImagePreview(container, imageUrl) {
    const fragment = document.createDocumentFragment();
    const preview = document.createElement('div');
    preview.className = 'form__preview';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Предпросмотр';

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'form__preview-remove';
    removeButton.textContent = '×';

    preview.appendChild(img);
    preview.appendChild(removeButton);
    fragment.appendChild(preview);

    // Если уже существует предпросмотр, удаляем его
    const existingPreview = container.querySelector('.form__preview');
    if (existingPreview) existingPreview.remove();

    // Обработчик удаления предпросмотра
    removeButton.addEventListener('click', () => {
      preview.remove();
      elements.fileInput.value = '';
    });

    container.appendChild(fragment);
    return preview;
  }

  /**
   * Обрабатывает выбранный файл, создавая предпросмотр изображения.
   *
   * @param {File} file - Выбранный файл.
   */
  function handleFile(file) {
    if (!isValidImageFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      createImagePreview(elements.fileInput.parentElement, e.target.result);
    };
    reader.readAsDataURL(file);
  }

  /**
   * Обрабатывает отправку формы отзыва.
   *
   * @param {Event} e - Событие отправки формы.
   */
  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const statusMessage = showLoadingSpinner();

    try {
      const reviewData = {
        name: elements.nameInput.value,
        text: elements.reviewText.value,
        rating: selectedRating,
      };

      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ошибка! статус: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error('Не удалось отправить отзыв');
      }

      showThanksModal('Спасибо! Ваш отзыв отправлен');
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      showThanksModal('Что-то пошло не так...');
    } finally {
      cleanupAfterSubmission(statusMessage);
    }
  }

  /**
   * Проверяет корректность заполнения формы.
   *
   * @returns {boolean} Истина, если форма заполнена корректно.
   */
  function validateForm() {
    const { nameInput, reviewText, fileInput } = elements;

    if (
      !nameInput.value.trim() ||
      !reviewText.value.trim() ||
      !fileInput.files[0]
    ) {
      alert('Пожалуйста, заполните все обязательные поля');
      return false;
    }

    if (reviewText.value.length > MAX_REVIEW_LENGTH) {
      alert(`Максимальное количество символов: ${MAX_REVIEW_LENGTH}`);
      return false;
    }

    return true;
  }

  /**
   * Показывает индикатор загрузки.
   *
   * @returns {HTMLElement} Элемент индикатора загрузки.
   */
  function showLoadingSpinner() {
    const statusMessage = document.createElement('img');
    statusMessage.src = 'img/form/spinner.svg';
    statusMessage.style.cssText = 'display: block; margin: 0 auto;';
    elements.form.insertAdjacentElement('afterend', statusMessage);
    return statusMessage;
  }

  /**
   * Создает объект с данными формы.
   *
   * @returns {object} Объект с данными формы.
   */
  function createFormData() {
    return {
      name: elements.nameInput.value,
      text: elements.reviewText.value,
      rating: selectedRating,
      photo: elements.fileInput.files[0].name,
    };
  }

  /**
   * Очищает форму и сбрасывает состояние после отправки.
   *
   * @param {HTMLElement} statusMessage - Элемент индикатора загрузки.
   */
  function cleanupAfterSubmission(statusMessage) {
    statusMessage.remove();
    elements.form.reset();
    selectedRating = 0;
    updateStars(0);
    const preview = elements.form.querySelector('.form__preview');
    if (preview) preview.remove();
  }

  /**
   * Отправляет данные методом POST.
   *
   * @param {string} url - URL для отправки данных.
   * @param {object} data - Данные для отправки.
   * @returns {Promise<object>} Ответ сервера в формате JSON.
   */
  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  /**
   * Показывает модальное окно с сообщением благодарности.
   *
   * @param {string} message - Сообщение для отображения в модальном окне.
   */
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    const closeButton = thanksModal.querySelector('[data-close]');
    closeButton.addEventListener('click', closeModal);

    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  /**
   * Функция для удаления обработчиков событий.
   */
  const cleanup = () => {
    elements.ratingContainer.removeEventListener('click', handleRatingClick);
    elements.ratingContainer.removeEventListener(
      'mouseover',
      handleRatingHover,
    );
    elements.ratingContainer.removeEventListener('mouseleave', () =>
      updateStars(selectedRating),
    );
    elements.fileInput.removeEventListener('change', handleFile);
    elements.form.removeEventListener('submit', handleFormSubmit);
  };

  return {
    cleanup,
  };
}

export default reviews;
