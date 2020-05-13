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

  static createSlide(title = 'N/A', poster = './src/img/no_poster.jpg', year = 'N/A', imdbID = 'N/A') {
    const swiperSlide = `
    <div class="swiper-slide">
      <div class="swiper-slide__title">${title}</div>
      <div class="swiper-slide__poster">
        <img class="swiper-slide__image" src="${poster}" alt="${title} movie poster">
      </div>
      <div class="swiper-slide_date">${year}</div>
      <div class="swiper-slide_imdb">IMDB: ${imdbID}</div>
    </div>
    `;

    return swiperSlide;
  }
}
