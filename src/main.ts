import './style.css';
import './main.css';
import './catalog.css';
import './types';
import type { cartData } from './types';
import { getData } from './getData';
import { cart, addToCart } from './cart';

const main = document.getElementsByTagName('main')[0];
let selected = 'none';

function createElement(tag: string, attibutes = {}, innerText: string | null = null) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attibutes)) element.setAttribute(key, String(value));
  if (innerText) element.innerText = innerText;
  return element;
}

function renderAbout() {
  if (selected === 'about') return;
  main.replaceChildren();
  const about = createElement('div', { class: 'about' });
  about.append(
    createElement(
      'p',
      {},
      'Mini-Market for premium home goods and decor. ' +
        'Explore our wide selection of kitchen essentials, bedding, bath accessories, lighting, and decorative accents. ' +
        'We provide high-quality home furnishings at competitive prices to help you upgrade your living space. Shop in-store or online today for fast shipping and expert advice.',
    ),
    createElement(
      'p',
      { class: 'warn' },
      `Mini-Market is project designed to teach students team work. Not a n actual market. This include cooperation, code review, task planing, etc.`,
    ),
    createElement('p', {}, `Project has next structure:`),
    createElement('label', {}, `About: Description of project(You're here)`),
    createElement('label', {}, `Catalog: Panel of product among which you can select.`),
    createElement('label', {}, `Cart: List of selected products`),
    createElement('p', {}, `Task was complited by Aleksandr Shunko and Andrei Shcheslenak`),
  );
  main.append(about);
  selected = 'about';
}

function createCard(cartData: cartData) {
  const card = createElement('div', { class: 'cart' });
  const imgBox = createElement('div', { class: 'img-box' });

  imgBox.append(
    createElement('img', {
      src: cartData.img || 'placeholder.png',
      alt: cartData.name,
    }),
  );

  const addButton = createElement(
    'button',
    { class: 'add-to-cart', type: 'button' },
    'Add to cart',
  );

  addButton.addEventListener('click', () => {
    addToCart(cartData);
  });

  card.append(
    imgBox,
    createElement('h3', {}, cartData.name),
    createElement('label', {}, `$ ${cartData.price}`),
    addButton,
  );

  return card;
}

function renderProducts(items: HTMLElement) {
  items.replaceChildren();
  getData('data/products.json').then((data: Array<cartData>) => {
    console.log(data);
    items.append(...data.map(createCard));
  });
}

function renderCategories(categories: HTMLElement) {
  categories.replaceChildren();
  getData('data/categories.json').then((data) => {
    categories.append(
      ...data.map((item: string) => {
        const listItem = createElement('li');
        listItem.append(
          createElement('input', { type: 'checkbox' }),
          createElement('label', {}, item),
        );
        return listItem;
      }),
    );
  });
}

function renderCatalog() {
  if (selected === 'catalog') return;
  main.replaceChildren();
  const catalog = createElement('div', { class: 'catalog' });
  const products = createElement('div', { class: 'flex-column' });

  const filters = createElement('div', { class: 'filters flex-column' });
  const categories = createElement('ul');
  filters.append(createElement('h2', {}, 'Categories'), categories);

  const search = createElement('div', { class: 'search' });
  const searchInput = createElement('input', { id: 'search' }) as HTMLInputElement;
  search.append(createElement('img', { src: 'glass.png' }), searchInput);
  const items = createElement('div', { class: 'items' });
  searchInput.addEventListener('input', () => {
    console.log(searchInput.value);
    //TODO filter items
    //renderProducts()
  });
  renderProducts(items);
  renderCategories(categories);
  products.append(search, items);
  catalog.append(filters, products);
  main.append(catalog);
  selected = 'catalog';
}

function renderCart() {
  if (selected === 'cart') return;

  main.replaceChildren();

  const cartPage = createElement('div', { class: 'cart-page' });
  cartPage.append(createElement('h2', {}, 'Cart'));

  if (cart.length === 0) {
    cartPage.append(createElement('p', {}, 'Cart is empty'));
  } else {
    cart.forEach((item) => {
      const cartItem = createElement('div', { class: 'cart-item' });

      cartItem.append(
        createElement('h3', {}, item.product.name),
        createElement('p', {}, `Цена: $${item.product.price}`),
        createElement('p', {}, `Количество: ${item.quantity}`),
      );

      cartPage.append(cartItem);
    });
  }

  main.append(cartPage);
  selected = 'cart';
}

document.getElementById('about')?.addEventListener('click', renderAbout);
document.getElementById('catalog')?.addEventListener('click', renderCatalog);
document.getElementById('cart')?.addEventListener('click', renderCart);

renderAbout();
