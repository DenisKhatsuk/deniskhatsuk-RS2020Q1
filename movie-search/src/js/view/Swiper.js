export default class SwiperElement {

  constructor(parent) {
    this.parent = document.querySelector('.carousel');
  }

  init() {
    const swiperEl = SwiperElement.createSwiperElement();
    this.parent.prepend(swiperEl);
  }

  static createSwiperElement() {
    const swiperEl = `
    <div class="swiper-container">
    <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
    </div>
    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    `;
    return swiperEl;
  }
}
