import '../sass/style.scss'
import '../vendor/mdb/css/bootstrap.min.css'
import '../vendor/mdb/css/mdb.min.css'

import Hamburger from './modules/Hamburger';

window.addEventListener('DOMContentLoaded', () => {
  const hamburger = new Hamburger('navbar-toggler');
  hamburger.init();
});
