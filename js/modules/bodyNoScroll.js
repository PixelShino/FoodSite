function bodyNoScroll(item = '.burger__content', active = '.active') {
  const body = document.querySelector('body');
  if (item && active) {
    body.classList.toggle('no-scroll');
    console.log('bodyNoScroll work');
  }
}
export default bodyNoScroll;
