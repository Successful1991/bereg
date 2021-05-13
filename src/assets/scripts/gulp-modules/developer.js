function developerSlider() {
  // eslint-disable-next-line no-undef,no-unused-vars
  const developerSwiper = new Swiper('.js-objects__slider', {
    loop: true,
    slidesPerView: 1,
    navigation: {
      prevEl: document.querySelector('[data-prev]'),
      nextEl: document.querySelector('[data-next]'),
    },
    preloadImages: false,
    lazy: true,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    speed: 400,
    watchSlidesVisibility: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1440: {
        spaceBetween: 60,
      },
    },
  });

  window.locoScroll.update();
}

document.addEventListener('DOMContentLoaded', developerSlider);
