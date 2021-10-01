let panorama;
function initPanorama(path) {
  if (panorama) {
    panorama.destroy();
  }
  panorama = window.pannellum.viewer('panorama', {
    type: 'equirectangular',
    showZoomCtrl: false,
    mouseZoom: false,
    keyboardZoom: false,
    autoLoad: true,
    panorama: path,
    compass: true,
    northOffset: 220.5,
  });
}

function changeActiveLink(selectState) {
  const { type, floor } = selectState;
  const prevActiveLink = document.querySelector('[data-list-type] a.active');
  const nextActiveLink = document.querySelector(`[data-list-type="${type}"] [data-floor="${floor}"]`);
  prevActiveLink.classList.remove('active');
  if (nextActiveLink) {
    nextActiveLink.classList.add('active');
    initPanorama(nextActiveLink.dataset.href);
    return;
  }
  const nextActiveLinkDefault = document.querySelector(`[data-list-type="${type}"] a`);
  nextActiveLinkDefault.classList.add('active');
  initPanorama(nextActiveLinkDefault.dataset.href);
}

function changeTabs(selectState) {
  const { type } = selectState;
  const elements = document.querySelectorAll('[data-list] li');
  elements.forEach((list) => {
    // eslint-disable-next-line no-param-reassign
    list.style.display = 'none';
    if (list.dataset.listType === type) {
      // eslint-disable-next-line no-param-reassign
      list.style.display = 'block';
    }
  });
  changeActiveLink(selectState);
}

function initView() {
  const selectState = {
    type: 'night',
    floor: 7,
  };
  const firstElementPath = document.querySelector(`[data-list-type="${selectState.type}"] a`).dataset.href;
  const buttonsContainer = document.querySelector('[data-tabs-buttons]');
  buttonsContainer.addEventListener('click', (event) => {
    event.preventDefault();
    const activeElement = event.target.closest('[data-select-type]');
    const type = activeElement.dataset.selectType;
    document.querySelector('[data-select-type].active').classList.remove('active');
    activeElement.classList.add('active');
    selectState.type = type;
    changeTabs(selectState);
  });

  const list = document.querySelector('[data-list]');
  list.addEventListener('click', (e) => {
    e.preventDefault();
    const { href, floor } = e.target.dataset;
    if (!href) return;
    selectState.floor = floor;
    initPanorama(href);
    changeActiveLink(selectState);
  });
  changeTabs(selectState);
  changeActiveLink(selectState);
  initPanorama(firstElementPath);
}

window.addEventListener('DOMContentLoaded', () => {
  initView();
});
