function calc() {
  //Calc
  function calc() {
    let sex, height, weight, age, ratio;
    const result = document.querySelector('.calculating__result span');
    const index = document.querySelector('.calculating__result.bmi span');
    const indexInfo = document.querySelector(
      '.calculating__total.bmi.info span',
    );

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
      console.log('Height:', height, 'Weight:', weight); // Добавьте это для отладки
      if (!height || !weight) {
        index.textContent = '____';
        console.log('index = ____');
        return;
      } else {
        console.log('index find');

        let indexValue = +((10000 * weight) / (height * height)).toFixed(1);
        index.textContent = indexValue;
        console.log((10000 * weight) / (height * height));

        if (indexValue <= 16) {
          indexInfo.textContent = 'Выраженный дефицит массы тела';
        } else if (indexValue >= 16 && indexValue <= 18.4) {
          indexInfo.textContent = 'Недостаточная (дефицит) масса тела';
        } else if (indexValue >= 18.5 && indexValue <= 24.9) {
          indexInfo.textContent = 'Норма';
        } else if (indexValue >= 25 && indexValue <= 29.9) {
          indexInfo.textContent = 'Избыточная масса тела';
        } else if (indexValue >= 30 && indexValue <= 34.9) {
          indexInfo.textContent = 'Ожирение первой степени';
        } else if (indexValue >= 35 && indexValue <= 39.9) {
          indexInfo.textContent = 'Ожирение второй степени';
        } else if (indexValue >= 40) {
          indexInfo.textContent = 'Ожирение третьей степени (морбидное)';
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
          if (event.target.getAttribute('data-ratio')) {
            ratio = +event.target.getAttribute('data-ratio');
            localStorage.setItem(
              'ratio',
              +event.target.getAttribute('data-ratio'),
            );
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

          if (event.target.classList.contains('calculating__choose-item')) {
            event.target.classList.add(activeClass);
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
