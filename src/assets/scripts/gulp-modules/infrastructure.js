/* eslint-disable no-undef */
// Google map start
function func() {
  const script = document.createElement('script');
  let key = 'AIzaSyDTqT4gdBBxpTmVdkHHlPuiqPs0wOhFIm8';
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
  const { points, main } = data;
  const center = {
    lat: +main.lat,
    lng: +main.lng,
  };
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
    styles: [
      {
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

  const filterMarkers = (category, categories) => {
    const newCategory = ((categories.size === 1 && categories.has('main'))
    || categories.size === 0 ? 'all' : category);
    gmarkers1.forEach((marker) => {
      if (newCategory === 'all' || categories.has(marker.category)) {
        marker.setMap(map);
        marker.setAnimation(google.maps.Animation.DROP);
      } else {
        marker.setMap(null);
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
      filterMarkers(item.dataset.category, choosedCategories);
    });
  });

  points.forEach((marker) => {
    const category = marker.categorie;
    const [lat, lng] = marker.cor.split(', ');
    const mapMarker = new google.maps.Marker({
      map,
      category,
      icon: marker.image,
      position: new google.maps.LatLng({ lat: +lat, lng: +lng }),
    });

    // google.maps.event.addListener(mapMarker, 'click', function () {
    //   infowindow.setContent(marker.content);
    //   infowindow.open(map, mapMarker);
    //   map.panTo(this.getPosition());
    // });
    mapMarker.name = category;
    gmarkers1.push(mapMarker);
  });

  locoScroll.update();
}
// eslint-disable-next-line no-unused-vars
function initMap() {
  window.axios.post('/wp-admin/admin-ajax.php', { action: 'infrastructure' })
    .then((resp) => {
      setMap(resp.data);
    });
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
  const throttleLogger = throttle((event) => {
    const heightWrap = window.innerHeight;
    const mapTop = map.offset().top;
    if (mapTop - heightWrap - event.scroll.y <= 0) {
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

function setHeightToGenplanPoints(svg, markersWrap) {
  // const svg = document.querySelector('[data-genplane]');
  const heightSvg = svg.clientHeight;
  const wrap = markersWrap;
  // const markersWrap = document.querySelector('[data-markers-wrap]');
  wrap.style.height = `${heightSvg}px`;
  locoScroll.update();
}

function genplane() {
  const svg = document.querySelector('[data-genplane]');
  const heightSvg = svg.clientHeight;
  const markersWrap = document.querySelector('[data-markers-wrap]');
  if (window.innerWidth > 992) {
    markersWrap.style.height = `${heightSvg}px`;
    setHeightToGenplanPoints(svg, markersWrap);
  }
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
    if (marker) {
      marker.classList.remove('active');
    }
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

  window.addEventListener('resize', () => {
    setHeightToGenplanPoints(svg, markersWrap);
    locoScroll.update();
  });
}

window.addEventListener('load', () => {
  helperMapInit();

  const mouseEl = $('.icon-mouse');
  locoScroll.on('scroll', (args) => {
    if (args.scroll.y > 50) {
      mouseEl[0].style.visibility = 'hidden';
    } else {
      mouseEl[0].style.visibility = 'visible';
    }
  });
  document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 50) {
      mouseEl[0].style.visibility = 'hidden';
    } else {
      mouseEl[0].style.visibility = 'visible';
    }
  });

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
