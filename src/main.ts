import './style.css';
import './main.css';

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

function renderCatalog() {}

function renderCart() {}

document.getElementById('about')?.addEventListener('click', renderAbout);
document.getElementById('catalog')?.addEventListener('click', renderCatalog);
document.getElementById('about')?.addEventListener('click', renderCart);

renderAbout();
