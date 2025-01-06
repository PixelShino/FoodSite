import tabs from './tabs';

function cards() {
  class MenuCard {
    constructor(
      imgSrc,
      alt,
      title,
      description,
      price,
      parentSelector,
      tab,
      ...classes
    ) {
      this.parent = document.querySelector(parentSelector);
      this.imgSrc = imgSrc;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.transfer = 50;
      this.changeToUAH();
      this.classes = classes;
      this.tab = tab;
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.imgSrc} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
        </div>
        <a href="#preview"><div class="menu__item-select" data-tab="tab-${this.tab}">Перейти</div></a>
      `;

      this.parent.append(element);
    }
  }

  const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    return await res.json();
  };

  getResource('http://localhost:3000/menu').then((data) => {
    console.log(data);
    data.forEach(({ img, altimg, title, descr, price, tab }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container',
        tab,
      ).render();
    });

    function menuTabSwitch() {
      const selectBtn = document.querySelectorAll('.menu__item-select');
      const tabsParent = document.querySelector('.tabheader__items');

      function handleTabSwitch(btn) {
        const dataTab = btn.dataset.tab;
        console.log(dataTab);
        tabsParent.dispatchEvent(
          new CustomEvent('tabswitch', { detail: { dataTab } }),
        );
      }

      selectBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
          handleTabSwitch(btn);
        });
      });
    }
    menuTabSwitch();
    tabs(
      '.tabheader__item',
      '.tabcontent',
      '.tabheader__items',
      '.tabcontent__bot-cards',
      '.tabdays__choise-btn',
    );
  });
}
export default cards;
