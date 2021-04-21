function init() {
  const slider = new Swiper('.swiper-container', {
    loop: true,
    navigation: {
      nextEl: document.querySelector('[data-next]'),
      prevEl: document.querySelector('[data-prev]'),
    },
    preloadImages: false,
    lazy: true,
    speed: 400,
    watchSlidesVisibility: true,
    on: {
      init: (e) => {
        document.querySelector('[data-total]').innerHTML = document.querySelectorAll('.slide').length;
        document.querySelector('[data-current]').innerHTML = e.activeIndex + 1;
      },
    },
  });

  slider.on('activeIndexChange', (obj) => {
    document.querySelector('[data-current]').innerHTML = obj.realIndex + 1;
  });
  // slider.on('init', (node, slick) => {
  //   $('.js-home-slider__all').html(slick.slideCount);
  //   $('.js-home-slider__current').html(slick.currentSlide + 1);
  // });
  //
  // slider.on('afterChange', (node, slick) => {
  //   $('.js-home-slider__current').html(slick.currentSlide + 1);
  // });
  //
  // slider.slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   dots: false,
  //   arrows: true,
  //   lazyLoad: 'progressive',
  // });
  // const slider = $('.js-slider');
  // slider.on('init', (node, slick) => {
  //   $('.js-home-slider__all').html(slick.slideCount);
  //   $('.js-home-slider__current').html(slick.currentSlide + 1);
  // });
  //
  // slider.on('afterChange', (node, slick) => {
  //   $('.js-home-slider__current').html(slick.currentSlide + 1);
  // });
  //
  // slider.slick({
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   dots: false,
  //   speed: 500,
  //   arrows: true,
  //   lazyLoad: 'progressive',
  //   prevArrow: '.home-slider__prev',
  //   nextArrow: '.home-slider__next',
  // });
}

document.addEventListener('DOMContentLoaded', init);
