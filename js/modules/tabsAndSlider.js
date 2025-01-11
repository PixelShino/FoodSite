function SliderV2(
  contentSelector,
  parentSelector,
  sliderPrev,
  sliderNext,
  current,
  total,
) {
  // DOM Elements
  const tabsContent = document.querySelectorAll(contentSelector);
  const tabsParent = document.querySelector(parentSelector);
  const prev = document.querySelector(sliderPrev);
  const next = document.querySelector(sliderNext);
  const currentCounter = document.querySelector(current);
  const totalCounter = document.querySelector(total);

  // State
  let slideIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Guard clause for required elements
  if (
    !tabsContent.length ||
    !tabsParent ||
    !prev ||
    !next ||
    !currentCounter ||
    !totalCounter
  ) {
    console.error('Required elements not found');
    return;
  }

  function hideContent() {
    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show');
    });
  }

  function showContent(index = 0) {
    tabsContent[index].classList.add('show');
    tabsContent[index].classList.remove('hide');
    updateCounter(index);
  }

  function updateCounter(index) {
    currentCounter.textContent = getZero(index + 1);
    totalCounter.textContent = getZero(tabsContent.length);
  }

  function getZero(num) {
    return num >= 0 && num < 10 ? `0${num}` : num;
  }

  function changeSlide(direction) {
    if (direction === 'prev') {
      slideIndex = slideIndex === 0 ? tabsContent.length - 1 : slideIndex - 1;
    } else {
      slideIndex = slideIndex === tabsContent.length - 1 ? 0 : slideIndex + 1;
    }
    hideContent();
    showContent(slideIndex);
  }

  // Event Handlers
  function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
      changeSlide('prev');
    } else if (event.key === 'ArrowRight') {
      changeSlide('next');
    }
  }

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchEndX = touchStartX;
  }

  function handleTouchMove(event) {
    touchEndX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      changeSlide(swipeDistance < 0 ? 'next' : 'prev');
    }
  }

  // Mouse drag handlers
  let isDragging = false;
  let startX;

  function handleMouseDown(event) {
    isDragging = true;
    startX = event.pageX;
    tabsParent.style.cursor = 'grabbing';
  }

  function handleMouseMove(event) {
    if (!isDragging) return;

    const x = event.pageX;
    const distance = startX - x;

    if (Math.abs(distance) > 50) {
      changeSlide(distance > 0 ? 'next' : 'prev');
      isDragging = false;
      tabsParent.style.cursor = 'grab';
    }
  }

  function handleMouseUp() {
    isDragging = false;
    tabsParent.style.cursor = 'grab';
  }

  // Event Listeners
  prev.addEventListener('click', () => changeSlide('prev'));
  next.addEventListener('click', () => changeSlide('next'));
  document.addEventListener('keydown', handleKeyPress);

  tabsParent.addEventListener('touchstart', handleTouchStart);
  tabsParent.addEventListener('touchmove', handleTouchMove);
  tabsParent.addEventListener('touchend', handleTouchEnd);

  tabsParent.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  // Set initial cursor style
  tabsParent.style.cursor = 'grab';

  // Initialize
  hideContent();
  showContent();

  // Cleanup function
  return function cleanup() {
    document.removeEventListener('keydown', handleKeyPress);
    tabsParent.removeEventListener('touchstart', handleTouchStart);
    tabsParent.removeEventListener('touchmove', handleTouchMove);
    tabsParent.removeEventListener('touchend', handleTouchEnd);
    tabsParent.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
}

export default SliderV2;
