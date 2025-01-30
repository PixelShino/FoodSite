export default function insertContent(
  slideIndex,
  elementBase = '.offer__descr-right',
  wrapperBase = '.offer__descr-left',
  breakpoint = 768,
) {
  const element = `${elementBase}--${slideIndex}`;
  const wrapper = `${wrapperBase}--${slideIndex}`;

  const originalParent = document.querySelector(element);
  const targetParent = document.querySelector(wrapper);
  const originalContent = [];

  // Store original content
  if (originalParent) {
    originalContent.push(...originalParent.childNodes);
  }

  function moveContentForMobile() {
    const descrLeft = document.querySelector(wrapper);
    const descrRight = document.querySelector(element);

    if (window.matchMedia(`(max-width: ${breakpoint}px)`).matches) {
      if (descrRight && descrLeft) {
        while (descrRight.firstChild) {
          descrLeft.appendChild(descrRight.firstChild);
        }
      }
    } else {
      // Move content back to the original element if the screen width is greater than the breakpoint
      if (descrRight && originalContent.length > 0) {
        originalContent.forEach((node) => {
          descrRight.appendChild(node);
        });
      }
    }
  }

  // Initial check
  moveContentForMobile();

  // Debounce function to limit the rate at which moveContentForMobile is called
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // Add debounced event listener for window resize
  window.addEventListener('resize', debounce(moveContentForMobile, 100));
}
