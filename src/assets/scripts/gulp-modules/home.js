function init() {
  const slider = $('.js-slider');
  slider.on('init', (node, slick) => {
    $('.js-home-slider__all').html(slick.slideCount);
    $('.js-home-slider__current').html(slick.currentSlide + 1);
  });

  slider.on('afterChange', (node, slick) => {
    $('.js-home-slider__current').html(slick.currentSlide + 1);
  });

  slider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    speed: 500,
    arrows: true,
    lazyLoad: 'progressive',
    prevArrow: '.home-slider__prev',
    nextArrow: '.home-slider__next',
  });


}

document.addEventListener('DOMContentLoaded', init);
