/* eslint-disable no-undef */
// Google map start
function func() {
  const script = document.createElement('script');
  let key = '';
  if (window.location.href.match(/localhost/)) key = 'AIzaSyD9nfM9ITx5m84p5GxlRoXa24A6jBOFe3U';
  // const key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
  document.getElementsByTagName('head')[0].appendChild(script);
}

const maps = document.querySelectorAll('.map');
const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

maps.forEach((image) => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);
        func();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});

function setMap(data) {
  const gmarkers1 = [];
  const { points, main: center } = data;
  // const center = {
  //   lat: 50.476303,
  //   lng: 30.516779,
  // };
  /** Массив, куда записываются выбраные категории */
  const choosedCategories = new Set();
  choosedCategories.add('main');
  /** Елементы, при клике на который будет происходить фильтрация */
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: 'en',
    styles: [{
      featureType: 'all',
      stylers: [{
        saturation: 0,
      }, {
        hue: '#e7ecf0',
      }],
    }, {
      featureType: 'road',
      stylers: [{
        saturation: -70,
      }],
    }, {
      featureType: 'transit',
      stylers: [{
        visibility: 'off',
      }],
    }, {
      featureType: 'poi',
      stylers: [{
        visibility: 'off',
      }],
    }, {
      featureType: 'water',
      stylers: [{
        visibility: 'simplified',
      }, {
        saturation: -60,
      }],
    }],
  });
  const filterMarkers = function filterMarkers(category, categoriesArray) {
    gmarkers1.forEach((el) => {
      if (categoriesArray.has(el.category)) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers('main', choosedCategories);
    });
  });

  // var baseFolder = '/wp-content/themes/rusaniv/assets/images/markers/';
  // const baseFolder = './assets/images/markers/';
  // const defaultMarkerSize = new google.maps.Size(40, 50);
  // const buildLogoSize = new google.maps.Size(70, 87);
  // const markersAdresses = {
  //   main: `${baseFolder}marker-main.svg`,
  //   sport: `${baseFolder}marker-sport-complex.svg`,
  //   school: `${baseFolder}marker-school.svg`,
  //   bank: `${baseFolder}marker-bank.svg`,
  //   kindergarden: `${baseFolder}marker-kindergarden.svg`,
  //   park: `${baseFolder}marker-park.svg`,
  //   meal: `${baseFolder}marker-meal.svg`,
  //   dentist: `${baseFolder}marker-dentist.svg`,
  //   medicine: `${baseFolder}marker-medicine.svg`,
  //   metro: `${baseFolder}marker-metro.svg`,
  //   post: `${baseFolder}marker-post.svg`,
  //   shop: `${baseFolder}marker-shop.svg`,
  //   supermarkets: `${baseFolder}marker-supermarkets.svg`,
  // };
  // const markerPopupStyle = `
  //   style="
  //   background: #1798D5;
  //   padding:5px 10px;
  //   font-weight: 500;
  //   font-size: 14px;
  //   line-height: 22px;"
  //  `;
  /* beautify preserve:start */
  // const points = [
  //   {
  //     content: `<img style="background:white" src="${markersAdresses.main}">`,
  //     position: { lat: 50.476303, lng: 30.516779 },
  //     type: 'main',
  //     icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
  //   },
  //   {
  //     content: `<div ${markerPopupStyle}>PARK</div>`,
  //     position: { lat: 50.478303, lng: 30.516779 },
  //     type: 'park',
  //     icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize },
  //   },
  //   {
  //     content: `<div ${markerPopupStyle}>Shop</div>`,
  //     position: { lat: 50.480303, lng: 30.516779 },
  //     type: 'shop',
  //     icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
  //   },
  //   {
  //     content: `<div ${markerPopupStyle}>Post</div>`,
  //     position: { lat: 50.482303, lng: 30.516779 },
  //     type: 'post',
  //     icon: { url: markersAdresses.post, scaledSize: defaultMarkerSize },
  //   },
  //   {
  //     content: `<div ${markerPopupStyle}>Bank</div>`,
  //     position: { lat: 50.484303, lng: 30.516779 },
  //     type: 'bank',
  //     icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
  //   },
  // ];
  /* beautify preserve:end */
  const infowindow = new google.maps.InfoWindow({
    content: '',
    maxWidth: 200,
  });
  points.forEach((marker) => {
    const category = marker.type;
    const mapMarker = new google.maps.Marker({
      map,
      category,
      icon: marker.icon,
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
    });

    google.maps.event.addListener(mapMarker, 'click', function () {
      infowindow.setContent(marker.content);
      infowindow.open(map, mapMarker);
      map.panTo(this.getPosition());
    });
    mapMarker.name = marker.type;
    gmarkers1.push(mapMarker);
  });
}
// eslint-disable-next-line no-unused-vars
function initMap() {
  window.axios.post('/wp-admin/admin-ajax.php', { action: 'infrastructure' })
    .then(data => setMap(JSON.parse(data)));
  // $.ajax({
  //   method: 'GET',
  //   url: '/wp-admin/admin-ajax.php',
  //   data: 'action=infrastructure',
  // }).done((data) => {
  //   setMap(JSON.parse(data));
  // });
}

