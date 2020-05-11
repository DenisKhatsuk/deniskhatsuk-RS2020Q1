import Swiper from 'swiper';
// import SearchController from '../controller/SearchController';
export default class SwiperSlider {
  constructor(parent) {
    this.parent = document.querySelector(`.${parent}`);
  }

  createSlider() {
    const swiperEl = SwiperSlider.createSwiperElement();
    this.parent.innerHTML = swiperEl;

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

    mySwiper.appendSlide(SwiperSlider.createSlide());
    mySwiper.appendSlide(SwiperSlider.createSlide());
    mySwiper.appendSlide(SwiperSlider.createSlide());
    mySwiper.appendSlide(SwiperSlider.createSlide());
    mySwiper.appendSlide(SwiperSlider.createSlide());
    mySwiper.appendSlide(SwiperSlider.createSlide());
  }

  static createSwiperElement() {
    const swiperEl = `
    <div class="swiper-container">
      <div class="swiper-wrapper">
      </div>
    <div class="swiper-pagination"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    `;
    return swiperEl;
  }

  static createSlide(name = 'The live of John Doe', poster = 'no_poster.jpg', date = 2020, imdb = 9) {
    const swiperSlide = `
    <div class="swiper-slide">
      <div class="swiper-slide__name">${name}</div>
      <div class="swiper-slide__poster">
        <img class="swiper-slide__image" src="./src/img/${poster}" alt="${name} movie poster">
      </div>
      <div class="swiper-slide_date">${date}</div>
      <div class="swiper-slide_imdb">IMDB: ${imdb}</div>
    </div>
    `;

    return swiperSlide;
  }
}
