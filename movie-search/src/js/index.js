import '../sass/style.scss';

import Header from './view/Header';
import Main from './view/Main';
import Search from './view/Search';
import Footer from './view/Footer';
import ContentBuilder from './view/ContentBuilder';
import SwiperSlider from './view/Swiper';
import SearchController from './controller/SearchController';

window.addEventListener('DOMContentLoaded', async () => {
  const header = new Header();
  const footer = new Footer();
  const pageBuilder = new ContentBuilder('body', header.createHeader(), Main.createMain(), footer.createFooter());
  pageBuilder.addContentToDOM();
  Main.addMinHeight();

  const search = new Search('search');
  search.searchInputListener();

  const swiperSlider = new SwiperSlider('carousel');
  swiperSlider.createSlider();

  const searchController = new SearchController();
  searchController.start();
});
