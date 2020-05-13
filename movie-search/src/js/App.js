import '../sass/style.scss';

import Swiper from 'swiper';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ContentBuilder from './components/ContentBuilder';
import SwiperSlider from './components/SwiperSlider';
import InputHandler from './components/InputHandler';

window.addEventListener('DOMContentLoaded', () => {
  const pageBuilder = new ContentBuilder('body', Header.createHeader(), Main.createMain(), Footer.createFooter());
  pageBuilder.addContentToDOM();
  Main.addMinHeight();
  SwiperSlider.addSlider('carousel');

  const searchForm = document.querySelector('form.search');
  const searchInput = searchForm.querySelector('input');
  const searchSpinner = document.querySelector('.search__icon_spinner');
  const searchClear = document.querySelector('.search__icon_close');
  searchInput.focus();
  searchInput.addEventListener('input', () => {
    if (searchInput.value !== '') {
      searchClear.classList.add('search__icon_visible');
    } else {
      searchClear.classList.remove('search__icon_visible');
    }
  });
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.placeholder = 'Search a movie';
    searchClear.classList.remove('search__icon_visible');
    searchInput.focus();
  });
  const swiperWrapper = document.querySelector('.swiper-wrapper');
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

  function showResults(moviesList) {
    swiperWrapper.innerHTML = '';
    searchSpinner.setAttribute('style', 'display: none');
    moviesList.forEach((movie) => {
      const {
        title, poster, year, imdbID,
      } = movie;
      mySwiper.appendSlide(SwiperSlider.createSlide(title, poster, year, imdbID));
    });
  }

  async function makeRequest(request) {
    const searchRequest = request || searchInput.value;
    const moviesList = await InputHandler.getMoviesList(searchRequest);
    return moviesList;
  }

  async function inputHandler(event) {
    event.preventDefault();
    searchSpinner.setAttribute('style', 'display: inline-block');
    searchInput.placeholder = searchInput.value;
    const moviesList = await makeRequest();
    showResults(moviesList);
  }

  searchForm.addEventListener('submit', inputHandler);

  async function initialRequest(movie) {
    const moviesList = await makeRequest(movie);
    showResults(moviesList);
  }

  initialRequest('Subspecies');
});
