
// function initSuccess() {
//   const closePopup = document.querySelector('[data-success-close]');
//   const popup = document.querySelector('[data-success]');
//
//   closePopup.addEventListener('click', (event) => {
//     event.preventDefault();
//     popup.classList.remove('active');
//   });
// }

function init() {
  function menuOpen(menu) {
    const menuEl = menu;
    menuEl.style.visibility = 'visible';
    menuEl.classList.add('menu__active');
    const createAnimation = (links, translateY = 0, delay = 0) => {
      links.forEach((link, i) => {
        // eslint-disable-next-line no-undef
        gsap.from(link, {
          delay: delay + i / 25,
          y: translateY,
          skewX: 15,
          opacity: 0,
        });
      });
    };

    const links1 = menu.querySelectorAll('[data-animation1]');
    const links2 = menu.querySelectorAll('[data-animation2]');
    const links3 = menu.querySelectorAll('[data-animation3]');
    createAnimation(links1, 70, 0.05);
    createAnimation(links2, 70, 0.15);
    createAnimation(links3, 70, 0.25);
  }

  function menuClose(menu) {
    const menuEl = menu;
    menuEl.classList.remove('menu__active');
    menuEl.style.visibility = '';
  }

  function menuInit() {
    const menu = document.querySelector('[data-menu]');
    document.querySelector('[data-open-menu]').addEventListener('click', () => menuOpen(menu));
    document.querySelector('[data-close-menu]').addEventListener('click', () => menuClose(menu));
  }

  function initPopup() {
    const openPopup = document.querySelectorAll('.js-form-open');
    const closePopup = document.querySelector('[data-popup-close]');
    const popup = document.querySelector('[data-popup]');

    openPopup.forEach((openEl) => {
      openEl.addEventListener('click', (event) => {
        event.preventDefault();
        popup.style.visibility = 'visible';
        popup.classList.add('active');
      });
    });
    closePopup.addEventListener('click', (event) => {
      event.preventDefault();
      popup.classList.remove('active');
      popup.style.visibility = '';
    });
  }

  function initPopupPresentation() {
    const openPopup = document.querySelectorAll('[data-popup-open-presentation]');
    const popup = document.querySelector('[data-popup-presentation]');
    const closePopup = popup.querySelector('[data-popup-close]');

    openPopup.forEach((openEl) => {
      openEl.addEventListener('click', (event) => {
        event.preventDefault();
        popup.style.visibility = 'visible';
        popup.classList.add('active');
      });
    });
    closePopup.addEventListener('click', (event) => {
      event.preventDefault();
      popup.classList.remove('active');
      popup.style.visibility = '';
    });
  }
  const unSelectHandler = (container) => {
    const elem = container.querySelector('.select-items');
    if (!elem.classList.contains('select-hide')) {
      container.classList.remove('select-arrow-active');
      elem.classList.add('select-hide');
    }
    window.removeEventListener('click', unSelectHandler);
  };
  const selectHandler = (event) => {
    event.stopPropagation();
    const container = event.target.closest('[data-lang]');
    container.classList.add('select-arrow-active');
    container.querySelector('.select-items').classList.remove('select-hide');
    window.addEventListener('click', unSelectHandler.bind(null, container));
  };
  document.querySelector('[data-lang="mobile"]').addEventListener('click', selectHandler);
  document.querySelector('[data-lang="desktop"]').addEventListener('click', selectHandler);

  initPopup();
  initPopupPresentation();
  // initSuccess();
  menuInit();
}

window.addEventListener('DOMContentLoaded', init);
