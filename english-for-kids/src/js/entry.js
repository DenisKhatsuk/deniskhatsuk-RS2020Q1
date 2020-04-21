import '../vendor/mdb/css/bootstrap.min.css'
import '../vendor/mdb/css/mdb.min.css'
import '../sass/style.scss'

import Hamburger from './modules/Hamburger';
import Aside from './modules/Aside';
import Cards from './modules/Cards';
import cardsData from './modules/cards_data';

window.addEventListener('DOMContentLoaded', () => {
  const hamburger = new Hamburger('navbar-toggler');
  const aside = new Aside('navbar-toggler', 'aside-panel');
  const cards = new Cards(cardsData, 'cards');
  hamburger.init();
  aside.init();
  cards.init();
});
