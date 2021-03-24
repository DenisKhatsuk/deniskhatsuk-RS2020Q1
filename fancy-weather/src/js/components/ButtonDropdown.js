export default function startDropdownWork() {
  const buttonCurrent = document.querySelector('.button-dropdown__button_current');
  buttonCurrent.addEventListener('click', () => {
    buttonCurrent.closest('.button-dropdown').classList.toggle('show');
  });
}
