function flatInit() {
  function updateHoverFlat(containers, data) {
    const wrap = containers;
    // wrap.type.innerHTML = data.type;
    wrap.flat.innerHTML = data.rooms;
    wrap.area.innerHTML = data.area;
  }

  function initPopup() {
    $('[data-flat-image]').magnificPopup({
      type: 'image',
    });
  }

  function hoverDataHundler(hoverElement, dataContainers) {
    if (hoverElement.tagName === 'polygon') {
      const data = hoverElement.dataset;
      updateHoverFlat(dataContainers, data);
    } else {
      Object.values(dataContainers).forEach((element) => {
        const el = element;
        el.innerHTML = element.dataset.defaultValue;
      });
    }
  }

  function initPlan(conf) {
    fetch(conf['3d'])
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(() => {
        $('.plan').addClass('plan-active');
      }).catch(() => {
        $('.plan').removeClass('plan-active');
      });
  }

  const dataContainers = {
    // type: document.querySelector('[data-type="type"]'),
    flat: document.querySelector('[data-type="flat"]'),
    area: document.querySelector('[data-type="area"]'),
  };

  const image = document.querySelector('[data-flat-image]');
  const pathImages = JSON.parse(image.dataset.src);
  const setSrcImage = (path) => {
    image.setAttribute('src', path);
    image.setAttribute('data-mfp-src', path);
  };
  const updatePlanActiveText = (type) => {
    const prevActive = document.querySelector('.active[data-plane]');
    prevActive.classList.remove('active');
    const nextActive = document.querySelector(`[data-plane][data-type="${type}"]`);
    nextActive.classList.add('active');
  };

  initPlan(pathImages);
  const switchElem = document.querySelector('.js-switch-btn');
  switchElem.addEventListener('change', (event) => {
    const type = (event.target.checked) ? '3d' : '2d';
    setSrcImage(pathImages[type]);
    updatePlanActiveText(type);
  });

  const svgContainer = document.querySelector('[data-svg-container]');
  svgContainer.addEventListener('mouseleave', (event) => {
    hoverDataHundler(event.target, dataContainers);
  });
  svgContainer.addEventListener('mouseover', (event) => {
    hoverDataHundler(event.target, dataContainers);
  });

  svgContainer.addEventListener('click', (event) => {
    const id = event.target.dataset.flat_id;
    if (!id) return;
    window.location.href = `/flat/?id=${id}`;
  });

  initPopup();
}


document.addEventListener('DOMContentLoaded', flatInit);
