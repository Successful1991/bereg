function back() {
  const link = document.querySelector('[data-back]');
  link.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.back();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const img = document.querySelector('[data-img]');
  const height = img.clientHeight;
  const container = document.querySelector('[data-container]');
  container.style.height = `${height}px`;
  locoScroll.update();
  back();
});
