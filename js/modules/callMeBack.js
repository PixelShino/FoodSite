function callMeBack() {
  // Находим элементы формы
  const nameInput = document.querySelector('.order__input.order__input--name');
  const numberInput = document.querySelector(
    '.order__input.order__input--number',
  );
  const callBtn = document.querySelector('.order__btn');

  // Регулярное выражение для валидации телефона
  const phoneRegex = /^\+?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  // Функция для валидации полей
  function validateForm() {
    let isValid = true;

    // Очистка предыдущих ошибок
    nameInput.classList.remove('invalid');
    numberInput.classList.remove('invalid');

    // Проверка имени
    if (!nameInput.value.trim()) {
      nameInput.classList.add('invalid');
      isValid = false;
    }

    // Проверка телефона
    if (!phoneRegex.test(numberInput.value.trim())) {
      numberInput.classList.add('invalid');
      isValid = false;
    }

    return isValid;
  }

  // Получение времени
  function getCurrentTime() {
    const now = new Date();
    return now.toISOString(); // Возвращает время в формате ISO
  }

  // Получение геолокации
  function getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(new Error(`Geolocation error: ${error.message}`));
          },
        );
      }
    });
  }

  // Преобразование координат в адрес с помощью OpenCage API
  async function getCityAndCountry({ latitude, longitude }) {
    const apiKey = 'e6956a4aa92240e2ad6c176774e3c2d7'; //  ключ OpenCage
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      const { city, country } = data.results[0]?.components || {
        city: null,
        country: null,
      };
      return { city, country };
    } catch (error) {
      console.warn('Error fetching city and country:', error.message);
      return { city: null, country: null };
    }
  }

  // Обработчик отправки формы
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Валидация формы
    if (!validateForm()) return;

    // Показываем заглушку загрузки
    const statusMessage = showLoadingSpinner();

    try {
      // Получаем текущее время
      const currentTime = getCurrentTime();

      // Получаем геолокацию пользователя
      let location = null;
      try {
        location = await getUserLocation();
      } catch (locationError) {
        console.warn(locationError.message);
        location = { latitude: null, longitude: null }; // Если геолокация недоступна
      }

      // Получаем город и страну
      const { city, country } = await getCityAndCountry(location);

      // Подготовка данных для отправки
      const formData = {
        name: nameInput.value.trim(),
        phone: numberInput.value.trim(),
        time: currentTime,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          city: city,
          country: country,
        },
      };

      // Отправка данных на сервер
      const response = await fetch('http://localhost:3000/callMeBack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Проверка статуса ответа
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Логирование полного ответа
      const text = await response.text();
      console.log('Server response:', text);

      // Парсинг JSON
      const data = JSON.parse(text);

      // Проверка формата ответа
      if (!data || typeof data.success !== 'boolean') {
        throw new Error('Invalid server response format');
      }

      if (!data.success) {
        throw new Error('Failed to send request');
      }

      // Успешная отправка
      showThanksModal('Спасибо! Мы скоро свяжемся с вами.');
    } catch (error) {
      console.error('Form submission error:', error.message);
      showThanksModal('Что-то пошло не так...');
    } finally {
      // Убираем заглушку загрузки
      cleanupAfterSubmission(statusMessage);
    }
  }

  // Привязываем обработчик к кнопке
  callBtn.addEventListener('click', handleFormSubmit);

  // Вспомогательные функции
  function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    document.body.appendChild(spinner);
    return spinner;
  }

  function cleanupAfterSubmission(statusMessage) {
    if (statusMessage && statusMessage.parentNode) {
      statusMessage.parentNode.removeChild(statusMessage);
    }
  }

  function showThanksModal(message) {
    alert(message); // Можно заменить на более сложную модальную форму
  }
}

export default callMeBack;
