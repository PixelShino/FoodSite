function collapsed(Section = '.menu__field', toggleBtn = '.menu .expand') {
  const menuField = document.querySelector(Section);
  const toggleButton = document.querySelector(toggleBtn);

  // Initial state: collapsed
  menuField.classList.add('collapsed');
  toggleButton.textContent = 'Развернуть';

  toggleButton.addEventListener('click', () => {
    menuField.classList.toggle('collapsed');
    toggleButton.textContent = menuField.classList.contains('collapsed')
      ? 'Развернуть'
      : 'Свернуть';
  });
}
export default collapsed;
