// js/modules/tabsSlider.js           tabsSlider
//TODO: нужно сделать плавнее , так же продумать на разных экранах,
function menuCardSlider(cardContainerOpt) {
  let cardContainer =
    cardContainerOpt || document.querySelector('.tabcontent__bot-cards');

  if (!cardContainer) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0; // Store the velocity for inertial scrolling

  const handleMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - cardContainer.offsetLeft;
    scrollLeft = cardContainer.scrollLeft;
    velocity = 0; //reset velocity on new scroll
    cardContainer.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - cardContainer.offsetLeft;
    const walk = (x - startX) * 2;
    velocity = walk; // set velocity to current scroll delta
    cardContainer.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDown = false;
    cardContainer.style.cursor = 'grab';
    beginScrollDeceleration(); // Start decelerating after mouseup
  };

  const beginScrollDeceleration = () => {
    if (Math.abs(velocity) < 0.5) return; // Stop if velocity is too small

    velocity *= 0.95; // Deceleration factor - adjust as needed
    cardContainer.scrollLeft -= velocity;

    requestAnimationFrame(beginScrollDeceleration); // Loop for smooth deceleration
  };

  cardContainer.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUpOrLeave);
  window.addEventListener('mouseleave', handleMouseUpOrLeave);
  cardContainer.style.cursor = 'grab'; // Initial cursor state

  // Touch Events
  let isTouching = false;
  let touchStartX;
  let touchScrollLeft;
  let touchVelocity = 0;

  const handleTouchStart = (e) => {
    isTouching = true;
    touchStartX = e.touches[0].pageX - cardContainer.offsetLeft;
    touchScrollLeft = cardContainer.scrollLeft;
    touchVelocity = 0;
  };

  const handleTouchMove = (e) => {
    if (!isTouching) return;
    e.preventDefault();
    const x = e.touches[0].pageX - cardContainer.offsetLeft;
    const walk = (x - touchStartX) * 2;
    touchVelocity = walk;
    cardContainer.scrollLeft = touchScrollLeft - walk;
  };

  const handleTouchEnd = () => {
    isTouching = false;
    beginTouchDeceleration();
  };

  const beginTouchDeceleration = () => {
    if (Math.abs(touchVelocity) < 0.5) return;

    touchVelocity *= 0.95;
    cardContainer.scrollLeft -= touchVelocity;

    requestAnimationFrame(beginTouchDeceleration);
  };

  cardContainer.addEventListener('touchstart', handleTouchStart);
  cardContainer.addEventListener('touchmove', handleTouchMove);
  cardContainer.addEventListener('touchend', handleTouchEnd);

  return () => {
    cardContainer.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUpOrLeave);
    window.removeEventListener('mouseleave', handleMouseUpOrLeave);

    cardContainer.removeEventListener('touchstart', handleTouchStart);
    cardContainer.removeEventListener('touchmove', handleTouchMove);
    cardContainer.removeEventListener('touchend', handleTouchEnd);
  };
}
export default menuCardSlider;
