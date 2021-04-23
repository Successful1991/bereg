function menuOpen(menu) {
  menu.classList.add('menu__active');
  const createAnimation = (links, translateY = 0, delay = 0) => {
    links.forEach((link, i) => {
      // eslint-disable-next-line no-undef
      gsap.from(link, {
        delay: delay + i / 10,
        y: translateY,
        opacity: 0,
      });
    });
  };

  const links1 = menu.querySelectorAll('[data-animation1]');
  const links2 = menu.querySelectorAll('[data-animation2]');
  const links3 = menu.querySelectorAll('[data-animation3]');
  createAnimation(links1, 100, 0.5);
  createAnimation(links2, 100, 0.8);
  createAnimation(links3, 100, 1.1);
}

function menuClose(menu) {
  menu.classList.remove('menu__active');
}

function menuInit() {
  const menu = document.querySelector('[data-menu]');
  document.querySelector('[data-open-menu]').addEventListener('click', () => menuOpen(menu));
  document.querySelector('[data-close-menu]').addEventListener('click', () => menuClose(menu));
  // menuOpen();
}

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

  menuInit();
}

window.addEventListener('DOMContentLoaded', init);
