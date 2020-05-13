import '../sass/style.scss';

import Swiper from 'swiper';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ContentBuilder from './components/ContentBuilder';
import SwiperSlider from './components/SwiperSlider';
import RequestHandler from './components/RequestHandler';

window.addEventListener('DOMContentLoaded', () => {
  const pageBuilder = new ContentBuilder('body', Header.createHeader(), Main.createMain(), Footer.createFooter());
  pageBuilder.addContentToDOM();
  Main.addMinHeight();
  SwiperSlider.addSlider('carousel');

  const searchForm = document.querySelector('form.search');
  const searchInput = searchForm.querySelector('input');
  const searchSpinnerIcon = document.querySelector('.search__icon_spinner');
  const searchClearButton = document.querySelector('.search__icon_close');
  searchInput.focus();
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
        spaceBetween: 30,
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

  function showResults(movies) {
    swiperWrapper.innerHTML = '';
    searchSpinnerIcon.setAttribute('style', 'display: none');
    movies.forEach((movie) => {
      const {
        title, poster, year, imdbRating,
      } = movie;
      mySwiper.appendSlide(SwiperSlider.createSlide(title, poster, year, imdbRating));
    });
  }

  async function inputHandler(event) {
    event.preventDefault();
    searchSpinnerIcon.setAttribute('style', 'display: inline-block');
    searchInput.placeholder = searchInput.value;
    const request = searchInput.value;
    const moviesList = await RequestHandler.makeRequest(request);
    showResults(moviesList);
  }
  searchForm.addEventListener('submit', inputHandler);

  async function initialRequest(movie) {
    const movies = await RequestHandler.makeRequest(movie);
    showResults(movies);
  }
  initialRequest('Subspecies');
});
