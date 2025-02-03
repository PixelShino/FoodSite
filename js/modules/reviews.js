import { openModal, closeModal } from './modal.js';

function reviews() {
  const elements = {
    ratingContainer: document.getElementById('ratingStars'),
    fileInput: document.getElementById('userPhoto'),
    form: document.getElementById('reviewForm'),
    nameInput: document.querySelector('#userName'),
    reviewText: document.querySelector('#reviewText'),
  };

  if (!elements.ratingContainer || !elements.fileInput || !elements.form) {
    console.warn('Required elements not found');
    return;
  }

  let selectedRating = 0;
  const MAX_REVIEW_LENGTH = 500;

  initializeEventListeners();

  function initializeEventListeners() {
    elements.ratingContainer.addEventListener('click', handleRatingClick);
    elements.ratingContainer.addEventListener('mouseover', handleRatingHover);
    elements.ratingContainer.addEventListener('mouseleave', () =>
      updateStars(selectedRating),
    );

    elements.fileInput.addEventListener('change', (e) =>
      handleFile(e.target.files[0]),
    );

    elements.form.addEventListener('submit', handleFormSubmit);
  }

  function handleRatingClick(e) {
    if (e.target.matches('i')) {
      selectedRating = parseInt(e.target.dataset.rating);
      updateStars(selectedRating);
    }
  }

  function handleRatingHover(e) {
    if (e.target.matches('i')) {
      updateStars(parseInt(e.target.dataset.rating));
    }
  }

  function updateStars(rating) {
    const stars = elements.ratingContainer.querySelectorAll('i');
    stars.forEach((star, index) => {
      star.classList.toggle('active', index < rating);
    });
  }

  function initializeDropZone() {
    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    dropZone.innerHTML = '<p>Перетащите изображение сюда или выберите файл</p>';
    elements.fileInput.parentElement.appendChild(dropZone);

    // Drop zone events
    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('drop-zone--over');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drop-zone--over');
    });

    dropZone.addEventListener('drop', handleDrop);
  }
  initializeDropZone();

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

  function isValidImageFile(file) {
    return file && file.type.startsWith('image/');
  }

  function updateFileInput(file) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    elements.fileInput.files = dataTransfer.files;
  }

  function createImagePreview(container, imageUrl) {
    const fragment = document.createDocumentFragment();
    const preview = document.createElement('div');
    preview.className = 'form__preview';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Preview';

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'form__preview-remove';
    removeButton.textContent = '×';

    preview.appendChild(img);
    preview.appendChild(removeButton);
    fragment.appendChild(preview);

    const existingPreview = container.querySelector('.form__preview');
    if (existingPreview) existingPreview.remove();

    removeButton.addEventListener('click', () => {
      preview.remove();
      elements.fileInput.value = '';
    });

    container.appendChild(fragment);
    return preview;
  }

  function handleFile(file) {
    if (!isValidImageFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      createImagePreview(elements.fileInput.parentElement, e.target.result);
    };
    reader.readAsDataURL(file);
  }

  // async function uploadImageToImgur(file) {
  //   try {
  //     const formData = new FormData();
  //     formData.append('image', file);
  //     formData.append('type', 'file');

  //     const response = await fetch('https://api.imgur.com/3/image', {
  //       method: 'POST', // Changed from GET to POST
  //       headers: {
  //         Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`, // Use environment variable
  //       },
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       return data.data.link;
  //     }
  //     throw new Error('Image upload failed');
  //   } catch (error) {
  //     console.error('Imgur upload error:', error);
  //     throw error;
  //   }
  // }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const statusMessage = showLoadingSpinner();

    try {
      const reviewData = {
        // Declare reviewData object here
        name: elements.nameInput.value,
        text: elements.reviewText.value,
        rating: selectedRating,
      };

      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData), // Use the correctly declared object
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error('Failed to send review');
      }

      showThanksModal('Спасибо! Ваш отзыв отправлен');
    } catch (error) {
      console.error('Form submission error:', error);
      showThanksModal('Что-то пошло не так...');
    } finally {
      cleanupAfterSubmission(statusMessage);
    }
  }
  function isValidImageFile(file) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

    if (!file) return false;
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert('Please upload only JPEG, PNG or GIF images');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('File size should not exceed 5MB');
      return false;
    }
    return true;
  }

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

  function showLoadingSpinner() {
    const statusMessage = document.createElement('img');
    statusMessage.src = 'img/form/spinner.svg';
    statusMessage.style.cssText = 'display: block; margin: 0 auto;';
    elements.form.insertAdjacentElement('afterend', statusMessage);
    return statusMessage;
  }

  function createFormData() {
    return {
      name: elements.nameInput.value,
      text: elements.reviewText.value,
      rating: selectedRating,
      photo: elements.fileInput.files[0].name,
    };
  }

  function cleanupAfterSubmission(statusMessage) {
    statusMessage.remove();
    elements.form.reset();
    selectedRating = 0;
    updateStars(0);
    const preview = elements.form.querySelector('.form__preview');
    if (preview) preview.remove();
  }

  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST', // Changed from GET to POST
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

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
