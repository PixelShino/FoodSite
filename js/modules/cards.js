function cards() {
  //Card render
  class MenuCard {
    constructor(
      imgSrc,
      alt,
      title,
      decription,
      price,
      parentSelector,
      ...classes
    ) {
      this.parent = document.querySelector(parentSelector);
      this.imgSrc = imgSrc;
      this.alt = alt;
      this.title = title;
      this.description = decription;
      this.price = price;
      this.tansfer = 50;
      this.changeToUAH();
      this.classes = classes;
    }

    changeToUAH() {
      this.price = this.price * this.tansfer;
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
      </div>`;

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
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container',
      ).render();
    });
  });
}
export default cards;