function helperMapInit() {
  const helperMap = $('[data-helper-map]');
  const map = $('#map');
  $('.page__inner').before(helperMap);
  function throttle(f, t) {
    let previousCall;
    return (args) => {
      const lastCall = Date.now();
      if (previousCall === undefined // function is being called for the first time
        || (lastCall - previousCall) > t) { // throttle time has elapsed
        previousCall = lastCall;
        f(args);
      }
    };
  }
  const throttleLogger = throttle(() => {
    const heightWrap = window.innerHeight;
    const mapTop = map.offset().top;
    if (mapTop - heightWrap <= 0) {
      helperMap[0].style.visibility = 'hidden';
    } else {
      helperMap[0].style.visibility = 'visible';
    }
  }, 400);
  locoScroll.on('scroll', (event) => {
    throttleLogger(event);
  });

  helperMap.on('click', () => {
    locoScroll.scrollTo(map[0]);
  });
}

function genplane() {
  const svg = document.querySelector('[data-genplane]');
  const markersWrap = document.querySelector('[data-markers-wrap]');
  const state = {
    activeType: '',
  };

  const setActivePolygon = (type) => {
    const polygon = svg.querySelector(`[data-polygon-type="${type}"]`);
    polygon.classList.add('active');
  };
  const setActiveListElement = (type) => {
    const marker = markersWrap.querySelector(`[data-category="${type}"]`);
    marker.classList.add('active');
  };
  const removeActivePolygon = () => {
    const polygon = svg.querySelector('[data-genplane-polygon].active');
    polygon.classList.remove('active');
  };
  const removeActiveListElement = () => {
    const marker = markersWrap.querySelector('[data-marker].active');
    marker.classList.remove('active');
  };

  const watchedState = window.onChange(state, (path, value, prevValue) => {
    if (prevValue) {
      removeActivePolygon();
      removeActiveListElement();
    }
    if (value) {
      setActivePolygon(value);
      setActiveListElement(value);
    }
  });

  svg.addEventListener('mousemove', (event) => {
    const { dataset } = event.target;
    if (window._.has(dataset, 'genplanePolygon')) {
      watchedState.activeType = dataset.polygonType;
      return;
    }
    watchedState.activeType = '';
  });
  svg.addEventListener('mouseleave', () => {
    watchedState.activeType = '';
  });
  markersWrap.addEventListener('mousemove', (event) => {
    const { dataset } = event.target;
    if (window._.has(dataset, 'category')) {
      watchedState.activeType = dataset.category;
      return;
    }
    watchedState.activeType = '';
  });
  markersWrap.addEventListener('mouseleave', () => {
    watchedState.activeType = '';
  });
}

window.addEventListener('load', () => {
  helperMapInit();
  /** Выдвижная панель маркеров на мобильной версии */
  const legend = document.querySelector('[data-mob-accordeon]');
  const legendTitle = legend.querySelector('.map__legend-title');
  legendTitle.addEventListener('click', () => {
    legend.classList.toggle('opened');
    // добавить плавность появление блока с маркерами
    if (legend.classList.contains('opened')) {
      gsap.fromTo('.map__legend-markers-wrap', { maxHeight: 0 },
        { maxHeight: '50vh' });
    } else {
      gsap.fromTo('.map__legend-markers-wrap', { maxHeight: '50vh' }, { maxHeight: 0 });
    }
  });
  legend.addEventListener('mouseenter', () => {
    if (locoScroll !== undefined) locoScroll.stop();
  });
  legend.addEventListener('mouseleave', () => {
    if (locoScroll !== undefined) locoScroll.start();
  });
  genplane();
});
