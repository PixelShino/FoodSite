// js/modules/tabsSlider.js

function tabsSlider(cardContainerOpt) {
  // console.log('tabsSlider initialized');
  // let cardContainer = document.querySelector('.tabcontent__bot-cards');
  let cardContainer =
    cardContainerOpt || document.querySelector('.tabcontent__bot-cards'); // FIM
  // console.log(cardContainer);\

  // function switchActiveCards(cardContainerOpt) {
  //   // Pass cardContainerOpt as an argument
  //   const tabheaderItems = document.querySelector('.tabheader__items');
  //   const tabheaderItemClass = 'tabheader__item';
  //   let cardContainer = cardContainerOpt; // Cache the card container

  //   tabheaderItems.addEventListener('click', (event) => {
  //     const clickedElement = event.target;

  //     if (clickedElement.classList.contains(tabheaderItemClass)) {
  //       tabsSlider();

  //       // Only query the DOM if cardContainerOpt wasn't provided
  //       if (!cardContainer) {
  //         cardContainer = document.querySelector('.tabcontent__bot-cards');
  //       }
  //     }
  //   });
  // }
  // switchActiveCards();

  if (!cardContainer) return;

  let isDown = false,
    startX,
    scrollLeft;
  let isTouching = false,
    touchStartX,
    touchScrollLeft;

  const handleMouseDown = (e) => {
    isDown = true;
    cardContainer.classList.add('active');
    startX = e.clientX - cardContainer.getBoundingClientRect().left;
    scrollLeft = cardContainer.scrollLeft;
    cardContainer.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.clientX - cardContainer.getBoundingClientRect().left;
    cardContainer.scrollLeft = scrollLeft - (x - startX) * 2;
  };

  const handleMouseUpOrLeave = () => {
    if (isDown || isTouching) {
      isDown = false;
      isTouching = false;
      cardContainer.classList.remove('active');
      cardContainer.style.userSelect = 'auto';
    }
  };

  const handleTouchStart = (e) => {
    isTouching = true;
    touchStartX =
      e.touches[0].clientX - cardContainer.getBoundingClientRect().left;
    touchScrollLeft = cardContainer.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isTouching) return;
    const x = e.touches[0].clientX - cardContainer.getBoundingClientRect().left;
    cardContainer.scrollLeft = touchScrollLeft - (x - touchStartX) * 2;
  };

  const handleTouchEnd = () => {
    isTouching = false;
    isDown = false;
  };

  cardContainer.addEventListener('mousedown', handleMouseDown);
  cardContainer.addEventListener('touchstart', handleTouchStart);
  cardContainer.addEventListener('touchmove', handleTouchMove);
  cardContainer.addEventListener('touchend', handleTouchEnd);

  window.addEventListener('mouseup', handleMouseUpOrLeave);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseleave', handleMouseUpOrLeave);

  return () => {
    cardContainer.removeEventListener('mousedown', handleMouseDown);
    cardContainer.removeEventListener('touchstart', handleTouchStart);
    cardContainer.removeEventListener('touchmove', handleTouchMove);
    cardContainer.removeEventListener('touchend', handleTouchEnd);

    window.removeEventListener('mouseup', handleMouseUpOrLeave);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseleave', handleMouseUpOrLeave);
  };
}

export default tabsSlider;
