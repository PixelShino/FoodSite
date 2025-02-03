function location() {
  const wrapper = document.querySelector('#city');
  const parent = document.querySelector('.header__link');
  const icon = document.querySelector('#city .header__link .fi .fi-br-marker');
  const locationText = document.querySelector(
    '#city .header__link #location-text',
  );
  console.log(locationText);
}
export default location;
