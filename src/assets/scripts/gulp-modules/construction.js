function init() {
  // eslint-disable-next-line no-undef
  const slider = new Swiper('.js-construction__slider', {
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
      // init: (e) => {
      //   document.querySelector('[data-total]').innerHTML = document.querySelectorAll('.slide').length - 2;
      //   document.querySelector('[data-current]').innerHTML = e.activeIndex + 1;
      // },
    },
  });

  const selected = document.querySelector('[data-selected]');
  const selectList = document.querySelector('[data-select-list]');
  function changeSelectList() {
    selectList.classList.toggle('select__list-active');
  }
  function updateSelect(year, month) {
    selected.innerHTML = `${year} ${month}`;
  }

  selected.addEventListener('click', changeSelectList);
  selectList.addEventListener('click', function (event) {

  });
  // slider.on('activeIndexChange', (obj) => {
  //   document.querySelector('[data-current]').innerHTML = obj.realIndex + 1;
  // });
}

document.addEventListener('DOMContentLoaded', init);
