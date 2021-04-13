function init() {
  window.addEventListener('click', (e) => {
    const elem = document.querySelector('.select-items');
    if (!e.target.classList.contains('select-selected') && !elem.classList.contains('select-hide')) {
      elem.classList.add('select-hide');
    }
  });

  document.querySelector('.select-selected').addEventListener('click', () => {
    document.querySelector('.select-items').classList.remove('select-hide');
  });
}

window.addEventListener('DOMContentLoaded', init);
