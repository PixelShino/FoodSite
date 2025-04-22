// Импортируем модуль для обновления изображений при выборе параметров
import replaceImg from './replaceImg.js';

/**
 * Функция calc инициализирует калькулятор показателей тела (BMI, тариф) по введённым данным.
 * Выполняет настройку значений по умолчанию, обработку кликов по статическим элементам и ввод динамических значений.
 */
function calc() {
  // Объявляем переменные для хранения выбранных параметров и введённых данных
  let sex, height, weight, age, ratio;

  // Элементы для вывода результата и информации об индексе
  const result = document.querySelector('.calculating__result span');
  const index = document.querySelector('.calculating__result.bmi span');
  const indexInfo = document.querySelector('.calculating__total.bmi.info span');
  const tariffInfo = document.querySelector(
    '.calculating__total.bmi.tariff span',
  );
  const tariffImg = document.querySelector('.tariff--img'); // не используется, но оставлено для возможного использования

  // Инициализация значений по умолчанию для пола и коэффициента активности из localStorage
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = parseFloat(localStorage.getItem('ratio'));
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', '1.375');
  }

  /**
   * Функция initLocalSettings устанавливает активный класс для элементов выбора (пол, коэффициент),
   * основываясь на значениях, сохраненных в localStorage.
   * @param {string} selector - CSS-селектор для выбора элементов.
   * @param {string} activeClass - CSS-класс для активного состояния.
   */
  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((elem) => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  // Инициализируем активные состояния для выбора пола и коэффициента активности
  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings(
    '.calculating__choose_big div',
    'calculating__choose-item_active',
  );

  /**
   * Функция calcTotal рассчитывает общий результат (калории или другой показатель)
   * в зависимости от выбранного пола, уровня активности и введённых данных.
   */
  function calcTotal() {
    // Если не все данные введены, выводим заглушку
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '____';
      return;
    }

    // Вычисляем результат по разным формулам для женского и мужского пола
    if (sex === 'female') {
      result.textContent = Math.round(
        (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio,
      );
    } else {
      result.textContent = Math.round(
        (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio,
      );
    }

    // Если результат не является числом, очищаем вывод
    if (
      isNaN(result.textContent) ||
      !/^-?\d+(\.\d+)?$/.test(result.textContent)
    ) {
      result.textContent = '____';
    }
  }

  /**
   * Функция calcIndex вычисляет индекс массы тела (BMI) и отображает информацию об интерпретации результата.
   */
  function calcIndex() {
    // Элементы контейнеров для вывода дополнительной информации
    const indexValueContainer = document.querySelector(
      '.calculating__total.bmi.info',
    );
    const tariffInfoContainer = document.querySelector(
      '.calculating__total.bmi.tariff',
    );

    // Объект с URL-ами изображений для разных диапазонов BMI
    const imageUrls = {
      underweight: '../img/food/slider_food1.png',
      normal: '../img/food/slider__food2.png',
      overweight: '../img/food/slider__food3.png',
      obesity: '../img/food/slider__food4.png',
    };

    // Если рост или вес не заданы, скрываем информацию и выводим заглушку
    if (!height || !weight) {
      index.textContent = '____';
      indexValueContainer.style.display = 'none';
      tariffInfoContainer.style.display = 'none';
      return;
    } else {
      // Отображаем блоки с информацией
      indexValueContainer.style.display = 'flex';
      tariffInfoContainer.style.display = 'flex';

      // Расчет BMI с округлением до одного знака после запятой
      const indexValue = +((10000 * weight) / (height * height)).toFixed(1);
      index.textContent = indexValue;

      // Определяем текстовое описание и тариф в зависимости от значения BMI
      if (indexValue <= 16) {
        indexInfo.textContent = 'Выраженный дефицит массы тела';
        tariffInfo.textContent = 'Набор веса';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.underweight})`;
      } else if (indexValue > 16 && indexValue <= 18.4) {
        indexInfo.textContent = 'Недостаточная (дефицит) масса тела';
        tariffInfo.textContent = 'Набор веса';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.underweight})`;
      } else if (indexValue >= 18.5 && indexValue <= 24.9) {
        indexInfo.textContent = 'Норма';
        tariffInfo.textContent = 'Баланс';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.normal})`;
      } else if (indexValue >= 25 && indexValue <= 29.9) {
        indexInfo.textContent = 'Избыточная масса тела';
        tariffInfo.textContent = 'Похудение';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
      } else if (indexValue >= 30 && indexValue <= 34.9) {
        indexInfo.textContent = 'Ожирение первой степени';
        tariffInfo.textContent = 'Похудение';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
      } else if (indexValue >= 35 && indexValue <= 39.9) {
        indexInfo.textContent = 'Ожирение второй степени';
        tariffInfo.textContent = 'Похудение';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.obesity})`;
      } else if (indexValue >= 40) {
        indexInfo.textContent = 'Ожирение третьей степени (морбидное)';
        tariffInfo.textContent = 'Похудение';
        tariffInfoContainer.style.backgroundImage = `url(${imageUrls.obesity})`;
      }
    }
  }

  // Вызываем функции расчёта после инициализации
  calcTotal();
  calcIndex();

  /**
   * Функция getStaticInformation обрабатывает клики по статическим элементам выбора (пол, коэффициент).
   * При клике обновляются соответствующие переменные, сохраняются в localStorage и пересчитываются показатели.
   * @param {string} parentSelector - CSS-селектор родительского контейнера.
   * @param {string} activeClass - CSS-класс для активного состояния.
   */
  function getStaticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    const parent = document.querySelector(parentSelector);

    parent.addEventListener('click', (event) => {
      const elementWithRatio = event.target.closest('[data-ratio]');
      if (elementWithRatio) {
        // Обработка выбора коэффициента активности
        const ratioValue = elementWithRatio.getAttribute('data-ratio');
        ratio = parseFloat(ratioValue);
        if (!isNaN(ratio)) {
          localStorage.setItem('ratio', ratioValue);
        }
      } else if (event.target.id === 'female' || event.target.id === 'male') {
        // Обработка выбора пола
        sex = event.target.getAttribute('id');
        localStorage.setItem('sex', sex);
      }
      // Удаляем активный класс у всех элементов
      elements.forEach((elem) => {
        elem.classList.remove(activeClass);
      });
      // Если клик был по нужному элементу, добавляем активный класс и обновляем изображения
      if (
        event.target.matches(
          '.calculating__choose-item, .calculating__choose-item *',
        )
      ) {
        const targetElement =
          event.target.closest('.calculating__choose-item') || event.target;
        targetElement.classList.add(activeClass);
        replaceImg(parentSelector, 'calculating__choose-item', activeClass);
      }
      // Пересчитываем показатели после обновления выбора
      calcTotal();
      calcIndex();
    });
  }

  // Привязываем обработчики кликов для элементов выбора пола и коэффициента
  getStaticInformation('#gender', 'calculating__choose-item_active');
  getStaticInformation(
    '.calculating__choose_big',
    'calculating__choose-item_active',
  );

  /**
   * Функция getDynamicInformation обрабатывает ввод динамических данных (рост, вес, возраст),
   * добавляет подсветку при ошибке ввода и пересчитывает показатели.
   * @param {string} selector - CSS-селектор поля ввода.
   */
  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      // Если введены нечисловые символы, добавляем класс invalid для визуальной подсветки ошибки
      if (input.value.match(/\D/g)) {
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
      // Назначаем введенное значение соответствующей переменной
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      // Пересчитываем показатели при каждом изменении значения
      calcTotal();
      calcIndex();
    });
  }

  // Привязываем обработчики ввода для полей: рост, вес, возраст
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');
}

// Запускаем калькулятор после загрузки DOM
document.addEventListener('DOMContentLoaded', calc);

// Экспорт функции calc можно добавить, если требуется её использование в других модулях
export default calc;
