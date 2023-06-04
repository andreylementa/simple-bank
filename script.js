'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll(
  '.btn--show-modal-window'
);

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

///////////////////////////////////////////////
// Создание и вставка элементов
// .insertAdjacentHTML()

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'Мы используем на этом сайте cookie для улучшения функциональности.';
message.innerHTML =
  'Мы используем на этом сайте cookie для улучшения функциональности. <button class="btn btn--close-cookie">Ок!</button>';

const header = document.querySelector('.header');
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

// Удаление элементов
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });
console.log(getComputedStyle(overlay));

const section1 = document.querySelector('#section--1');
const btnScroll = document.querySelector('.btn--scroll-to');

btnScroll.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});
