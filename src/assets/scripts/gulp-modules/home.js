/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
function init() {
  // eslint-disable-next-line no-undef
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
        document.querySelector('[data-total]').innerHTML = document.querySelectorAll('.slide').length - 2;
        document.querySelector('[data-current]').innerHTML = e.activeIndex;
      },
    },
  });

  slider.on('activeIndexChange', (obj) => {
    document.querySelector('[data-current]').innerHTML = obj.realIndex + 1;
  });


  let prevSection = 0;
  const isMobile = window.matchMedia('(max-width: 575px)').matches;

  if (!isMobile) {
    locoScroll.destroy();
    setTimeout(() => {
      document.querySelector('.page__inner').style.transform = '';
    }, 5000);
  }
  // eslint-disable-next-line no-unused-expressions
  !isMobile && $.scrollify({
    section: 'section',
    scrollSpeed: 2250,
    standardScrollElements: 'footer',
    // easing: "easeInOut",

    before: function (e, list) {
      const direction = (e - prevSection) * -1;
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(
        list[e][0].querySelectorAll('.template-content'),
        { y: 50 * direction, autoAlpha: 0 },
        {
          y: 0, autoAlpha: 1, ease: 'power4.easeInOut', duration: 2.250, stagger: 0.1,
        },
        '<',
      );
      tl.play();
      prevSection = e;
    },
    // after: function(e, next) { },
  });
}

document.addEventListener('DOMContentLoaded', init);
