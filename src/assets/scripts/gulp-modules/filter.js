async function getFlats() {
  const data = axios('static/flats.json');
  return data;
}

const checkFilterBorder = (flats) => {
  flats.map()
};

function initFilter() {
  const form = document.querySelector('form[name="filter"]');
  const ranges = $('input[data-type="range"]');

  ranges.forEach((range) => {
    range.ionRangeSlider({
      type: 'double',
      min: 0,
      max: 1000,
      from: 200,
      to: 500,
      grid: true,
    });
  });
}
