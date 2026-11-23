import './style.css';
import './main.css';
import './catalog.css';
import './types';
import type { cartData } from './types';
import { getData, getFilter } from './getData';
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

function calculateCartTotal(): number {
  return cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
}

function createCard(cardData: cartData) {
  const card = createElement('div', { class: 'cart' });
  const imgBox = createElement('div', { class: 'img-box' });

  imgBox.append(
    createElement('img', {
      src: cardData.img || 'placeholder.png',
      alt: cardData.name,
    }),
  );

  const addButton = createElement(
    'button',
    { class: 'add-to-cart', type: 'button' },
    'Add to cart',
  );

  addButton.addEventListener('click', () => {
    addToCart(cardData);
  });

  card.append(
    imgBox,
    createElement('h3', {}, cardData.name),
    createElement('label', {}, `$ ${cardData.price}`),
    addButton,
  );

  return card;
}

function renderProducts(items: HTMLElement, search: string = '') {
  const selectedCategories: Array<string> = [];
  const children = document.getElementById('select-category')?.children || [];
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child.tagName == 'LI') {
      if ((child.firstChild as HTMLInputElement).checked)
        selectedCategories.push((child.lastChild as HTMLTextAreaElement).innerText);
    }
  }
  const filter = getFilter(search, selectedCategories);

  items.replaceChildren();
  getData('data/products.json')
    .then((data: Array<cartData>) => data.filter(filter))
    .then((data: Array<cartData>) => {
      items.append(...data.map(createCard));
    });
}

function renderCategories(
  categories: HTMLElement,
  searchBar: HTMLInputElement,
  items: HTMLElement,
) {
  categories.replaceChildren();
  getData('data/categories.json').then((data) => {
    categories.append(
      ...data.map((item: string) => {
        const listItem = createElement('li');
        const checkbox = createElement('input', { type: 'checkbox' });
        listItem.append(checkbox, createElement('label', {}, item));
        checkbox.addEventListener('change', () => {
          renderProducts(items, searchBar.value);
        });

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
  const categories = createElement('ul', { id: 'select-category' });
  filters.append(createElement('h2', {}, 'Categories'), categories);

  const search = createElement('div', { class: 'search' });
  const searchInput = createElement('input', { id: 'search' }) as HTMLInputElement;
  search.append(createElement('img', { src: 'glass.png' }), searchInput);
  const items = createElement('div', { class: 'items' });
  searchInput.addEventListener('input', () => {
    renderProducts(items, searchInput.value);
  });
  renderCategories(categories, searchInput, items);
  renderProducts(items);
  products.append(search, items);
  catalog.append(filters, products);
  main.append(catalog);
  selected = 'catalog';
}

function renderCart() {
  main.replaceChildren();

  const cartPage = createElement('div', { class: 'cart-page' });
  cartPage.append(createElement('h2', {}, 'Cart'));

  if (cart.length === 0) {
    cartPage.append(createElement('p', {}, 'Cart is empty'));
  } else {
    cart.forEach((item, index) => {
      const cartItem = createElement('div', { class: 'cart-item' });

      const decreaseButton = createElement('button', {}, '−');
      const increaseButton = createElement('button', {}, '+');
      const removeButton = createElement('button', {}, 'Remove');

      decreaseButton.addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart.splice(index, 1);
        }

        renderCart();
      });

      increaseButton.addEventListener('click', () => {
        item.quantity += 1;
        renderCart();
      });

      removeButton.addEventListener('click', () => {
        cart.splice(index, 1);
        renderCart();
      });

      cartItem.append(
        createElement('h3', {}, item.product.name),
        createElement('p', {}, `Price: $${item.product.price}`),
        decreaseButton,
        createElement('span', {}, ` ${item.quantity} `),
        increaseButton,
        removeButton,
      );

      cartPage.append(cartItem);
    });
  }

  main.append(cartPage);
  cartPage.append(
    createElement('h3', { class: 'cart-total' }, `Total: $${calculateCartTotal().toFixed(2)}`),
  );
  selected = 'cart';
}

document.getElementById('about')?.addEventListener('click', renderAbout);
document.getElementById('catalog')?.addEventListener('click', renderCatalog);
document.getElementById('cart')?.addEventListener('click', renderCart);

renderAbout();
