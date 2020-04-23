import '../vendor/mdb/css/bootstrap.min.css';
import '../vendor/mdb/css/mdb.min.css';
import '../sass/style.scss';

import Hamburger from './components/Hamburger';
import Aside from './components/Aside';
import Cards from './components/Cards';


window.addEventListener('DOMContentLoaded', () => {
  const hamburger = new Hamburger('navbar-toggler');
  const aside = new Aside('navbar-toggler', 'aside-panel');
  const cards = new Cards('cards');
  hamburger.init();
  aside.init();
  cards.init();
});
