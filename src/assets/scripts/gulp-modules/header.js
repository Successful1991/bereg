function init() {
  window.addEventListener('click', (e) => {
    const elem = document.querySelector('.select-items');
    if (!e.target.classList.contains('select-selected') && !elem.classList.contains('select-hide')) {
      document.querySelector('.select-selected').classList.remove('select-arrow-active');
      elem.classList.add('select-hide');
    }
  });

  document.querySelector('.select-selected').addEventListener('click', (e) => {
    e.target.classList.add('select-arrow-active');
    document.querySelector('.select-items').classList.remove('select-hide');
  });
}

window.addEventListener('DOMContentLoaded', init);
