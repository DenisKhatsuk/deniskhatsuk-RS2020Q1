'use strict';

import '../sass/style.scss';

import Header from './view/Header';
import Main from './view/Main';
import Footer from './view/Footer';
import ContentBuilder from './view/ContentBuilder';
import SwiperSlider from './view/Swiper';
import SearchController from './controller/SearchController';

window.addEventListener('DOMContentLoaded', async () => {
  const header = new Header();
  const main = new Main();
  const footer = new Footer();
  const pageBuilder = new ContentBuilder('body', header.createHeader(), main.createMain(), footer.createFooter());

  pageBuilder.addContentToDOM();
  main.addMinHeight();

  const swiperSlider = new SwiperSlider('carousel');
  swiperSlider.createSlider();


  const searchController = new SearchController('search');
  searchController.start();

});
