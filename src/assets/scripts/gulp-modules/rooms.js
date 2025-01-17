function closeFilter(container) {
  const wrap = container;
  wrap.style.height = '0';
}

function openFilter(container, state) {
  const wrap = container;
  wrap.style.height = `${state.defaultHeight}px`;
}

function filterVisible() {
  const state = {
    isVisible: true,
    defaultHeight: 0,
  };
  const filterContainer = document.querySelector('.filter');
  const buttonChangeVisible = document.querySelector('[data-filter-hide]');
  const watchedState = window.onChange(state, (path, value) => {
    switch (path) {
      case 'isVisible':
        buttonChangeVisible.dataset.isVisible = value;
        if (value) {
          openFilter(filterContainer, watchedState);
          return true;
        }
        closeFilter(filterContainer);
        return false;
      default:
        break;
    }
    return true;
  });

  state.defaultHeight = filterContainer.clientHeight;
  openFilter(filterContainer, watchedState);

  document.querySelector('[data-filter-hide]').addEventListener('click', () => {
    watchedState.isVisible = !watchedState.isVisible;
  });
}

function getTypeRoom() {
  const pageName = window.location.pathname;
  const num = pageName.match(/\d/)[0];
  return num;
}

async function getFlats() {
  // const response = await window.axios.get('./static/flats.json');
  const response = await window.axios.post('/wp-admin/admin-ajax.php', { action: 'getFlats', rooms: getTypeRoom() });
  return response.data;
}

function checkFilterBorder(flats) {
  return flats.reduce((acc, flat) => {
    const updatedFlat = window._.pick(flat, ['all_room', 'floor', 'life_room']);
    Object.entries(updatedFlat).forEach(([key, value]) => {
      acc[key] = window._.has(acc, key) ? acc[key] : {};
      if (!window._.has(acc[key], 'min') || acc[key].min > value) {
        acc[key].min = window.parseInt(value);
      }
      if (!window._.has(acc[key], 'max') || acc[key].max < value) {
        acc[key].max = window.parseInt(value);
      }
    });
    return acc;
  }, {});
}

function checkRangeParam(flat, key, value) {
  return (window._.has(flat, key)
    && +flat[key] >= value.min
    && +flat[key] <= value.max);
}

function checkSelectParam(flat, key, value) {
  return (window._.includes(value.value, flat[key]) || window._.size(value.value) === 0);
}

function getTypeFilterParam(name) {
  const filterName = { range: ['all_room', 'life_room', 'floor'], checkbox: ['rooms'] };
  if (filterName.checkbox.includes(name)) {
    return 'checkbox';
  } if (filterName.range.includes(name)) {
    return 'range';
  }
  return null;
}

function filter(flats, param) {
  const flatsId = Object.values(flats);
  const result = flatsId.filter((flat) => {
    const settingColl = Object.entries(param);
    const isLeave = settingColl.every((setting) => {
      const [name, value] = setting;
      if (getTypeFilterParam(name) === 'range') {
        return checkRangeParam(flat, name, value);
      }
      if (getTypeFilterParam(name) === 'checkbox') {
        return checkSelectParam(flat, name, value);
      }
      return false;
    });
    return isLeave;
  });
  return result;
}

function render(flats, wraper, fountNum) {
  const wrap = wraper;
  const fountNumEl = fountNum;
  wrap.innerHTML = '';
  const html = flats.map(flat => `<a href="/flat/?id=${flat.id}" class="card"><img class="card__img" src="${(flat.img_small || '/wp-content/themes/bereg/assets/images/rooms/flat.svg')}" title="foto" alt="foto">
            <div class="card__title">Квартира ${flat.type}</div>
            <table class="card__table">
              <tbody><tr>
                <td>${flat.floor_name}</td>
                <td>${flat.floor}</td>
              </tr>
              <tr>
                <td>${flat.room_name}</td>
                <td>${flat.rooms}</td>
              </tr>
              <tr>
                <td>${flat.area_name}</td>
                <td>${flat.all_room}</td>
              </tr>
              <tr>
                <td>${flat.life_name}</td>
                <td>${flat.life_room}</td>
              </tr>
            </tbody></table><div class="card__link"><span>${flat.button}</span>
              <div class="card__link-svg">
                <svg class="icon--arrow" role="presentation">
                  <use xlink:href="#icon-arrow"></use>
                </svg>
              </div></div>
          </a>`);
  fountNumEl.innerHTML = flats.length;
  wrap.innerHTML = html.join('');
  return true;
}

async function initFilter() {
  const form = document.querySelector('form[name="filter"]');
  const resetBtn = form.querySelector('.filter__reset');
  const fountNum = document.querySelector('.found__num');
  const flats = await getFlats();
  const borderParam = checkFilterBorder(flats);
  const ranges = document.querySelectorAll('input[data-type="range"]');
  const flatsContainer = document.querySelector('[data-list]');
  document.querySelector('.found__all').innerHTML = flats.length;

  ranges.forEach((range) => {
    const { name } = range;
    $(range).ionRangeSlider({
      grid: false,
      type: 'double',
      min: borderParam[name].min,
      max: borderParam[name].max,
      from: borderParam[name].min,
      to: borderParam[name].max,
      step: 1,
      onFinish: (e) => {
        borderParam[name].min = e.from;
        borderParam[name].max = e.to;
      },
    });
    const instance = $(`input[name=${name}]`).data('ionRangeSlider');
    instance.update({
      min: borderParam[name].min,
      max: borderParam[name].max,
      from: borderParam[name].min,
      to: borderParam[name].max,
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const filteredFlats = filter(flats, borderParam);
    render(filteredFlats, flatsContainer, fountNum);
    window.locoScroll.update();
  });

  resetBtn.addEventListener('click', (event) => {
    event.preventDefault();
    render(flats, flatsContainer, fountNum);
    ranges.forEach((range) => {
      const rangeEl = $(range).data('ionRangeSlider');
      rangeEl.reset();
    });
    window.locoScroll.update();
  });

  render(flats, flatsContainer, fountNum);
  window.locoScroll.update();
}

document.addEventListener('DOMContentLoaded', async () => {
  await initFilter();
  filterVisible();
});
