function updateSelected(selected, state) {
  const select = selected;
  select.innerHTML = `${state.name}`;
  const oldElement = document.querySelector('[select].disabled');
  oldElement.classList.remove('disabled');
  const currentElement = document.querySelector(`[data-id="${state.selected}"]`);
  currentElement.classList.add('disabled');
}

// function setHeightCam() {
// //   const container = document.querySelector('[data-container-camera]');
// //   const camera = document.querySelector('[data-camera]');
// //   const width = container.clientWidth;
// //   const height = width / 1.777;
// //   camera.style.height = `${height}px`;
// // }

function replaceContent(link) {
  const camera = document.querySelector('[data-camera]');
  camera.setAttribute('src', link);
  camera.setAttribute('href', link);
}

function initDropdown() {
  const state = {
    changeDropdown: false,
    selected: 1,
    name: 1,
  };
  const container = document.querySelector('[data-select-container]');
  const dropdown = document.querySelector('[data-dropdown]');
  const list = document.querySelector('[data-select-list]');
  const selected = document.querySelector('[data-selected]');
  if (window.innerWidth > 992) {
    const containerHeight = container.clientHeight;
    const selectedHeight = selected.clientHeight;
    const maxHeight = containerHeight - selectedHeight;
    list.style.maxHeight = `${maxHeight}px`;
  } else {
    list.style.maxHeight = '40vh';
  }

  const changeDropdown = () => {
    dropdown.classList.toggle('active');
  };

  dropdown.addEventListener('click', (event) => {
    event.stopPropagation();
    state.changeDropdown = !state.changeDropdown;
    changeDropdown();
  });

  document.addEventListener('click', () => {
    if (!state.changeDropdown) return;
    state.changeDropdown = !state.changeDropdown;
    changeDropdown();
  });

  list.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('select')) {
      const { link, id, name } = event.target.dataset;
      state.selected = window.parseInt(id);
      state.name = name;
      replaceContent(link);
      updateSelected(selected, state);
      state.changeDropdown = !state.changeDropdown;
      changeDropdown();
    }
  });
}

function init() {
  setHeightCam(); // don't change orders 1.
  initDropdown(); // don't change orders 2
  window.locoScroll.update();
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', setHeightCam);
