window.locoScroll.on('scroll', () => {
  // eslint-disable-next-line no-unused-expressions
  window.ScrollTrigger.update;
});

window.ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return (arguments.length
      ? window.locoScroll.scrollTo(value, 0, 0)
      : window.locoScroll.scroll.instance.scroll.y);
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.body.style.transform ? 'transform' : 'fixed',
});
window.ScrollTrigger.addEventListener('fixed', () => window.locoScroll.update());

window.ScrollTrigger.refresh();
window.gsap.registerPlugin(window.ScrollTrigger);

// const mainScreenTransition = new BezierEasing(0.75, 0.01, 0.31, 1);
// const swiper = new Swiper('.swiper-container', {
//   slidesPerView: 1,
//   centeredSlides: true,
//   speed: 1000,
//   loop: true,
//   navigation: {
//     nextEl: document.querySelector('[data-next]'),
//     prevEl: document.querySelector('[data-prev]'),
//   },
//   effect: 'fade',
//   on: {
//     init(some) {
//       const config = some;
//       config.transitionDuration = 0.6;
//     },
//   },
// });

//
// swiper.on('beforeTransitionStart', (some) => {
//   const tl = window.gsap.timeline();
//   tl.fromTo(some.imagesToLoad[some.activeIndex], { scale: 1.1 }, {
//     scale: 1, duration: some.transitionDuration, ease: mainScreenTransition,
//   });
//   tl.fromTo(some.imagesToLoad[some.previousIndex], { scale: 1 }, {
//     scale: 1.1, duration: some.transitionDuration, ease: mainScreenTransition,
//   }, '<');
// });

const quoteCubes = document.querySelectorAll('[data-cubes-anim]');
// const cubesEasing = new BezierEasing(0.42,0,0.58,1);
// eslint-disable-next-line no-undef
const cubesEasing = new BezierEasing(0.48, 1, 0.5, 1);
quoteCubes.forEach((block) => {
  window.gsap.set(block.querySelectorAll('[data-from-right]'), { x: '100%', scale: 0.95 });
  window.gsap.set(block.querySelectorAll('[data-from-top]'), { y: '-100%', scale: 0.95 });
  window.gsap.set(block.querySelectorAll('[data-from-left]'), { x: '-100%', scale: 0.95 });
  window.gsap.set(block.querySelectorAll('[data-from-bottom]'), { y: '100%', scale: 0.95 });
  const tl = window.gsap.timeline({
    paused: true,
    timeScale: 0.5,
    scrollTrigger: {
      triggerHook: 0.5,
      trigger: block,
      end: '+=50%',
    },
  });
  tl.to(block.querySelectorAll('[data-cubes]'), {
    x: 0,
    y: 0,
    // ease: cubesEasing,
    duration: 0.95,
    scale: 1,
    stagger: block.dataset.stagger !== undefined ? 0.02 : 0,
    ease: cubesEasing,
  });
});

// window.addEventListener('load', () => {
//   const tl = window.gsap.timeline({ delay: 0.5, timeScale: 0.2 });
//   tl.to('.ms', { autoAlpha: 1, duration: 0.5 });
//   tl.fromTo('.swiper-container',
//     { scale: 1.1 },
//     { scale: 1, ease: cubesEasing, duration: 2 }, '<');
//   tl.fromTo('.template-content__title, .template-content__text, .link, .ms .main-button',
//     { autoAlpha: 0, y: 50 },
//     {
//       stagger: 0.1, autoAlpha: 1, y: 0, ease: cubesEasing,
//     }, '<+0.5');
// });

const paralaxSections = document.querySelectorAll('[data-home-paralax]');
paralaxSections.forEach((section) => {
  window.gsap.set(section, { backgroundPositionY: '-50px' });
  window.ScrollTrigger.create({
    triggerHook: 'center',
    trigger: section,
    end: 'bottom',
    onEnter: () => {},
    onUpdate: (self) => {
      window.gsap.to(section, { backgroundPositionY: `${(self.progress * 100) - 50}px` });
    },
  });
});

// eslint-disable-next-line no-undef
const clipPathEasing = new BezierEasing(0.75, 0.01, 0.14, 1);
const clipPathAnimationBlocks = document.querySelectorAll('[data-clip-path-animation]');
clipPathAnimationBlocks.forEach((section) => {
  window.gsap.set(section, { webkitClipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' });
  const tl = window.gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 0.5,
      trigger: section,
      end: '+=50%',
    },
  });
  tl.to(section, { webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 2, ease: clipPathEasing });
  window.gsap.set(section, { backgroundPositionY: '-50px' });
  window.gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 0.5,
      trigger: section,
      // end: '+=50%',
      onUpdate: (self) => {
        window.gsap.to(section, { backgroundPositionY: `${(self.progress * 100) - 50}px` });
      },
    },
  });
});

const animationSlideInImages = document.querySelectorAll('.home-bg__image img');
animationSlideInImages.forEach((section) => {
  window.gsap.set('.home-bg__image--left img', { zIndex: -1 });
  window.gsap.set(section, { position: 'relative' });
  const tl = window.gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 0.9,
      trigger: section,
      start: '99% bottom',
      scrub: 0.75,
    },
  });
  tl.fromTo(section, { scale: 1, y: 0 }, { scale: 1.05, y: 50 });
});


const homeInfoLists = document.querySelectorAll('.template-content');
// eslint-disable-next-line no-undef
const infoListEasing = new BezierEasing(0.17, 0.7, 0.52, 0.93);
homeInfoLists.forEach((section) => {
  const tl = window.gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 0.9,
      trigger: section,
    },
  });
  tl.fromTo(section,
    { autoAlpha: 0, y: -30 },
    {
      autoAlpha: 1, y: 0, duration: 1.5, ease: infoListEasing,
    });
});

const liveSections = document.querySelectorAll('.home-section-live');
liveSections.forEach((section) => {
  window.gsap.set(section, { transformOrigin: 'bottom' });
  const tl = window.gsap.timeline({
    paused: true,
    scrollTrigger: {
      start: '99% bottom',
      trigger: section,
      scrub: 1,
    },
  });
  tl.fromTo(section,
    { scale: 1 },
    {
      scale: 1.05,
    });
});

/** Запуск слайдер при попадании в область скролла */
const valesSliderIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
    }
  });
};
const observer = new IntersectionObserver(valesSliderIntersection, {});
const valuesSliderTarget = document.querySelector('.values-slider');
observer.observe(valuesSliderTarget);

// ///---------------------------------------------------
