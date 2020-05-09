'use strict';

import '../sass/style.scss';

import Header from './view/Header';
import Main from './view/Main';
import Footer from './view/Footer';
import ContentBuilder from './view/ContentBuilder';
//import SwiperElement from './view/Swiper';
import Swiper from 'swiper';



window.addEventListener('DOMContentLoaded', () => {
  const header = new Header();
  const main = new Main();
  const footer = new Footer();
  const pageBuilder = new ContentBuilder('body', header.init(), main.init(), footer.init());
  //const swiperEl = new SwiperElement();
  pageBuilder.addContentToDOM();
  main.addMinHeight();
  //swiperEl.init();
  const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });
});
