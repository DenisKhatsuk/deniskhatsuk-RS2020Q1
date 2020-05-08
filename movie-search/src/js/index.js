'use strict';

import '../sass/style.scss';

import Header from './view/Header';
import Footer from './view/Footer';

window.addEventListener('DOMContentLoaded', () => {
  const header = new Header();
  const footer = new Footer();
  header.init();
  footer.init();
});
