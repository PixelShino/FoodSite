/**
 * Модуль таймера. Инициирует отсчет времени до заданной даты.
 * @function timer
 */
function timer() {
  // TIMER

  const deadline = '2026-01-01';

  /**
   * Вычисляет оставшееся время до заданного конечного времени.
   * @param {string} endtime - Конечное время в формате, распознаваемом Date.parse.
   * @returns {Object} Объект с оставшимся временем:
   *                   total - общее количество миллисекунд,
   *                   days - количество дней,
   *                   hours - количество часов,
   *                   minutes - количество минут,
   *                   seconds - количество секунд.
   */
  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60) % 60;
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  /**
   * Устанавливает и обновляет счетчики таймера на странице.
   * @param {string} selector - CSS селектор элемента таймера.
   * @param {string} endtime - Конечное время для отсчета.
   */
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    let timeInterval = setInterval(updateClock, 1000);
    updateClock();

    /**
     * Функция обновления счетчиков таймера.
     */
    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  /**
   * Форматирует число, добавляя ведущий ноль, если число меньше 10.
   * @param {number} number - Число для форматирования.
   * @returns {string|number} Строка с числом, дополненным нулем, или число.
   */
  function getZero(number) {
    if (number >= 0 && number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  }

  setClock('.timer', deadline);
}
export default timer;
