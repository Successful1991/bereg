import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import gsap from 'gsap';
import axios from 'axios';
import * as yup from 'yup';
import _ from 'lodash';
import pannellum from 'pannellum/build/pannellum';
import onChange from 'on-change';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';

/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.axios = axios;
global._ = _;
global.onChange = onChange;
global.pannellum = pannellum;

/* eslint-disable-next-line */

/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
const forms = [
  '[data-form-home-contact]',
  '[data-form-contact]',
  '[data-form-popup]',
  '[data-form-popup-presentation]',
  '[data-condition-contact]',
  '[data-form-quiz]',
];
const formsWithRedirect = [
  // '[data-popup-form]',
];

formsWithRedirect.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => { window.location.href = 'message'; },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim().matches(/^\D+$/),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      $form.querySelector('[name="phone"]').focus();
    }, false);
  }
});

forms.forEach((form) => {
  const $form = document.querySelector(form);

  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        $popup: document.querySelector('[data-popup]'),
        showSuccessMessage: false,
        successAction: 'toster',
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim().matches(/^\D+$/, i18next.t('field_too_letter')),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },
          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },
      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      $form.querySelector('[name="phone"]').focus();
    }, false);
  }
});
/*
 * form handlers end
 */
function disableScroll() {
  const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
  containersScroll.forEach((block) => {
    block.addEventListener('mouseenter', () => {
      window.locoScroll.stop();
    });
    block.addEventListener('mouseleave', () => {
      window.locoScroll.start();
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smoothMobile: false,
    inertia: 1.1,
  });
  window.locoScroll = locoScroll;
  window.locoScroll.update();
  disableScroll();
  setTimeout(() => {
    window.locoScroll.update();
  }, 2000);

  const mouseEl = document.querySelector('.icon-mouse');
  if (mouseEl) {
    locoScroll.on('scroll', (args) => {
      if (args.scroll.y > 50) {
        mouseEl.style.visibility = 'hidden';
      } else {
        mouseEl.style.visibility = 'visible';
      }
    });
  }
});

document.addEventListener('load', () => {
  window.locoScroll.update();
});

window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
});


/** ******************************* */
