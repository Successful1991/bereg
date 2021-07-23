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

  const position = {
    last: 0,
  };

  const sliderContainer = document.querySelector('.js-gallery__slider');
  window.locoScroll.on('scroll', (obj) => {
    const direction = position.last < obj.scroll.y ? 'down' : 'up';
    if (position.last < obj.scroll.y - 20 && position.last > obj.scroll.y + 20) return;
    switch (direction) {
      case 'down':
        if (position.last === 0) {
          position.last = obj.scroll.y;
          window.locoScroll.scrollTo(sliderContainer);
        }
        break;
      case 'up':
        if (position.last === obj.limit.y) {
          position.last = obj.scroll.y;
          window.locoScroll.scrollTo(sliderContainer);
        }
        break;
      default:
        break;
    }
    position.last = obj.scroll.y;
  });
}

document.addEventListener('DOMContentLoaded', initSlider);
