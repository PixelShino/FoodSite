// Import your replaceImg module
import replaceImg from './replaceImg.js';
function calc() {
  //Calc
  function calc() {
    let sex, height, weight, age, ratio;
    const result = document.querySelector('.calculating__result span');
    const index = document.querySelector('.calculating__result.bmi span');
    const indexInfo = document.querySelector(
      '.calculating__total.bmi.info span',
    );
    const tariffInfo = document.querySelector(
      '.calculating__total.bmi.tariff span',
    );
    const tariffImg = document.querySelector('.tariff--img');

    if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
    } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
    } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
    }

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

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings(
      '.calculating__choose_big div',
      'calculating__choose-item_active',
    );

    function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____';
        return;
      }

      if (sex === 'female') {
        result.textContent = Math.round(
          (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio,
        );
      } else {
        result.textContent = Math.round(
          (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio,
        );
      }
      if (
        isNaN(result.textContent) ||
        !/^-?\d+(\.\d+)?$/.test(result.textContent)
      ) {
        result.textContent = '____';
      }
    }

    //TODO: вывести информацию о подходящем плане питания
    function calcIndex() {
      console.log('Height:', height, 'Weight:', weight);
      let indexValueContainer = document.querySelector(
        '.calculating__total.bmi.info',
      );
      let tariffInfoContainer = document.querySelector(
        '.calculating__total.bmi.tariff',
      );
      let tariffSubtitle = document.querySelector(
        '.calculating__total.bmi.tariff.calculating__subtitle',
      );
      const imageUrls = {
        underweight: '../img/food/slider_food1.png',
        normal: '../img/food/slider__food2.png',
        overweight: '../img/food/slider__food3.png',
        obesity: '../img/food/slider__food4.png',
      };
      // #tab-0 {
      //   background-image: url(../img/food/slider_food1.png);
      // }
      // #tab-1 {
      //   background-image: url(../img/food/slider__food2.png);
      // }
      // #tab-2 {
      //   background-image: url(../img/food/slider__food3.png);
      // }

      if (!height || !weight) {
        index.textContent = '____';
        console.log('index = ____');
        console.log(indexValueContainer);
        indexValueContainer.style.display = 'none';
        tariffInfoContainer.style.display = 'none';
        // tariffImg.style.display = 'none';
        return;
      } else {
        console.log('index find');
        indexValueContainer.style.display = 'flex';
        tariffInfoContainer.style.display = 'flex';
        // tariffImg.style.display = 'grid';
        let indexValue = +((10000 * weight) / (height * height)).toFixed(1);
        index.textContent = indexValue;
        console.log((10000 * weight) / (height * height));

        if (indexValue <= 16) {
          indexInfo.textContent = 'Выраженный дефицит массы тела';
          tariffInfo.textContent = 'Набор веса';
          // tariffImg.src = imageUrls.underweight;
          tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
        } else if (indexValue >= 16 && indexValue <= 18.4) {
          indexInfo.textContent = 'Недостаточная (дефицит) масса тела';
          tariffInfo.textContent = 'Набор веса';
          // tariffImg.src = imageUrls.underweight;
          tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
        } else if (indexValue >= 18.5 && indexValue <= 24.9) {
          indexInfo.textContent = 'Норма';
          tariffInfo.textContent = 'Баланс';
          // tariffImg.src = imageUrls.normal;
          tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
        } else if (indexValue >= 25 && indexValue <= 29.9) {
          indexInfo.textContent = 'Избыточная масса тела';
          tariffInfo.textContent = 'Похудение';
          // tariffImg.src = imageUrls.overweight;
          tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
        } else if (indexValue >= 30 && indexValue <= 34.9) {
          indexInfo.textContent = 'Ожирение первой степени';
          tariffInfo.textContent = 'Похудение';
          // tariffImg.src = imageUrls.overweight;
          tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
        } else if (indexValue >= 35 && indexValue <= 39.9) {
          indexInfo.textContent = 'Ожирение второй степени';
          tariffInfo.textContent = 'Похудение';
          // tariffImg.src = imageUrls.overweight;
          tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
        } else if (indexValue >= 40) {
          indexInfo.textContent = 'Ожирение третьей степени (морбидное)';
          tariffInfo.textContent = 'Похудение';
          // tariffImg.src = imageUrls.overweight;
          tariffInfoContainer.style.backgroundImage = `url(${imageUrls.overweight})`;
        }
      }
    }

    calcTotal();
    calcIndex();

    function getStaticInformation(parentSelector, activeClass) {
      const elements = document.querySelectorAll(`${parentSelector} div`);

      document
        .querySelector(parentSelector)
        .addEventListener('click', (event) => {
          const elementWithRatio = event.target.closest('[data-ratio]');

          if (elementWithRatio) {
            const ratioValue = elementWithRatio.getAttribute('data-ratio');
            ratio = parseFloat(ratioValue);

            if (!isNaN(ratio)) {
              localStorage.setItem('ratio', ratioValue);
            }
          } else if (
            event.target.id === 'female' ||
            event.target.id === 'male'
          ) {
            sex = event.target.getAttribute('id');
            localStorage.setItem('sex', event.target.getAttribute('id'));
          }

          elements.forEach((elem) => {
            elem.classList.remove(activeClass);
          });

          if (
            event.target.matches(
              '.calculating__choose-item, .calculating__choose-item *',
            )
          ) {
            const targetElement =
              event.target.closest('.calculating__choose-item') || event.target;

            targetElement.classList.add(activeClass);
            replaceImg(parentSelector, 'calculating__choose-item', activeClass);

            console.error('ELEMENT HAS CLASS calculating__choose-item');
          } else {
            console.error(
              'ELEMENT DOES NOT HAVE CLASS calculating__choose-item',
            );
          }

          calcTotal();
          calcIndex();
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation(
      '.calculating__choose_big',
      'calculating__choose-item_active',
    );

    function getDynamicInformation(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {
        if (input.value.match(/\D/g)) {
          input.classList.add('invalid');
        } else {
          input.classList.remove('invalid');
        }
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
        calcTotal();
        calcIndex();
      });
    }
    console.log(index);
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
  }

  calc();
}
export default calc;
console.log('webpack test');
