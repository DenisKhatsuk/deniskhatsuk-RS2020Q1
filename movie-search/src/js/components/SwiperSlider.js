export default class SwiperSlider {
  static addSlider(target) {
    const parent = document.querySelector(`.${target}`);
    const swiperEl = SwiperSlider.createSwiperElement();
    parent.innerHTML = swiperEl;
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

  static createSlide(title = 'N/A', poster = './src/img/no_poster.jpg', year = 'N/A', imdbRating = 'N/A', imdbID) {
    const movieLink = `<a class="swiper-slide__title-link" href="//www.imdb.com/title/${imdbID}/videogallery" target="_blank">${title}</a>`;
    const movieTitle = imdbID ? movieLink : title;
    const swiperSlide = `
    <div class="swiper-slide swiper-slide_loading">
      <div class="swiper-slide__title">${movieTitle}</div>
      <div class="swiper-slide__poster">
        <img class="swiper-slide__image" src="${poster}" alt="${title} movie poster">
      </div>
      <div class="swiper-slide__date">${year}</div>
      <div class="swiper-slide__imdb">IMDB: ${imdbRating}</div>
      <div class="swiper-slide__curtain">
        <i class="swiper-slide__spinner fas fa-spinner fa-spin"></i>
      </div>
    </div>
    `;

    return swiperSlide;
  }
}
