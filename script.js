'use strict';

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);
const section1 = document.querySelector('#section--1');
const btnScroll = document.querySelector('.btn--scroll-to');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('nav');

///////////////////////////////////////
// Modal window

const openModalWindow = function () {
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(btn =>
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    openModalWindow();
  })
);

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});

// Плавное прокручивание

btnScroll.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////////////
// Smooth page navigation

// document.querySelectorAll('.nav__link').forEach(function (htmlElement) {
//   htmlElement.addEventListener('click', function (e) {
//     e.preventDefault();
//     const href = this.getAttribute('href');
//     console.log(href);
//     document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Делегирование событий
// 1. Добавляем event listener для ОБЩЕГО родителя
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // 2. Определить target элемент
  console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  }
});

// Вкладки

tabContainer.addEventListener('click', function (e) {
  const clickedButton = e.target.closest('.operations__tab');
  // Guard clause - Пункт охраны
  if (!clickedButton) return;

  // Активная вкладка
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  // Активный контент
  tabContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Анимация потускнения на панели навигации

const navLinksHoverAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest('.nav__links')
      .querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');

    siblingLinks.forEach(el => {
      if (el !== linkOver) el.style.opacity = this;
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};

// Работа с аргументами при помощи bind() / this
nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));

nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

// Sticky navigation
//const section1Cord = section1.getBoundingClientRect();
//window.addEventListener('scroll', function () {
//  if (window.scrollY > section1Cord.top) {
//    nav.classList.add('sticky');
//  } else {
//    nav.classList.remove('sticky');
//  }
//});

// Sticky navigation - Intersection Observer API

// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(observerCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const getStickyNav = function (entries) {
  const entry = entries[0];
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Появление частей сайта
const allSections = document.querySelectorAll('.section');

const appearanceSection = function (entries, observer) {
  const entry = entries[0];
  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Имплементация lazy loading для изображений
const lazyImages = document.querySelectorAll('img[data-src]');

const loadImages = function (entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) {
    return;
  }

  // Меняем на изображение с высоким разрешением
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.7,
});
lazyImages.forEach(image => lazyImagesObserver.observe(image));

// Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const dotContainer = document.querySelector('.dots');

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class ="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();

const activateCurrentDot = function (slide) {
  dotContainer
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

activateCurrentDot(currentSlide);

const moveToSlide = function (slide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${(index - slide) * 100}%)`;
  });
  activateCurrentDot(slide);
};

const nextSlide = function () {
  if (currentSlide === slides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
};

const prewSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
};

slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 100}%)`;
});
sliderBtnRight.addEventListener('click', nextSlide);

sliderBtnLeft.addEventListener('click', prewSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') {
    nextSlide();
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') {
    prewSlide();
  }
});
console.log(dotContainer.querySelectorAll('.dots__dot'));
// Pagination
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
  }
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
///////////////////////////////////////////////
// Создание и вставка элементов
// .insertAdjacentHTML()

//const message = document.createElement('div');
//message.classList.add('cookie-message');
//// message.textContent = 'Мы используем на этом сайте cookie для улучшения функциональности.';
//message.innerHTML =
//  'Мы используем на этом сайте cookie для улучшения функциональности. <button class="btn btn--close-cookie">Ок!</button>';

//const header = document.querySelector('.header');
//// header.prepend(message);
//header.append(message);
//// header.append(message.cloneNode(true));
//// header.before(message);
//// header.after(message);

//// Удаление элементов
//document
//  .querySelector('.btn--close-cookie')
//  .addEventListener('click', function () {
//    message.remove();
//    // message.parentElement.removeChild(message);
//  });
////console.log(getComputedStyle(overlay));
// Виды Событий И Обработчиков Событий

//const h1 = document.querySelector('h1');
//// const alertMouseEnterH1 = function (e) {
////   alert('addEventListener: You are now at the h1 element');
////   h1.removeEventListener('mouseenter', alertMouseEnterH1);
//// };

//const alertMouseEnterH1 = function (e) {
//  alert('addEventListener: You are now at the h1 element');
//};
//h1.addEventListener('mouseenter', alertMouseEnterH1);

//setTimeout(() => h1.removeEventListener('mouseenter', alertMouseEnterH1), 3000);

// h1.onclick = function (e) {
//   alert('onclick: You have clicked the h1 element');
// };

///////////////////////////////////////
// Event Propagation
// rgb(123, 56, 78)

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
// }

// const getRandomColor = () =>
//   `rgb(${getRandomIntInclusive(0, 255)}, ${getRandomIntInclusive(
//     0,
//     255
//   )}, ${getRandomIntInclusive(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   console.log('Link', e.target, e.currentTarget);
//   console.log(this === e.currentTarget);
//   // Stop propagation
//   // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   console.log('Links', e.target, e.currentTarget);
//   console.log(this === e.currentTarget);
// });

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = getRandomColor();
//     console.log('Nav', e.target, e.currentTarget);
//     console.log(this === e.currentTarget);
//   }
//   // , true
// );

// document.querySelector('body').addEventListener('click', function (e) {
//   this.style.backgroundColor = getRandomColor();
//   console.log('Body', e.target, e.currentTarget);
//   console.log(this === e.currentTarget);
// });

//////////////////////////////////////////////
// DOM traversing (Перемещение по DOM)

// const h1 = document.querySelector('h1');

// // Перемещение вниз (к потомкам)
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstElementChild);
// h1.firstElementChild.style.color = 'yellow';
// console.log(h1.lastElementChild);

// // Перемещение вверх (к родителям)
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// const h2 = document.querySelector('h2');
// console.log(h2);
// // h2.closest('.section').style.backgroundColor = 'blue';
// // h2.closest('h2').style.backgroundColor = 'green';

// // Перемещение в стороны
// console.log(h2.previousElementSibling);
// console.log(h2.nextElementSibling);

// console.log(h1.parentElement.children);
