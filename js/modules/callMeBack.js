/**
 * Функция для инициализации обработки формы обратного звонка.
 * Находит необходимые элементы, устанавливает обработчики событий
 * и выполняет валидацию, сбор данных, получение геолокации и отправку данных на сервер.
 */
function callMeBack() {
  // Получение элементов формы
  const nameInput = document.querySelector('.order__input.order__input--name');
  const numberInput = document.querySelector(
    '.order__input.order__input--number',
  );
  const callBtn = document.querySelector('.order__btn');

  // Регулярное выражение для валидации телефонного номера
  const phoneRegex = /^\+?\d{1,3}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  /**
   * Валидация заполнения формы.
   * @returns {boolean} isValid - true, если поля заполнены корректно.
   */
  function validateForm() {
    let isValid = true;

    // Очистка предыдущих сообщений об ошибке
    nameInput.classList.remove('invalid');
    numberInput.classList.remove('invalid');

    // Проверка на пустое значение поля имени
    if (!nameInput.value.trim()) {
      nameInput.classList.add('invalid');
      isValid = false;
    }

    // Проверка телефонного номера по регулярному выражению
    if (!phoneRegex.test(numberInput.value.trim())) {
      numberInput.classList.add('invalid');
      isValid = false;
    }

    return isValid;
  }

  /**
   * Получение текущего времени в формате ISO.
   * @returns {string} Текущее время в формате ISO.
   */
  function getCurrentTime() {
    const now = new Date();
    return now.toISOString();
  }

  /**
   * Получение координат пользователя через Geolocation API.
   * @returns {Promise<Object>} Промис, который разрешается с объектом { latitude, longitude }.
   */
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

  /**
   * Преобразование координат (latitude, longitude) в город и страну с использованием OpenCage API.
   * @param {Object} coords - Объект с широтой и долготой.
   * @returns {Promise<Object>} Промис, который разрешается с объектом { city, country }.
   */
  async function getCityAndCountry({ latitude, longitude }) {
    const apiKey = 'e6956a4aa92240e2ad6c176774e3c2d7'; // API ключ для OpenCage
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      const data = await response.json();
      // Извлекаем город и страну из первого результата или устанавливаем null
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

  /**
   * Отображение индикатора загрузки.
   * @returns {HTMLElement} Элемент индикатора загрузки.
   */
  function showLoadingSpinner() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    document.body.appendChild(spinner);
    return spinner;
  }

  /**
   * Удаление индикатора загрузки после отправки данных.
   * @param {HTMLElement} statusMessage - Элемент индикатора загрузки.
   */
  function cleanupAfterSubmission(statusMessage) {
    if (statusMessage && statusMessage.parentNode) {
      statusMessage.parentNode.removeChild(statusMessage);
    }
  }

  /**
   * Отображение сообщения пользователю после отправки формы.
   * @param {string} message - Сообщение для отображения.
   */
  function showThanksModal(message) {
    // В дальнейшем можно заменить стандартный alert на кастомное модальное окно.
    alert(message);
  }

  /**
   * Основная обработка отправки формы.
   * Здесь происходит валидация, сбор данных формы, получение времени,
   * геолокации, преобразование координат в адрес и отправка данных на сервер.
   * @param {Event} e - Событие отправки.
   */
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Валидация формы; если не прошла, прекращаем выполнение функции
    if (!validateForm()) return;

    // Отображаем индикатор загрузки
    const statusMessage = showLoadingSpinner();

    try {
      // Получение текущего времени
      const currentTime = getCurrentTime();

      // Получение геолокации пользователя с обработкой возможного отказа
      let location = null;
      try {
        location = await getUserLocation();
      } catch (locationError) {
        console.warn(locationError.message);
        location = { latitude: null, longitude: null };
      }

      // Получение города и страны на основе координат
      const { city, country } = await getCityAndCountry(location);

      // Формирование данных для отправки на сервер
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

      // Отправка данных на сервер методом POST
      const response = await fetch('http://localhost:3000/callMeBack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Проверка статуса ответа от сервера
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Чтение ответа сервера
      const text = await response.text();
      console.log('Server response:', text);

      // Парсинг ответа в JSON-формат
      const data = JSON.parse(text);

      // Валидация структуры ответа от сервера
      if (!data || typeof data.success !== 'boolean') {
        throw new Error('Invalid server response format');
      }

      if (!data.success) {
        throw new Error('Failed to send request');
      }

      // Если все прошло успешно, выводим сообщение для пользователя
      showThanksModal('Спасибо! Мы скоро свяжемся с вами.');
    } catch (error) {
      // Обработка ошибок при отправке данных
      console.error('Form submission error:', error.message);
      showThanksModal('Что-то пошло не так...');
    } finally {
      // Удаление индикатора загрузки в любом случае
      cleanupAfterSubmission(statusMessage);
    }
  }

  // Привязываем событие клика к обработчику отправки формы
  callBtn.addEventListener('click', handleFormSubmit);
}

// Инициализация модуля после загрузки DOM
document.addEventListener('DOMContentLoaded', callMeBack);

export default callMeBack;
