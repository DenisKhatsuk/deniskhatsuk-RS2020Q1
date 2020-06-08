import '../sass/style.scss';

import Swiper from 'swiper';
import SwiperConfig from './components/SwiperConfig';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ContentBuilder from './components/ContentBuilder';
import SwiperSlider from './components/SwiperSlider';
import RequestHandler from './components/RequestHandler';
import InfoPublisher from './components/InfoPublisher';

window.addEventListener('DOMContentLoaded', () => {
  const pageBuilder = new ContentBuilder('body', Header.createHeader(), Main.createMain(), Footer.createFooter());
  pageBuilder.addContentToDOM();

  const infoPublisher = new InfoPublisher('information');

  Main.addMinHeight();
  SwiperSlider.addSlider('carousel');

  const searchForm = document.querySelector('form.search');
  const searchInput = searchForm.querySelector('input');
  const searchSearchIcon = document.querySelector('.search__icon_search');
  const searchSpinnerIcon = document.querySelector('.search__icon_spinner');
  const searchClearButton = document.querySelector('.search__icon_close');
  searchInput.addEventListener('input', () => {
    if (searchInput.value !== '') {
      searchClearButton.classList.add('search__icon_visible');
    } else {
      searchClearButton.classList.remove('search__icon_visible');
    }
  });
  searchClearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.placeholder = 'Search a movie';
    searchClearButton.classList.remove('search__icon_visible');
    searchInput.focus();
  });

  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const { swiperConfig } = SwiperConfig;
  const mySwiper = new Swiper('.swiper-container', swiperConfig);

  function showResults(movies) {
    searchSearchIcon.setAttribute('style', 'display: inline-block');
    searchSpinnerIcon.setAttribute('style', 'display: none');
    movies.forEach((movie) => {
      const {
        title, poster, year, imdbRating, imdbID,
      } = movie;
      mySwiper.appendSlide(SwiperSlider.createSlide(title, poster, year, imdbRating, imdbID));
    });
    const newSlides = swiperWrapper.querySelectorAll('.swiper-slide_loading');

    newSlides.forEach((slide) => {
      const slideImage = slide.querySelector('.swiper-slide__image');

      if (slideImage.complete) {
        slide.classList.remove('swiper-slide_loading');
      } else {
        slideImage.addEventListener('load', () => {
          slide.classList.remove('swiper-slide_loading');
        });
        slideImage.addEventListener('error', () => {
          slideImage.setAttribute('src', './src/img/no_poster.jpg');
          slide.classList.remove('swiper-slide_loading');
        });
      }
    });
  }

  async function inputHandler(event) {
    event.preventDefault();
    const informationField = document.querySelector('.information');
    informationField.innerHTML = '';
    searchSearchIcon.setAttribute('style', 'display: none');
    searchSpinnerIcon.setAttribute('style', 'display: inline-block');
    const searchInputValue = searchInput.value;
    const requestLanguage = searchInputValue.match(/[А-Яё]$/i) ? 'RU' : 'ENG';
    const request = requestLanguage === 'RU' ? await RequestHandler.translateRequestFromRussian(searchInputValue) : searchInputValue;
    if (requestLanguage === 'RU') infoPublisher.publishInfo(`Showing results for "${request}"`);
    try {
      const moviesList = await RequestHandler.makeRequest(request);
      swiperWrapper.innerHTML = '';
      showResults(moviesList);
    } catch (error) {
      searchSpinnerIcon.setAttribute('style', 'display: none');
      searchSearchIcon.setAttribute('style', 'display: inline-block');
      infoPublisher.publishInfo(`No results for "${request}"`);
      return;
    }
    swiperWrapper.setAttribute('data-request', request);
    swiperWrapper.setAttribute('data-page', '1');
    searchInput.placeholder = searchInput.value;
  }
  searchForm.addEventListener('submit', inputHandler);

  async function initialRequest(movie) {
    const movies = await RequestHandler.makeRequest(movie);
    showResults(movies);
  }
  initialRequest('Subspecies');

  mySwiper.on('reachEnd', async () => {
    const request = swiperWrapper.getAttribute('data-request');
    let page = swiperWrapper.getAttribute('data-page');
    page = +page + 1;
    if (request !== null) {
      const moviesList = await RequestHandler.makeRequest(request, page);
      showResults(moviesList);
      swiperWrapper.setAttribute('data-page', page);
    }
  });
});
