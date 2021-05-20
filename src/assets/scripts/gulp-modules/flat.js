function flatInit() {
  const image = document.querySelector('[data-flat-image]');
  const pathImages = JSON.parse(image.dataset.src);
  const setSrcImage = (path) => {
    image.setAttribute('src', path);
  };
  const updatePlanActiveText = (type) => {
    const prevActive = document.querySelector('.active[data-plane]');
    prevActive.classList.remove('active');
    const nextActive = document.querySelector(`[data-plane][data-type="${type}"]`);
    nextActive.classList.add('active');
  };

  document.querySelector('.js-switch-btn').addEventListener('change', (event) => {
    const type = (event.target.checked) ? '3d' : '2d';
    setSrcImage(pathImages[type]);
    updatePlanActiveText(type);
  });
}

document.addEventListener('DOMContentLoaded', flatInit);
