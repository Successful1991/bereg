function initSlider() {
  // eslint-disable-next-line no-undef,no-unused-vars
  const swiper = new Swiper('.js-gallery__slider', {
    loop: true,
    navigation: {
      nextEl: document.querySelector('[data-next]'),
      prevEl: document.querySelector('[data-prev]'),
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    preloadImages: false,
    lazy: true,
    speed: 400,
    watchSlidesVisibility: true,
  });
  window.locoScroll.update();
}

document.addEventListener('DOMContentLoaded', initSlider);
