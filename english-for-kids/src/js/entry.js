import '../sass/style.scss'
import '../vendor/mdb/css/bootstrap.min.css'
import '../vendor/mdb/css/mdb.min.css'

import Hamburger from './modules/Hamburger';
import Aside from './modules/Aside';

window.addEventListener('DOMContentLoaded', () => {
  const hamburger = new Hamburger('navbar-toggler');
  const aside = new Aside('navbar-toggler', 'aside-panel');
  hamburger.init();
  aside.init();
});
