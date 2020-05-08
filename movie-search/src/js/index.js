'use strict';

import '../sass/style.scss';

import Header from './view/Header';
import Main from './view/Main';
import Footer from './view/Footer';
import ContentBuilder from './view/ContentBuilder';

window.addEventListener('DOMContentLoaded', () => {
  const header = new Header();
  const main = new Main();
  const footer = new Footer();
  const pageBuilder = new ContentBuilder('body', header.init(), main.init(), footer.init());
  pageBuilder.addContentToDOM();
  main.addMinHeight();
});
