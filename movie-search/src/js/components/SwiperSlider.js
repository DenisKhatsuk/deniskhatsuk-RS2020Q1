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
