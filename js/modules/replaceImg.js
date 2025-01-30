// replaceImg.js
function replaceImg(containerSelector, itemClass, activeClass) {
  // Select the parent container
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.error(`Container with selector "${containerSelector}" not found.`);
    return;
  }

  // Function to update images based on active state
  function updateImages() {
    const items = container.querySelectorAll(`.${itemClass}`);
    items.forEach((item) => {
      const img = item.querySelector('img');
      if (img) {
        const newSrc = item.dataset.img;
        const activeSrc = item.dataset.activeImg;
        const isActive = item.classList.contains(activeClass);
        img.src = isActive ? activeSrc : newSrc;
      }
    });
  }

  // Add event listener to the parent container

  // Ensure the clicked element matches the itemClass

  // Update images for all items
  updateImages();
}

export default replaceImg;
