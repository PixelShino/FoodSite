function reviews() {
  // Рейтинг звезд
  const ratingContainer = document.getElementById('ratingStars');
  let selectedRating = 0;

  if (ratingContainer) {
    ratingContainer.addEventListener('click', function (e) {
      if (e.target.matches('i')) {
        const rating = parseInt(e.target.dataset.rating);
        selectedRating = rating;
        updateStars(rating);
      }
    });

    ratingContainer.addEventListener('mouseover', function (e) {
      if (e.target.matches('i')) {
        const rating = parseInt(e.target.dataset.rating);
        updateStars(rating);
      }
    });

    ratingContainer.addEventListener('mouseleave', function () {
      updateStars(selectedRating);
    });
  }

  function updateStars(rating) {
    const stars = ratingContainer.querySelectorAll('i');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  // Предпросмотр загруженного изображения
  const fileInput = document.getElementById('userPhoto');
  if (fileInput) {
    fileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const preview = document.createElement('div');
          preview.className = 'form__preview';
          preview.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="form__preview-remove">×</button>
                    `;

          const existingPreview =
            fileInput.parentElement.querySelector('.form__preview');
          if (existingPreview) {
            existingPreview.remove();
          }

          fileInput.parentElement.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Обработка отправки формы
  const form = document.getElementById('reviewForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      formData.append('rating', selectedRating);

      // Здесь можно добавить код для отправки данных на сервер
      console.log('Отправка формы:', {
        name: formData.get('userName'),
        rating: selectedRating,
        text: formData.get('reviewText'),
        photo: formData.get('userPhoto'),
      });

      // Очистка формы после отправки
      form.reset();
      selectedRating = 0;
      updateStars(0);
      const preview = form.querySelector('.form__preview');
      if (preview) {
        preview.remove();
      }
    });
  }
}
export default reviews;
