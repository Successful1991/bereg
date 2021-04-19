import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';

/** ******************************* */
/*
 * smooth scroll start
 */

/* eslint-disable-next-line */
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smoothMobile: false,
  inertia: 1.1,
});

/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
const forms = [
  '[data-home-contact]',
];
const formsWithRedirect = [
  '[data-popup-form]',
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
            rule: yup.string().required(i18next.t('required')).trim(),
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
      console.log($form);
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
        showSuccessMessage: false,
        successAction: () => { window.location.href = 'message'; },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
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
      console.log($form);
      $form.querySelector('[name="phone"]').focus();
    }, false);
  }
});

/*
 * form handlers end
 */
/** ******************************* */


const val = '360.40 46.35, 366.49 -1.00, 870.00 -1.00, 870.00 667.00, 32.00 667.00, 31.00 667.00, 98.68 598.74, 159.85 525.47, 260.29 363.48, 280.88 320.42, 290.30 298.51, 294.97 287.55, 299.27 276.45, 330.07 186.19, 342.14 140.03, 347.59 116.79, 352.21 93.37, 360.40 46.35';
const arr = val.split(', ');
const height = 666;
const width = 414;
const result = arr.map((str) => {
  const [x, y] = str.split(' ');
  console.log(x, y);
  const newX = (x * 100 / width).toFixed(2);
  const newY = (y * 100 / height).toFixed(2);
  return `${newX}% ${newY}%`;
});
console.log(result.join(', '));
